import * as vscode from 'vscode';

export class ChatViewProvider implements vscode.WebviewViewProvider {
	private _view?: vscode.WebviewView;

	constructor(private readonly _extensionUri: vscode.Uri, private readonly _context: vscode.ExtensionContext) {}

	resolveWebviewView(webviewView: vscode.WebviewView): void {
		this._view = webviewView;
		webviewView.webview.options = { enableScripts: true };
		webviewView.webview.html = this._getHtmlContent();

		webviewView.webview.onDidReceiveMessage(async (message) => {
			if (message.type === 'sendMessage') {
				const config = vscode.workspace.getConfiguration('agenticSql');
				const baseUrl = config.get<string>('baseUrl') || 'http://localhost:8000';
				
				const history = this._context.globalState.get<any[]>('chatHistory', []);
				history.push({ type: 'user', text: message.text });
				await this._context.globalState.update('chatHistory', history);
				
				try {
					const response = await fetch(`${baseUrl}/api/generate-sql`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ message: message.text })
					});
					const data = await response.json();
					history.push({ type: 'bot', text: typeof data === 'string' ? data : JSON.stringify(data) });
					await this._context.globalState.update('chatHistory', history);
					webviewView.webview.postMessage({ type: 'response', data });
				} catch (error) {
					history.push({ type: 'bot', text: 'No response received' });
					await this._context.globalState.update('chatHistory', history);
					webviewView.webview.postMessage({ type: 'response', data: 'No response received' });
				}
			} else if (message.type === 'clearHistory') {
				await this._context.globalState.update('chatHistory', []);
			} else if (message.type === 'getHistory') {
				const history = this._context.globalState.get<any[]>('chatHistory', []);
				webviewView.webview.postMessage({ type: 'loadHistory', history });
			}
		});
	}

	private _getHtmlContent(): string {
		return `<!DOCTYPE html>
<html>
<head>
	<style>
		body { margin: 0; padding: 0; height: 100vh; display: flex; flex-direction: column; font-family: var(--vscode-font-family); }
		#header { padding: 5px 10px; border-bottom: 1px solid var(--vscode-input-border); }
		#clear { padding: 3px 8px; background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); border: none; cursor: pointer; font-size: 11px; }
		#messages { flex: 1; overflow-y: auto; padding: 10px; }
		.bubble { max-width: 80%; padding: 8px 12px; margin: 5px; border-radius: 12px; word-wrap: break-word; }
		.user { background: var(--vscode-button-background); color: var(--vscode-button-foreground); margin-left: auto; text-align: right; }
		.bot { background: var(--vscode-input-background); color: var(--vscode-input-foreground); margin-right: auto; }
		#inputDiv { display: flex; padding: 10px; border-top: 1px solid var(--vscode-input-border); }
		#input { flex: 1; padding: 5px; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); }
		#send { padding: 5px 10px; margin-left: 5px; background: var(--vscode-button-background); color: var(--vscode-button-foreground); border: none; cursor: pointer; }
	</style>
</head>
<body>
	<div id="header">
		<button id="clear">Clear Chat History</button>
	</div>
	<div id="messages"></div>
	<div id="inputDiv">
		<input type="text" id="input" placeholder="Type your message..." />
		<button id="send">Send</button>
	</div>
	<script>
		const vscode = acquireVsCodeApi();
		const messages = document.getElementById('messages');
		const input = document.getElementById('input');
		const send = document.getElementById('send');
		const clear = document.getElementById('clear');

		vscode.postMessage({ type: 'getHistory' });

		send.onclick = () => {
			const text = input.value.trim();
			if (text) {
				const userBubble = document.createElement('div');
				userBubble.className = 'bubble user';
				userBubble.textContent = text;
				messages.appendChild(userBubble);
				vscode.postMessage({ type: 'sendMessage', text });
				input.value = '';
				messages.scrollTop = messages.scrollHeight;
			}
		};

		clear.onclick = () => {
			messages.innerHTML = '';
			vscode.postMessage({ type: 'clearHistory' });
		};

		input.onkeypress = (e) => { if (e.key === 'Enter') send.click(); };

		window.addEventListener('message', (event) => {
			const msg = event.data;
			if (msg.type === 'response') {
				const botBubble = document.createElement('div');
				botBubble.className = 'bubble bot';
				botBubble.textContent = typeof msg.data === 'string' ? msg.data : JSON.stringify(msg.data);
				messages.appendChild(botBubble);
				messages.scrollTop = messages.scrollHeight;
			} else if (msg.type === 'loadHistory') {
				msg.history.forEach(item => {
					const bubble = document.createElement('div');
					bubble.className = 'bubble ' + item.type;
					bubble.textContent = item.text;
					messages.appendChild(bubble);
				});
				messages.scrollTop = messages.scrollHeight;
			}
		});
	</script>
</body>
</html>`;
	}
}

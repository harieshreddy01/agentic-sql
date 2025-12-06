// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TreeDataProvider } from './treeView';
import { ChatViewProvider } from './chatView';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const treeDataProvider = new TreeDataProvider();
	vscode.window.registerTreeDataProvider('agenticSqlView', treeDataProvider);

	const chatViewProvider = new ChatViewProvider(context.extensionUri, context);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('agenticSqlChat', chatViewProvider)
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}

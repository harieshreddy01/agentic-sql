import * as vscode from 'vscode';

export class TreeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState
	) {
		super(label, collapsibleState);
	}
}

export class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
	getTreeItem(element: TreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: TreeItem): Thenable<TreeItem[]> {
		if (!element) {
			return Promise.resolve([
				new TreeItem('DB Connection', vscode.TreeItemCollapsibleState.Collapsed),
				new TreeItem('DB Schemas', vscode.TreeItemCollapsibleState.Collapsed)
			]);
		}
		return Promise.resolve([]);
	}
}

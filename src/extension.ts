import * as vscode from 'vscode';
import { optimizedSelectedFile } from './testquickinput';
import { optimizeAllFiles} from './test02';
import { window,commands, ExtensionContext } from 'vscode';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(commands.registerCommand('redim.redim', async () => {
		const options: { [key: string]: (context: ExtensionContext) => Promise<void> } = {
			optimizedSelectedFile,
			optimizeAllFiles,	
		};
		const quickPick = window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({ label }));
		quickPick.onDidChangeSelection(selection => {
			if (selection[0]) {
				options[selection[0].label](context)
				.catch(console.error);
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	}));

}

// This method is called when your extension is deactivated
export function deactivate() {}

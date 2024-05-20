import * as vscode from 'vscode';
import { downloadOptimizedFile } from './downloadOptimized';
import { multiStepInput } from './testquickinput';
import { quickOpen } from './test02';
import { window,commands, ExtensionContext } from 'vscode';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let redimOptimize90 = vscode.commands.registerCommand('redim.redimOptimize90', () => {downloadOptimizedFile(90)});
	let redimOptimize80 = vscode.commands.registerCommand('redim.redimOptimize80', () => {downloadOptimizedFile(80)});
	let redimOptimize70 = vscode.commands.registerCommand('redim.redimOptimize70', () => {downloadOptimizedFile(70)});
	let redimOptimize60 = vscode.commands.registerCommand('redim.redimOptimize60', () => {downloadOptimizedFile(60)});
	let redimOptimize50 = vscode.commands.registerCommand('redim.redimOptimize50', () => {downloadOptimizedFile(50)});
	let redimOptimize40 = vscode.commands.registerCommand('redim.redimOptimize40', () => {downloadOptimizedFile(40)});
	let redimOptimize20 = vscode.commands.registerCommand('redim.redimOptimize20', () => {downloadOptimizedFile(20)});


	context.subscriptions.push(redimOptimize90,redimOptimize80,redimOptimize70,redimOptimize60,redimOptimize50,redimOptimize40,redimOptimize20);

	context.subscriptions.push(commands.registerCommand('samples.quickInput', async () => {
		const options: { [key: string]: (context: ExtensionContext) => Promise<void> } = {
			multiStepInput,
			quickOpen,	
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

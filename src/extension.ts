import * as vscode from 'vscode';
import { COMMAND_TYPES } from './commandHandler';
import { optimizeImg } from './optimizeFile';


export  function activate(context: vscode.ExtensionContext) {
	
  let redimCloud_20 = vscode.commands.registerCommand(COMMAND_TYPES.redim_20.command, async () => {optimizeImg(COMMAND_TYPES.redim_20.quality)});
  let redimCloud_40 = vscode.commands.registerCommand(COMMAND_TYPES.redim_40.command, async () => {optimizeImg(COMMAND_TYPES.redim_40.quality)});
  let redimCloud_60 = vscode.commands.registerCommand(COMMAND_TYPES.redim_60.command, async () => {optimizeImg(COMMAND_TYPES.redim_60.quality)});
  let redimCloud_80 = vscode.commands.registerCommand(COMMAND_TYPES.redim_80.command, async () => {optimizeImg(COMMAND_TYPES.redim_80.quality)});
  let redimCloud_90 = vscode.commands.registerCommand(COMMAND_TYPES.redim_90.command, async () => {optimizeImg(COMMAND_TYPES.redim_90.quality)});


  context.subscriptions.push(redimCloud_20,redimCloud_40,redimCloud_60,redimCloud_80,redimCloud_90);
 
}
  
  // this method is called when your extension is deactivated
  export function deactivate() {}



  
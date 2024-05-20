import { error } from 'console';
import * as vscode from 'vscode';
import { getWorkspace } from './readWspaceFiles';





export async function openInputbox(){
    let PATH = await vscode.window.showInputBox({
        placeHolder:'Insert the path of the image to be optimized'
    })

    await getWorkspace()

    return PATH
    
}



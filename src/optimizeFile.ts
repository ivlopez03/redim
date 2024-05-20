import * as vscode from 'vscode';
import {createImageCloudinary } from './cloudinaryOpt'; 
import {existsSync} from 'fs';
import { openInputbox } from './getFilePath';




export async function optimizeImg(quality: number){

    const filePATH = await openInputbox();
    let validation = false;
    
    //Entry validation, verify if the file exists or is invalid.
    async function validationImgExists(filePATH : string | undefined, validation : boolean){
        if (filePATH === undefined){
            return vscode.window.showErrorMessage(' Event was cancelled. Try again :)')
        }
        if (!existsSync(`${filePATH}`)) {
            return vscode.window.showErrorMessage('File does not exist or invalid path.')}
        return validation = true
    }
    if (await validationImgExists(filePATH,validation)){
        const imgUrl = createImageCloudinary(filePATH,quality)
        vscode.window.showInformationMessage(await imgUrl)
    }

}


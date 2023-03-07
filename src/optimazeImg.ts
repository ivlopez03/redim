import * as vscode from 'vscode';
import {createCloudinary } from './cloudinaryOpt'; 
import * as fs from 'fs';
var uniqid = require('uniqid');


export async function optimazeImg(quality: number){

    async function openInputbox(){
        let PATH = await vscode.window.showInputBox({
            placeHolder:'Insert the path of the image to be optimized'
        })
        return PATH
    }
    let filePATH = await openInputbox()
    let validation = false;
    //Entry validation, verify if the file exists or is invalid.
    async function validationImgExists(filePATH : string | undefined, validation : boolean){
        if (filePATH === undefined){
            return vscode.window.showErrorMessage(' Event was cancelled. Try again :)')
        }
        if (!fs.existsSync(`${filePATH}`)) {
            return vscode.window.showErrorMessage('File does not exist or invalid path.')}
        return validation = true
    }
    if (await validationImgExists(filePATH,validation)){
        let publicID = uniqid()
        vscode.window.showInformationMessage(createCloudinary(filePATH,publicID,quality),'Copy').then((selection) => console.log(selection))
    }

}


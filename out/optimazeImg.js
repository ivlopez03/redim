"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optimazeImg = void 0;
const vscode = require("vscode");
const cloudinaryOpt_1 = require("./cloudinaryOpt");
const fs = require("fs");
var uniqid = require('uniqid');
async function optimazeImg(quality) {
    async function openInputbox() {
        let PATH = await vscode.window.showInputBox({
            placeHolder: 'Insert the path of the image to be optimized'
        });
        return PATH;
    }
    let filePATH = await openInputbox();
    let validation = false;
    //Entry validation, verify if the file exists or is invalid.
    async function validationImgExists(filePATH, validation) {
        if (filePATH === undefined) {
            return vscode.window.showErrorMessage(' Event was cancelled. Try again :)');
        }
        if (!fs.existsSync(`${filePATH}`)) {
            return vscode.window.showErrorMessage('File does not exist or invalid path.');
        }
        return validation = true;
    }
    if (await validationImgExists(filePATH, validation)) {
        let publicID = uniqid();
        vscode.window.showInformationMessage((0, cloudinaryOpt_1.createCloudinary)(filePATH, publicID, quality), 'Copy').then((selection) => console.log(selection));
    }
}
exports.optimazeImg = optimazeImg;
//# sourceMappingURL=optimazeImg.js.map
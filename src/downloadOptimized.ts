import * as vscode from 'vscode';
import { createImageCloudinary } from './cloudinaryOpt'; 
import { openInputbox } from './getFilePath';
import {sep,win32} from 'path';
import { createWriteStream, existsSync, readdir } from "fs";
import axios from 'axios';




const getFileName = async function (filePATH : any) {
    const fname = win32.basename(filePATH);
    const last_pos = fname.indexOf('.');
    const origin_name = fname.slice(0,last_pos);
    return origin_name;
};


export async function downloadOptimizedFile(quality: number) {
    try {
        const filePATH = await openInputbox()
        //Entry validation, verify if the file exists or is invalid.
        
        if (filePATH === undefined){
            return vscode.window.showErrorMessage(' Event was cancelled. Try again :)')
            }
        else if (!existsSync(`${filePATH}`)) {
            return vscode.window.showErrorMessage('File does not exist or invalid path.')
        }else {
            console.log(filePATH)
            //async function formatCloudinaryPath(){}
            const pathToArray = filePATH.split(sep).join('/')
            const last_pos = pathToArray.lastIndexOf('/');
            const getNewPath = pathToArray.substring(0,last_pos)
            const filename = getNewPath.concat(`/${await getFileName(filePATH)}-optimized.webp`)
            
            vscode.window.showInformationMessage(' Downloading Image.')
            const imgUrl = await createImageCloudinary(filePATH,quality,fetch_format);
            
            download(imgUrl)

            async function download(imgUrl: string | undefined){
                axios({
                    method: 'get',
                    url: imgUrl,
                    responseType: 'stream'
                }).then(function(response){
                    response.data.pipe(createWriteStream(filename));
                }).finally(()=>{vscode.window.showInformationMessage('✅Image Downloaded Successfully')});
                  
            }
        }

    } catch (err) {
        console.log(err);

    }
}
import * as vscode from 'vscode';
import { createImageCloudinary } from './cloudinaryOpt'; 
import { createWriteStream } from "fs";
import axios from 'axios';






export async function downloadOptimizedFile(quality: number,file_extension: string,filename: string){
    try {
        const img_cloudinaryURL = await createImageCloudinary(filename,quality,file_extension)
        download(img_cloudinaryURL)
        
        async function download(imgUrl: string | undefined){
            axios({
                method: 'get',
                url: imgUrl,
                responseType: 'stream'
            }).then(function(response){
                response.data.pipe(createWriteStream(`${filename}-optimized`));
            }).finally(()=>{vscode.window.showInformationMessage('✅Image Downloaded Successfully')});
                  
        }
    }catch (err) {
        console.log(err);

    }
}
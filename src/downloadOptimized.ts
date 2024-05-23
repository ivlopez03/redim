import * as vscode from 'vscode';
import { createImageCloudinary} from './cloudinaryOpt'; 
import { createWriteStream } from "fs";
import axios from 'axios';






export async function downloadOptimizedFile(quality: number,file_extension: string,filename: string){
    try {
        const img_cloudinaryURL = await createImageCloudinary(filename,quality,file_extension)
        

        const name_extension = filename.split('/').pop() as string
        const name = name_extension.split('.').slice(0,-1).join('.');
        const path = filename.split('/').slice(0, -1).join('/');
    
        axios({
            method: 'get',
            url: img_cloudinaryURL,
            responseType: 'stream'
        }).then(function(response){
            response.data.pipe(createWriteStream(`${path}/${name}-optimized.${file_extension}`));
        }).finally(()=>{vscode.window.showInformationMessage('✅Image Downloaded Successfully')});
                  
        
    }catch (err) {
        console.log(err);

    }
}
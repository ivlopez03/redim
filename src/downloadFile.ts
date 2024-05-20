import { createWriteStream, readdir } from "fs";
const request = require('request')


export const downloadFile = async function(uri: string , filename: any, callback: any){
  request.head(uri,async function(err : any, res : any , body: any){
    console.log(uri)
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    console.log(filename)
  
    request(uri).pipe(createWriteStream(filename)).on('close', callback);
  });
};

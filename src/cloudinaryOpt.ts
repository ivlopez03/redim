const cloudinary = require('cloudinary').v2;
import { apiCloudinary } from "./asecret";
// Configuration 
cloudinary.config({
  cloud_name: apiCloudinary.CLOUD_NAME,
  api_key: apiCloudinary.API_KEY,
  api_secret: apiCloudinary.API_SECRET
});

export function createCloudinary(imgPath: string | undefined,publicID : string , setQuality : Number) {

    cloudinary.uploader.upload(imgPath, {public_id: publicID}) //Upload to cloudinary server
    const url = cloudinary.image(publicID, {quality: setQuality,format : 'webp'}).split("<img src='")[1].split("' />")//Optimaze image and get a url    
    return url[0]
}

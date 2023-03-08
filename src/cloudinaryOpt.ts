import { v2 as cloudinary } from 'cloudinary'
import { apiCloudinary } from "./asecret";
// Configuration 
cloudinary.config({
  cloud_name: apiCloudinary.CLOUD_NAME,
  api_key: apiCloudinary.API_KEY,
  api_secret: apiCloudinary.API_SECRET,
  secure: true
});

export function createCloudinary(imgPath: string | undefined,publicID : string , setQuality : Number) {

    cloudinary.uploader.upload(`${imgPath}`, {public_id: publicID}) //Upload to cloudinary server
    const url = cloudinary.image(publicID, {quality: setQuality, fetch_format: 'auto'}).split("<img src='")[1].split("' />")//Optimaze image and get a url    
    return url[0]
}

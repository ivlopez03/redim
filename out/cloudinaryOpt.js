"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCloudinary = void 0;
const cloudinary = require('cloudinary').v2;
const asecret_1 = require("./asecret");
// Configuration 
cloudinary.config({
    cloud_name: asecret_1.apiCloudinary.CLOUD_NAME,
    api_key: asecret_1.apiCloudinary.API_KEY,
    api_secret: asecret_1.apiCloudinary.API_SECRET
});
function createCloudinary(imgPath, publicID, setQuality) {
    cloudinary.uploader.upload(imgPath, { public_id: publicID }); //Upload to cloudinary server
    const url = cloudinary.image(publicID, { quality: setQuality, format: 'webp' }).split("<img src='")[1].split("' />"); //Optimaze image and get a url    
    return url[0];
}
exports.createCloudinary = createCloudinary;
//# sourceMappingURL=cloudinaryOpt.js.map
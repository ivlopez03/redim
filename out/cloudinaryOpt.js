"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const asecret_1 = require("./asecret");
// Configuration 
cloudinary_1.v2.config({
    cloud_name: asecret_1.apiCloudinary.CLOUD_NAME,
    api_key: asecret_1.apiCloudinary.API_KEY,
    api_secret: asecret_1.apiCloudinary.API_SECRET,
    secure: true
});
function createCloudinary(imgPath, publicID, setQuality) {
    cloudinary_1.v2.uploader.upload(`${imgPath}`, { public_id: publicID }); //Upload to cloudinary server
    const url = cloudinary_1.v2.image(publicID, { quality: setQuality, fetch_format: 'auto' }).split("<img src='")[1].split("' />"); //Optimaze image and get a url    
    return url[0];
}
exports.createCloudinary = createCloudinary;
//# sourceMappingURL=cloudinaryOpt.js.map
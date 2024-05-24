
const cloudinary = require('cloudinary');

require('dotenv').config({ path: '/Users/ivanlopezmontano/Documents/dev/vscode_extension_redim/redimv2/.env' });

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});

const uploadImage = async (filename: string | undefined) => {
  
  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    overwrite:true
  };

  try {
    return await cloudinary.uploader.upload(`${filename}`, options);
    
  } catch (error) {
    console.error(error);
  }
};


export async function createImageCloudinary(filename: string | undefined,quality: number,file_extension: string){
  const result = await uploadImage(filename);
  
  const imgCloudUrl = cloudinary.url(result.public_id, 
    {
      quality: quality, 
      fetch_format: file_extension,
    }
  )  
  console.log(imgCloudUrl);
  return imgCloudUrl;
}



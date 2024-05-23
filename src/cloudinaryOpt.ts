
const cloudinary = require('cloudinary');
import 'dotenv/config';

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
    //upload the image
    const result = cloudinary.uploader.upload(`${filename}`, options);
    console.log('this is the result:',result);
    return result.public_id;

  } catch (error) {
    console.error(error);
  }
};


export async function createImageCloudinary(filename: string | undefined,quality: number,file_extension: string){
  const publicId = await uploadImage(filename);
  const imgCloudUrl = cloudinary.url(publicId, 
    {
      quality: quality, 
      fetch_format: file_extension,
    }
  )  
  return imgCloudUrl;
}




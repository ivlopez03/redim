
const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
});

const uploadImage = async (imagePath: string | undefined) => {
  
  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    overwrite:true
  }

  try {
    //upload the image
    const result = await cloudinary.uploader.upload(`${imagePath}`, options);
    console.log('this is the result:',result);
    return result.public_id;

  } catch (error) {
    console.error(error);
  }
}


export async function createImageCloudinary(imagePath: string | undefined,setQuality: number){
  const publicId = await uploadImage(imagePath)
  const imgCloudUrl = cloudinary.url(publicId, 
    {quality: setQuality, 
     fetch_format: 'webp',
    }
  )  
  return imgCloudUrl
}




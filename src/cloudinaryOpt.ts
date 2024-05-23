
const cloudinary = require('cloudinary');
//mport dotenv from 'dotenv';
//require('dotenv').config();
//dotenv.config();



cloudinary.v2.config({
  cloud_name: 'redim23kljmn094jk',
  api_key: '835163574249945',
  api_secret: 'DAG6rS2N1ikkjbULQG52_Nz7vCg',
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
  return imgCloudUrl;
}


export async function file_data(public_id: string) {
  return cloudinary.v2.api.resource(public_id).then((result: any) => console.log(result));
} 
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();
const s3 = new AWS.S3({
  accessKeyId: process.env.S3_access,
  secretAccessKey: process.env.S3_secret,
});

export async function uploadplist(name:string, content:string) {
  const params = {
    Bucket: 'ipa-distribution-hanu',
    Key: `${name}/downloads.plist`, // File name you want to save as in S3
    Body: content,
  };

  s3.upload(params, (err:any, data:any) => {
    if (err) {
      throw err;
    }
    console.log(`plist uploaded successfully. ${data.Location}`);
  });
}

export async function uploadipa(name:string, content:string) {
  const params = {
    Bucket: 'ipa-distribution-hanu',
    Key: `${name}/${name}.ipa`, // File name you want to save as in S3
    Body: content,
  };

  s3.upload(params, (err:any, data:any) => {
    if (err) {
      throw err;
    }
    console.log(`ipa uploaded successfully. ${data.Location}`);
  });
}

export async function uploadimage(name:string, content:string) {
  const params = {
    Bucket: 'ipa-distribution-hanu',
    Key: `${name}/${name}.png`, // File name you want to save as in S3
    Body: content,
  };

  s3.upload(params, (err:any, data:any) => {
    if (err) {
      throw err;
    }
    console.log(`image uploaded successfully. ${data.Location}`);
  });
}

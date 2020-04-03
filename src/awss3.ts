import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: config.AWS.S3.ACCCESSKEY,
  secretAccessKey: config.AWS.S3.SECRET.ACCCESSKEY,
});

async function uploadplist(content:string) {
  const params = {
    Bucket: 'ipa-distribution-hanu',
    Key: 'downloads.plist', // File name you want to save as in S3
    Body: content,
  };

  s3.upload(params, (err:any, data:any) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
}

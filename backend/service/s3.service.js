const S3 = require('aws-sdk/clients/s3');


const {config} = require('../config');
const {buildFileName} = require('../helper');

const s3Bucket = new S3({
  region: config.S3_BUCKET_REGION,
  accessKeyId: config.S3_ACCESS_KEY,
  secretAccessKey: config.S3_SECRET_KEY,
});

async function uploadPublicFile(fileToUpload, itemType, itemId) {
  return s3Bucket.upload({
    ContentType: fileToUpload.mimetype,
    ACL: "public-read",
    Body: fileToUpload.data,
    Bucket: config.S3_BUCKET_NAME,
    Key: buildFileName(fileToUpload.name, itemType, itemId),
  }).promise();
}



module.exports = {uploadPublicFile};
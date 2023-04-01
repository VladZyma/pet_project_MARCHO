const {ApiError} = require('../customError');
const {uploadFile} = require('../config');

const fileMiddleware = {
  checkUploadImage: async (req, res, next) => {
    try {
      if (!req.files) {
        throw new ApiError('No files to upload', 400);
      }

      const imagesToUpload = Object.values(req.files);

      for (const image of imagesToUpload) {
        const {size, mimetype, name} = image;

        if (size > uploadFile.IMAGE_MAX_SIZE) {
          throw new ApiError(`${name} file size exceeded!!!`, 400);
        }
        if (!uploadFile.IMAGE_MIMETYPES.includes(mimetype)) {
          throw new ApiError(`${name} file has invalid format!!!`, 400);
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};

module.exports = fileMiddleware;

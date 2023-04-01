const path = require('node:path');
const uuidV1 = require('uuid').v1;

function buildFileName(fileName, itemType, itemId) {
  const ext = path.extname(fileName);

  return `${itemType}/${itemId}/${uuidV1()}${ext}`;
}

module.exports = buildFileName;
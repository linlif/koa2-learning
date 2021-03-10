const model = require('../../model');
const router = require('koa-router')()
const koaForm = require("formidable-upload-koa");
const path = require('path')
const fse = require('fs-extra')

const { saveFile } = require('../../controllers/utils')

const uploadDir = path.join(__dirname, '..', '..', '..', 'uploadTempFiles');

// 判断是否需要创建目录
fse.pathExists(uploadDir).then(exist => {
  if (!exist) {
    fse.ensureDir(uploadDir)
  }
})

const options = {
  uploadDir,
  keepExtensions: true
};

// 判断是否登录
router.post('/upload', koaForm(options), async (ctx, next) => {
  // Access to
  // ctx.req.files
  // ctx.req.fields
  // The file has been uploaded in the folder choosen above.

  const file = ctx.req.files['file'],
    { name, type, size, path } = file;

  ctx.body = await saveFile({ name, type, size, filePath: path })
});

module.exports = router

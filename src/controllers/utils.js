
const jwt = require('jsonwebtoken');
const fse = require('fs-extra')
const path = require('path')

const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const { uploadFileSizeInfo } = require('../dataModel/ErrorModel');


const MAX_SIZE = 20 * 1024 * 1024 * 1024 // 20M
const DIST_FOLDER = path.join(__dirname, '..', '..', 'uploadFiles')

// 判断是否需要创建目录
fse.pathExists(DIST_FOLDER).then(exist => {
    if (!exist) {
        fse.ensureDir(DIST_FOLDER)
    }
})

/**
 * 上传文件
 * @param {String} name 文件名称
 * @param {String} type 文件类型
 * @param {String} size 文件大小
 * @param {String} filePath 文件路径
 * @returns 
 */
const saveFile = async ({ name, type, size, filePath }) => {

    console.log('size~', size)

    if (size > MAX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeInfo)
    }

    // 移动文件
    const fileName = Date.now() + '_' + name // 防止文件名称重复
    const distFilePath = path.join(DIST_FOLDER, fileName)

    console.log('filePath===', filePath)
    console.log('distFilePath===', distFilePath)

    try {
        await fse.move(filePath, distFilePath)
        console.log('success!')
    } catch (err) {
        console.error(err)
    }

    return new SuccessModel({
        url: '/' + fileName
    })
}


module.exports = {
    saveFile
};
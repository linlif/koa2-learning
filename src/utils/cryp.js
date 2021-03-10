/**
 * @description 加密方法
 * @author linlif
 */


const { CRYPTO_SCRET_KEY } = require('../conf/secretKeys')

const crypto = require('crypto')

/**
 * md5加密
 * @param {String} content 明文
 */
const _md5 = (content) => {
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {String} content 明文
 */
function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SCRET_KEY}`
    return _md5(str)
}

module.exports = doCrypto




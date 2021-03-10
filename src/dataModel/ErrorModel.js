/**
 * @description 错误信息模板
 * @author linlif
 */

module.exports = {
    userNameNotExit: {
        errno: 1003,
        message: '用户名不存在！'
    },
    userNameIsExit: {
        errno: 1004,
        message: '用户名已存在！'
    },
    registerFailInfo: {
        errno: 1002,
        message: '注册失败'
    },
    jsonSchemaFailInfo: {
        error: 1001,
        message: '数据格式校验失败'
    },
    loginFailInfo: {
        error: 1005,
        message: '登录失败'
    },
    uploadFileSizeInfo: {
        error: 1006,
        message: '上传文件大小超出限制'
    },
    changePasswordFailInfo: {
        error: 1007,
        message: '修改密码失败'
    }
}
/**
 * description: 路由聚合页面
 * @author Linlif
 * createTime 2020/12/24/17:44
 */

const router = require('koa-router')()

const user = require('./api/user')
const utils = require('./api/utils')

router.use('/user', user.routes(), user.allowedMethods())
router.use('/utils', utils.routes(), utils.allowedMethods())

module.exports = router
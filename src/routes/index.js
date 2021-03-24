/**
 * description: 路由聚合页面
 * @author Linlif
 * createTime 2020/12/24/17:44
 */

const router = require('koa-router')()

const user = require('./api/user')
const utils = require('./api/utils')
const blogHome = require('./api/blog-home')
const profile = require('./api/profile')
const square = require('./api/square')

router.use('/user', user.routes(), user.allowedMethods())
router.use('/utils', utils.routes(), utils.allowedMethods())
router.use('/blog', blogHome.routes(), blogHome.allowedMethods())
router.use('/profile', profile.routes(), blogHome.allowedMethods())
router.use('/square', square.routes(), blogHome.allowedMethods())

module.exports = router
/**
 * description: 路由聚合页面
 * @author Linlif
 * createTime 2020/12/24/17:44
 */

const router = require('koa-router')()

const user = require('./user')
const pets = require('./pets')

router.use('/user', user.routes(), user.allowedMethods())
router.use('/pets', pets.routes(), pets.allowedMethods())

module.exports = router
/**
 * @description 个人粉丝列表
 * @author Linlif
 */

const router = require('koa-router')()
const blogValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { getFans } = require('../../controllers/user-relation')

router.post('/getFans', async (ctx, next) => {
    // const { userId } = ctx.request.body;
    // jwt获取用户信息
    // const { id: userId } = ctx.state.user;

    // koa-session2 + ioredis 获取用户信息的方式
    const { id: userId } = ctx.session.userInfo;

    ctx.body = await getFans(userId)
})

module.exports = router;
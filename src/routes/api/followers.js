/**
 * @description 个人关注列表
 * @author Linlif
 */

const router = require('koa-router')()
const blogValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { getFollowers } = require('../../controllers/user-relation')

router.post('/getFollowers', async (ctx, next) => {
    // const { userId } = ctx.request.body;
    // jwt获取用户信息
    // const { id: userId } = ctx.state.user;

    // koa-session2 + ioredis 获取用户信息的方式
    const { id: userId } = ctx.session.userInfo;

    ctx.body = await getFollowers(userId)
})

module.exports = router;
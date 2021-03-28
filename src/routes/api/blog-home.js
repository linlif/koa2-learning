/**
 * @description Blog-首页API
 * @author Linlif
 */

const router = require('koa-router')()
const blogValidate = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validator')
const { create } = require('../../controllers/blog-home')

router.post('/create', genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body;
    // jwt获取用户信息
    // const { id: userId } = ctx.state.user;

    // koa-session2 + ioredis 获取用户信息的方式
    const { id: userId } = ctx.session.userInfo;

    ctx.body = await create({
        userId,
        content,
        image
    })
})

module.exports = router;
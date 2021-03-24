/**
 * @description Blog-首页API
 * @author Linlif
 */

const router = require('koa-router')()
const blogValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { getBlogProfileList } = require('../../controllers/blog-profile')

router.post('/getProfileBlogList', async (ctx, next) => {
    const { currentPage, pageSize } = ctx.request.body;
    // jwt获取用户信息
    // const { id: userId } = ctx.state.user;

    // koa-session2 + ioredis 获取用户信息的方式
    const { name: userName } = ctx.session.userInfo;

    ctx.body = await getBlogProfileList({
        userName,
        currentPage,
        pageSize
    })
})

module.exports = router;
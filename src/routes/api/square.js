/**
 * @description Blog-首页API
 * @author Linlif
 */

const router = require('koa-router')()

const { getSquareBlogList } = require('../../controllers/blog-square')

router.post('/getSquareBlogList', async (ctx, next) => {
    const { currentPage, pageSize } = ctx.request.body;
    // jwt获取用户信息
    // const { id: userId } = ctx.state.user;

    // koa-session2 + ioredis 获取用户信息的方式
    // const { name: userName } = ctx.session.userInfo;

    ctx.body = await getSquareBlogList({
        // userName,
        currentPage,
        pageSize
    })
})

module.exports = router;
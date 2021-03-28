/**
 * @description Blog-首页API
 * @author Linlif
 */

const router = require('koa-router')()
const blogValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { getBlogProfileList } = require('../../controllers/blog-profile')
const { follow, unFollow } = require('../../controllers/user-relation')

// 获取个人博客列表
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

// 关注用户
router.post('/follow', async (ctx, next) => {
    const { followerId } = ctx.request.body;
    // jwt获取用户信息
    // const { id: userId } = ctx.state.user;

    // koa-session2 + ioredis 获取用户信息的方式
    const { id: userId } = ctx.session.userInfo;

    ctx.body = await follow(followerId, userId)
})

// 取消关注用户
router.post('/unFollow', async (ctx, next) => {
    const { followerId } = ctx.request.body;
    // jwt获取用户信息
    // const { id: userId } = ctx.state.user;

    // koa-session2 + ioredis 获取用户信息的方式
    const { id: userId } = ctx.session.userInfo;

    ctx.body = await unFollow(userId, followerId)
})

module.exports = router;
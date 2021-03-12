/**
 * @description Blog-首页API
 * @author Linlif
 */

const router = require('koa-router')()
const blogValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { create } = require('../../controllers/blog-home')

router.post('/create', genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body,
        { id: userId } = ctx.state.user;

    ctx.body = await create({
        userId,
        content,
        image
    })
})

module.exports = router;
/**
 * @description blog modal test 模型单元测试
 * @author Linlif
 */

const { Blog } = require('../../src/models')

const server = require('../server')

test('Blog 模型各个属性，符合预期', async () => {
    const blog = Blog.build({
        content: 'blog content',
        image: '/xxx.png'
    })
    expect(blog.content).toBe('blog content')
    expect(blog.image).toBe('/xxx.png')
})
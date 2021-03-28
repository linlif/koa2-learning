/**
 * @description blog-home api test
 * @author Linlif
 */

const server = require('../server')

test('测试微博接口', async () => {
  // 定义测试内容
  const content = '单元测试自动创建微博' + Date.now()
  const image = 'xxx.png'

  const res = await server
    .post('/blog/create')
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6ImxpbmxpZiIsImdlbmRlciI6MywiYmlydGgiOm51bGwsInBpY3R1cmUiOiJodHRwczovL3NmMy10dGNkbi10b3MucHN0YXRwLmNvbS9pbWcvdXNlci1hdmF0YXIvMGQwMmZlNTcxMGVlZmY2YTBjMGM5NGQ4MzU2YzdlODN-MzAweDMwMC5pbWFnZSIsImlhdCI6MTYxNjIxNTA0MiwiZXhwIjoxNjE2MjE4NjQyfQ.NT2i0r0lCyYCDg9t82SImGiP1U9-AwlabfrsPmifZfQ')
    .send({
      content,
      image
    })
  console.log(res.body)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)
})
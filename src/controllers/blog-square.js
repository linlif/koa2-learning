
const { getSquareCacheList } = require('../cache/blog')
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');

const getSquareBlogList = async ({ currentPage, pageSize }) => {
    const curPage = currentPage > 0 ? currentPage - 1 : 0
    const result = await getSquareCacheList({ currentPage: curPage, pageSize })
    const blogList = result.blogList || []

    return new SuccessModel({
        data: {
            isEmpty: blogList.length === 0,
            blogList,
            pageSize,
            currentPage,
            count: result.count
        }
    })
}

module.exports = {
    getSquareBlogList
}
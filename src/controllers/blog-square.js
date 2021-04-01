
const { getSquareCacheList } = require('../cache/blog')
const { SuccessModel, ErrorModel } = require('../dataModel/ResModel');
const { PAGE_SIZE } = require('../conf/constants');

const getSquareBlogList = async ({ currentPage = 1, pageSize = PAGE_SIZE }) => {
    const curPage = +currentPage > 0 ? +currentPage - 1 : 0
    const result = await getSquareCacheList({ currentPage: curPage, pageSize: +pageSize })
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
import request from '@/utils/request'
import grobal from '@/golbar/grobal'

// 图片管理-查询
export function queryArticle(categoryId, rows, page) {
  return request({
    url: grobal.MASTERY_WEB + '/file/selectCategoryId?categoryId='+categoryId+'&rows='+rows+'&page='+page,
    method: 'get'
  })
}

// 图片管理-添加/修改
export function updataArticle(params) {
  return request({
    url: grobal.MASTERY_WEB + '/file/add',
    method: 'post',
    data: params
  })
}

// 图片管理-删除
export function deletArticle(fileId) {
  return request({
    url: grobal.MASTERY_WEB + '/file/delete?fileId=' + fileId,
    method: 'get',
  })
}

import request from '@/utils/request'
import grobal from '@/golbar/grobal'

// 图片管理
export function queryArticle(categoryId, rows, page) {
    return request({
      url: grobal.MASTERY_WEB + '/file/selectCategoryId?categoryId='+categoryId+'&rows='+rows+'&page='+page,
      method: 'get'
    })
  }
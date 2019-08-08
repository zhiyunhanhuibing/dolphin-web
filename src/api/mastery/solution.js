import request from '@/utils/request'
import grobal from '@/golbar/grobal'

// 解决方案-查询
export function Query(categoryId,pageSize,page) {
  return request({
    url: grobal.MASTERY_WEB + '/web/queryArticle?categoryId='+categoryId+'&rows=' +pageSize + '&page=' +page,
    method: 'get'
  })
}

//解决方案-modify
export function Modify(params) {
    return request({
      url: grobal.MASTERY_WEB + '/web/s',
      method: 'post',
      data: params
    })
}

//解决方案-添加
export function Add(params) {
    return request({
      url: grobal.MASTERY_WEB + '/file/add',
      method: 'post',
      data: params
    })
}

//解决方案-删除
export function Remove(articleId) {
    return request({
      url: grobal.MASTERY_WEB + '/web/removeArticle?articleId=' + articleId,
      method: 'get'
    })
}

//解决方案-查看绑定数据
export function addArticle(params) {
    return request({
      url: grobal.MASTERY_WEB + '/web/addArticle',
      method: 'post',
      data: params
    })
}

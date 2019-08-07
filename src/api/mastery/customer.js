/**
 * Created by lixinyu on 2019/8/6.
 */
import request from '@/utils/request'
import grobal from '@/golbar/grobal'

// 客户垂询数据
export function selectAll(param) {
    return request({
        url: grobal.MASTERY_WEB + '/coop/selectAll',
        method: 'post',
        data: param
    })
}

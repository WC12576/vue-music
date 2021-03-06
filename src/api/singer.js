import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

// export function getSingerList() {
//   const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

//   const data = Object.assign({}, commonParams, {
//     channel: 'singer',
//     page: 'list',
//     key: 'all_all_all',
//     pagesize: 100,
//     pagenum: 1,
//     hostUin: 0,
//     needNewCode: 0,
//     platform: 'yqq'
//   })

//   return jsonp(url, data, options)
// }
export function getSingerList() { // 请求歌单数据
  const url = '/api/getSingerList'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    format: 'json' // 格式化数据
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}

export function getSingerDetail(singerId) {
  const url = '/api/getSingerDetail'

  const data = Object.assign({}, commonParams, {
    hostUin:0,
    format:'jsonp',
    platform: 'yqq',
    needNewCode:0,
    order:'listen',
    begin:0,
    num:100,
    songstatus:1,
    singermid:singerId,
    g_tk:5381
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}
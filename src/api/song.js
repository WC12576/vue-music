import {commonParams, options} from './config'
import axios from 'axios'

export function getLyric(mid) {
    const url = 'api/getLyric'
    const data = Object.assign({},commonParams,{
        platform: 'yqq',
        format: 'json' ,
        songmid: mid,
        g_tk:5381,
        pcachetime: +new Date(),
        loginUin:0,
        hostUin:0,
        needNewCode:0
    })
    return axios.get(url,{
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch((e) => {
        console.log(e)
    })
}
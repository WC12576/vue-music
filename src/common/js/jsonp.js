import oldJSONP from 'jsonp'

export default function jsonp(url, option, data) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    // 如果param函数不去除第一个＆可以这样使用
    // url = url.replace('?&', '?')

    return new Promise((resolve,reject) => {
        oldJSONP(url, option, (error,data) => {
            if(!error) {
                resolve(data)
            } else {
                reject(error)
            }
        })
    })
}
function param(data) {
    let url = ''
    for(var k in data) {
        let value = (data[k] !== undefined ? data[k] : '')
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}
<template>
    <div class="singer" ref="singer">
       <list-view :data="singers" @select="selectSinger" ref="list"></list-view> 
       <router-view></router-view>
    </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'
import {playListMixin} from 'common/js/mixin'

const HOT_NAME = "热门"
const HOT_SINGER_LEN = 10

export default {
    mixins:[playListMixin],
    data() {
        return {
            singers: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        handlePlayList(playList) {
            const bottom = playList.length>0 ? '60px' : ''
            this.$refs.singer.style.bottom = bottom
            this.$refs.list.refresh()
        },
        // 根据当前点击的歌手id跳转到对应的页面
        selectSinger(singer) {
            this.$router.push({
                path: `/singer/${singer.id}`
            })
            this.setSinger(singer) // 设置setSinger的值为歌手id
        },
        _getSingerList() {
            getSingerList().then((res) => {
                if(res.code === ERR_OK) {
                    //console.log(res.data.list)
                    this.singers = this._normalizeSinger(res.data.list)
                }
            })
        },
        _normalizeSinger(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }
            //获取热门歌手数据
            list.forEach((item,index) => {
                if(index < HOT_SINGER_LEN) {
                    map.hot.items.push({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                        avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                    })
                }
                const key = item.Findex //歌手首字母
                if(!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }    
                }
                map[key].items.push({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name,
                    avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
                })
            })
            //console.log(map)
            //处理数据，排序，得到有序列表
            let hot = []
            let ret = []
            for(let key in map) {
                let val = map[key]
                if(val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                }else if(val.title === HOT_NAME) {
                    hot.push(val)
                }
            }
            //排序
            ret.sort((a,b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            //console.log(hot.concat(ret))
            return hot.concat(ret) // 拼接数组 得到一维数组
            
        },
        ...mapMutations({
            setSinger: "SET_SINGER"
        })
    },
    components: {
        ListView
    }
}
</script>

<style lang="stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>

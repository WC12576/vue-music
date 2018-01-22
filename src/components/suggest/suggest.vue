<template>
  <Scroll class="suggest" :data="result" :pullup="pullup" 
          @scrollToEnd="searchMore" ref="suggest"
          :beforeScroll="beforeScroll" @beforeScroll="listScroll">
      <ul class="suggest-list">
          <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
              <div class="icon">
                  <i :class="getIconClass(item)"></i>
              </div>
              <div class="name">
                  <p class="text" v-html="getDisplayName(item)"></p>
              </div>
          </li>
          <Loading v-show="hasMore" title="正在加载"></Loading>
      </ul>
      <div v-show="!hasMore && !result.length" class="no-result-wrapper">
          <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
  </Scroll>
</template>


<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import {search} from 'api/search'
import {ERR_OK} from 'api/config' 
import {createSong} from 'common/js/song'
import {mapMutations,mapActions} from 'vuex'


const TYPE_SINGER = 'singer'
const perpage = 20

export default {
    props: {
        query: {
            type: String,
            default: ''
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            page: 1,
            result: [],
            pullup: true,
            hasMore: true,
            beforeScroll:true
        }
    },
    methods: {
        search() {
            this.page = 1
            this.$refs.suggest.scrollTo(0, 0)
            this.hasMore = true
            search(this.query,this.page,this.showSinger,perpage).then((res) => {
                if(res.code === ERR_OK) {
                    this.result = this._getResult(res.data)
                    //console.log(res.data)
                    //console.log(this.result)
                    this._checkMore(res.data)
                }
            })
        },
        searchMore() {
            if(!this.hasMore) {
                return
            }
            this.page++
            search(this.query,this.page,this.showSinger,perpage).then((res) => {
                if(res.code === ERR_OK) {
                    this.result = this.result.concat(this._getResult(res.data))
                    this._checkMore(res.data)
                }
            })
        },
        getIconClass(item) {
            if(item.type === TYPE_SINGER) {
                return 'icon-mine'
            } else {
                return 'icon-music'
            }
        },
        getDisplayName(item) {
            if(item.type === TYPE_SINGER) {
                return item.singername
            } else {
                return `${item.name}-${item.singer}`
            }
        },
        selectItem(item) {
            if(item.type === TYPE_SINGER) {
                console.log(item)
                const singer = {}
                singer.id = item.singermid
                singer.name = item.singername
                singer.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.singermid}.jpg?max_age=2592000`
                this.$router.push({
                    path: `/search/${singer.id}`
                })
                this.setSinger(singer)
            } else {
                this.insertSong(item)
            }
            this.$emit('select', item)
        },
        listScroll() {
            this.$emit('listScroll')
        },
        _getResult(data) {
            let ret = []
            if(data.zhida.singerid) {
                ret.push({...data.zhida, ...{type: TYPE_SINGER}})
            }
            
            if(data.song) {
                ret = ret.concat(this._normalizeSongs(data.song.list)) 
            }
            
            return ret 
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((musicData) => {
                if(musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        },
        _checkMore(data) {
            const song = data.song
            if(!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
                this.hasMore = false
            }
        },
        ...mapMutations({
            setSinger: "SET_SINGER"
        }),
        ...mapActions([
            'insertSong'
        ])
    },
    watch: {
        query(newQuery) {
            this.search(newQuery)
        }
    },
    components: {
        Scroll,
        Loading,
        NoResult
    }
  
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 30%
      transform: translateY(-50%)
</style>


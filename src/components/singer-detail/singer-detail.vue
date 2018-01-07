<template>
<transition name="slide">
    <musiclist :songs="songs" :title="title" :bg-image="bgImage"></musiclist>
</transition>
  
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import Musiclist from 'components/music-list/music-list'

export default {
  data() {
    return {
       songs: []
    }
  },
  computed: {
    title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    console.log(this.singer)
    this._getDetail()
  },
  methods: {
    _getDetail() {
      //歌手页面刷新如果还没有获取则返回上一级路由
      if(!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if(res.code === ERR_OK) {
          //console.log(res.data.list)
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if(musicData.songid && musicData.songmid) {
          ret.push(createSong(musicData))
        }
      })
      return ret  
    }
  },
  components: {
    Musiclist
  }
}
    
</script>

<style lang="stylus" scoped>
 @import "~common/stylus/variable"
  
  .slide-enter-active, .slide-leave-active
    transition: all 0.5s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

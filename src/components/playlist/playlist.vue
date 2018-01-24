<template>
    <transition name="list-fade">
        <div class="playlist" @click="hide" v-show="showFlag">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="icon" :class="playMode" @click="changeMode"></i>
                        <span class="text">{{modeText}}</span>
                        <span class="clear" @click="showConfirm">
                            <i class="icon-clear"></i>
                        </span>
                    </h1>
                </div>
                <Scroll class="list-content" :data="sequenceList" ref="listContent">
                    <transition-group ref="list"　name="list" tag="ul">
                        <li :key="item.id" class="item" v-for="(item,index) in sequenceList"
                            @click="selectItem(item,index)" ref="listItem">
                            <i class="current" :class="getCurrentIcon(item)"></i>
                            <span class="text">{{item.name}}</span>
                            <span class="like">
                                <i class="icon-not-favorite"></i>
                            </span>
                            <span class="delete" @click.stop="deleteOne(item)">
                                <i class="icon-delete"></i>
                            </span>
                        </li>
                    </transition-group>
                </Scroll>
                <div class="list-operate">
                    <div class="add">
                        <i class="icon-add"></i>
                        <span class="text">添加歌曲到列队</span>
                    </div>
                </div>
                <div class="list-close" @click="hide">
                    <span>关闭</span>
                </div>
            </div>
            <Confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空"
                     @confirm="confirmClear"></Confirm>
        </div>
    </transition>
  
</template>


<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import {playerMixin} from 'common/js/mixin'



export default {
  mixins:[playerMixin],
  data() {
      return {
          showFlag: false
      }
  },
  computed: {
      playMode() {
        return this.mode === playMode.sequence ? 'icon-sequence' 
                             : this.mode === playMode.loop ? 'icon-loop' 
                             : 'icon-random'
      },
      modeText() {
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
      },
      ...mapGetters([
          'sequenceList',
          'currentSong',
          'playList',
          'currentIndex',
          'mode'
      ])
  },
  methods: {
      show() {
          this.showFlag = true
          //ｓｃｒｏｌｌ组件调用时ｓｈｏｗ高度已经计算好，无法滚动，需延迟重新刷新计算高度
          setTimeout(() => {
              this.$refs.listContent.refresh()
              this.scrollToCurrent(this.currentSong)
          },20)
      },
      hide() {
          this.showFlag = false
      },
      getCurrentIcon(item) {
          if(this.currentSong.id === item.id) {
              return 'icon-play'
          }
      },
      selectItem(item,index) {
          if(this.mode === playMode.random) {
              index = this.playList.findIndex((song) => {
                  return song.id === item.id
              })
          }
          this.setCurrentIndex(index)
          this.setPlayingState(true)
      },
      scrollToCurrent(current) {
          const index = this.sequenceList.findIndex((song) => {
              return current.id === song.id
          })
          //顺序播放时currentIndex与index相同，随机播放时不一致
          //console.log(index)
          //console.log(this.currentIndex)
          this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
      },
      deleteOne(item) {
          this.deleteSong(item)
          //当前子组件展示时不为父组件页面
          //当只有播放列表只有只有一首歌删除后父组件player的展示条件playList.length已变为０，不展示
          //但是当前子组件的条件showFlag还是true，还是可以展示的
          if(!this.playList.length) {
              this.hide()
          }
      },
      showConfirm() {
          this.$refs.confirm.show()
      },
      confirmClear() {
          //与deleteOne相同的问题
          this.deleteSongList()
          this.hide()
      },
      ...mapMutations({
          setCurrentIndex: 'SET_CURRENT_INDEX',
          setPlayingState: 'SET_PLAYING_STATE'
      }),
      ...mapActions([
          'deleteSong',
          'deleteSongList'
      ])
  },
  watch:　{
      currentSong(newSong,oldSong) {
          if(!this.showFlag || oldSong.id === newSong.id) {
              return
          }
          this.scrollToCurrent(newSong)
      }
  },
  components: {
      Scroll,
      Confirm
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>

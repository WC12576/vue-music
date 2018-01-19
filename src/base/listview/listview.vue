<template>
  <Scroll class="listview" :data="data" ref="listview"　:listenScroll="listenScroll"
          @scroll="scroll" :probeType="probeType">
      <ul>
          <li v-for="group in data" class="list-group" ref="listGroup">
              <h2 class="list-group-title">{{group.title}}</h2>
              <ul>
                  <li v-for="item in group.items" class="list-group-item" @click="selectItem(item)">
                      <img v-lazy="item.avatar" class="avatar">
                      <span class="name">{{item.name}}</span>
                  </li>
              </ul>
          </li>
      </ul>
      <div class="list-shortcut" @touchstart="onShortcutTouchStart"
                                 @touchmove.stop.prevent="onShortcutTouchMove">
          <ul>
              <li v-for="(item,index) in shortcutList" class="item" :data-index="index"
                  :class="{'current':currentIndex === index}">
                  {{item}}
              </li>
          </ul>
      </div>
      <div class="list-fixed" v-show="fixedTitle" ref="listFixed">
          <div class="fixed-title">{{fixedTitle}}</div>
      </div>
      <div class="loading-container" v-show="!data.length">
          <Loading></Loading>
      </div> 
  </Scroll>
</template>

<script>
    import Scroll from 'base/scroll/scroll'
    import {getData} from 'common/js/dom'
    import Loading from 'base/loading/loading'



    const ANCHOR_HEIGHT = 18
    const TITLE_HEIGHT = 30

    export default {
        created() {
            this.touch = {}
            this.listenScroll = true
            this.probeType = 3
            this.listHeight = []
        },
        data() {
            return {
                scrollY: -1,
                currentIndex: 0,
                diff: -1
            }
        },
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        computed: {
            shortcutList() {
                return this.data.map((item) => {
                    return item.title.substr(0,1)
                })
            },
            fixedTitle() {
                if(this.scrollY > 0) {
                    return ''
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        methods: {
            selectItem(item) {
                this.$emit('select',item)
            },
            //点击字母索引，页面滚定到索引位置
            onShortcutTouchStart(e) {
                let anchorIndex = getData(e.target,'index')
                let firstTouch = e.touches[0]　//记录第一次点击索引
                this.touch.y1 = firstTouch.pageY　//第一次索引的高度
                this.touch.anchorIndex = anchorIndex
                this._scrollTo(anchorIndex)
            },
            onShortcutTouchMove(e) {
                let firstTouch = e.touches[0]　//移动时第一次点击索引
                this.touch.y2 = firstTouch.pageY　
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0 //移动后索引移动高度计算索引移动个数
                let anchorIndex = parseInt( this.touch.anchorIndex ) + delta　//移动后的ｉｎｄｅｘ,this.touch.anchorIndex为字符串需要parseInt
                this._scrollTo(anchorIndex)
            },
            // scroll事件 pos是滚动偏移量
            scroll(pos) {
                this.scrollY = pos.y
            },
            refresh() {
                this.$refs.listview.refresh()
            },
            _scrollTo(index) {
                //过滤点击无效区域
                if (!index && index !== 0) {
                    return // 过滤掉index=null的情况
                }
                if (index < 0) { // 判断出边界的情况
                    index = 0
                } else if (index > this.listHeight.length - 2) {
                    index = this.listHeight.length - 2
                }
                this.scrollY = -this.listHeight[index]
                //console.log(this.scrollY)
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0) //０是scroll提供的滚动动画时间
            },
            _calculateHeight() {
                this.listHeight = []
                let height = 0
                this.listHeight.push(height)
                let list = this.$refs.listGroup
                //获取每个歌手分组的高度
                for(let i=0;i<list.length;i++) {
                    height += list[i].clientHeight
                    this.listHeight.push(height)
                }
                //console.log(this.listHeight)
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this._calculateHeight()
                },20)
            },
            scrollY(newY) { // newY代表歌手列表到顶部的偏移量
                const listHeight = this.listHeight
                // 当滚动到顶部，newY>0
                if (newY > 0) {
                  this.currentIndex = 0
                  return
                }
                // 在中间部分滚动 (不遍历到最后一个元素)
                for (let i = 0; i < listHeight.length - 1; i++) {
                  let height1 = listHeight[i]
                  let height2 = listHeight[i + 1]
                  //必须是 >= fou ze dian ji suo yin bu gao liang
                  if (-newY >= height1 && -newY < height2) {
                    this.currentIndex = i
                    this.diff = height2 - (-newY)
                    return
                  }
                }
                // 当滚动到底部，且-newY大于最后一个元素的上限
                if(-newY > listHeight[listHeight.length]) {
                    this.currentIndex = listHeight.length - 2
                    return
                }
                //this.currentIndex = listHeight.length - 2
                
            },
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? (newVal - TITLE_HEIGHT) : 0
                //
                if(this.fixedTop === fixedTop) {
                    return
                }
                this.fixedTop = fixedTop
                
                this.$refs.listFixed.style.transform = `translate3d(0,${fixedTop}px,0)`
            }
        },
        components: {
            Scroll,
            Loading
        }
    }

</script>

<style lang="stylus" scoped>
 @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: -2px
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-theme
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

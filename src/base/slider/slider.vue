<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :class="{active: currentPageIndex === index}"></span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {addClass} from 'common/js/dom'

    export default {
        name: 'slider',
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }    
        },
        data() {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        
        mounted() {
            this._setSliderWidth()
            //初始化slider之前先初始化dots
            this._initDots()
            this._initSlider()
            // setInterval(() => {
            //     this._setSliderWidth()
            //     this._initSlider()
            // },20)
            if(this.autoPlay) {
                this._play()
            }
            //监听窗口改变重新计算宽度
            window.addEventListener('resize',() => {
                if(!this.slider) {
                    return
                }
                this._setSliderWidth(true)
                this.slider.refresh()
            })
        },
        methods: {
            _setSliderWidth(isResize) {
                //console.log(this)
                //console.log(this.$refs.sliderGroup.children)
                this.children = this.$refs.sliderGroup.children
                let width = 0
                //可视宽度
                let sliderWidth = this.$refs.slider.clientWidth
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i]
                    child.classList.add('slider-item')
                    //addClass(child, 'slider-item')
                    child.style.width = sliderWidth + 'px'
                    //sliderGroup的宽度
                    width += sliderWidth
                }
                if(this.loop && !isResize){
                    //无限轮播需要前后各clone一个
                    width += 2 * sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initSlider() {
                //console.log(this.sliders)
                this.slider = new BScroll(this.$refs.slider,{
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400,
                    //click: true
                })
                this.slider.on('scrollEnd',() => {
                    //console.log(this.slider.currentPage.pageX)
                    let pageIndex = this.slider.currentPage.pageX
                    if(this.loop) {
                        //无限轮播前后各增加一个，index要减１
                        pageIndex -= 1
                    }
                    this.currentPageIndex = pageIndex
                    //console.log(pageIndex)
                    if(this.autoPlay) {
                        clearTimeout(this.timer)
                        this._play()
                    }

                })
                this.slider.on()
            },
            _initDots() {
                this.dots = new Array(this.children.length)
            },
            _play() {
                let pageIndex = this.currentPageIndex + 1
                //无缝循环index值需加１
                if(this.loop) {
                    pageIndex += 1
                }
                //利用better-scroll提供的goToPage接口
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex,0,400)
                },this.interval)
            }
            
        },
        destroyed() {
            clearTimeout(this.timer)
        }
    }
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

  .slider
    min-height: 1px
    overflow hidden
    position relative
    .slider-group
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        transition: all .3s
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll          
</style>

<template>
    <div class="tab">
        <router-link to="/recommend" tag="div" class="tab-item">
           <span class="tab-link">推荐</span>
        </router-link>
        <router-link to="/singer" tag="div" class="tab-item">
           <span class="tab-link">歌手</span>
        </router-link>
        <router-link to="/rank" tag="div" class="tab-item">
           <span class="tab-link">排行</span>
        </router-link>
        <router-link to="/search" tag="div" class="tab-item">
           <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
        position: relative
      .tab-link:before
        content: ''
        position: absolute
        bottom: -.2em
        left: -.8em
        right: -.8em
        background: $color-theme
        height: 2px
        transition: all .3s
        transform: scale(0)
      &.router-link-active
        .tab-link:before
          transform: scale(1)
        //height: 2px
        // .tab-link
        //   color: $color-theme
        //   border-bottom: 2px solid $color-theme
</style>

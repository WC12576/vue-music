<template>
    <div class="header">
       <h1 class="text">Music Player</h1>
    </div>
</template>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
  
</style>

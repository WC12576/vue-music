import {mapGetters,mapMutations} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const playListMixin = {
    computed: {
        ...mapGetters([
            'playList'
        ])
    },
    mounted() {
        this.handlePlayList(this.playList)
    },
    activated() {
        this.handlePlayList(this.playList)
    },
    watch: {
        playList(newVal) {
            this.handlePlayList(newVal)
        }
    },
    methods: {
        handlePlayList() {
            throw new Error('声明handlePlayList函数')
        }
    }
}

export const playerMixin = {
    computed: {
        playMode() {
          return this.mode === playMode.sequence ? 'icon-sequence' 
                               : this.mode === playMode.loop ? 'icon-loop' 
                               : 'icon-random'
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
        changeMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if(mode === playMode.random) {
              list = shuffle(this.sequenceList) 
            } else {
              list = this.sequenceList
            }
            //重置currentSong，防止点击切换模式时改变当前播放歌曲
            this.resetCurrentIndex(list)
            this.setPlayList(list)
          },
          resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
              return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
          },
          ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode:'SET_PLAY_MODE',
            setPlayList:'SET_PLAYLIST'
        })
    }
}
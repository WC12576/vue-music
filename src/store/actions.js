import * as types from './mutations-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch,deleteSearch,clearSearch} from 'common/js/catch' 


function findIndex(list,song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}


export const selectPlay = function ({commit,state},{list,index}) {
    commit(types.SET_PLAYLIST,list)
    //需要判断播放模式
    if(state.mode === playMode.random) {
        //随机播放需要改播放列表
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST,randomList)
        index = findIndex(randomList,list[index])
    } else {
        commit(types.SET_SEQUENCE_LIST,list)
    } 
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

export const randomPlay = function({commit},{list}) {
    commit(types.SET_PLAY_MODE,playMode.random)
    commit(types.SET_SEQUENCE_LIST,list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST,randomList)
    commit(types.SET_CURRENT_INDEX,0)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

export const insertSong = function({commit,state},song) {
    let currentIndex = state.currentIndex
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    //记录当前播放歌曲
    let currentSong = playList[currentIndex]
    //搜索查找歌曲的索引
    let fpIndex = findIndex(playList,song)
    //插入歌曲，索引＋１
    currentIndex++
    //插入该首歌到当前位置
    playList.splice(currentIndex,0,song)
    //遍历已存在列表是否存在插入歌曲
    if(fpIndex > -1) {
        //当前位置大于已存在位置，删除原位置，索引－１
        if(currentIndex > fpIndex) {
            playList.splice(fpIndex,1)
            currentIndex--
        } else {
            //当前位置小于已存在位置，直接删除
            playList.splice(fpIndex+1,1)
        }
    }
    let currentSIndex = findIndex(sequenceList,currentSong) + 1
    let fsIndex = findIndex(sequenceList,song)
    sequenceList.splice(currentSIndex,0,song)
    if(fsIndex > -1) {
        if(currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex,1)
        } else {
            sequenceList.splice(fsIndex+1,1)
        }
    }
    commit(types.SET_PLAYLIST,playList)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX,currentIndex)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)


}

export const saveSearchHistory = function({commit},query) {
    commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function({commit},query) {
    commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory = function({commit}) {
    commit(types.SET_SEARCH_HISTORY,clearSearch())
}

export const deleteSong = function({commit,state},song) {
    let currentIndex = state.currentIndex
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()

    let pIndex = findIndex(playList,song)
    playList.splice(pIndex,1)
    let sIndex = findIndex(sequenceList,song)
    sequenceList.splice(sIndex,1)
    //顺序播放时如果当前位置在删除位置之后，currentIndex要减１才不会影响当前歌曲的播放
    if(currentIndex > pIndex || currentIndex === playList.length) {
        currentIndex--
    }
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_PLAYLIST,playList)
    commit(types.SET_CURRENT_INDEX,currentIndex)

    if(!playList.length) {
        commit(types.SET_PLAYING_STATE,false)
    } else {
        commit(types.SET_PLAYING_STATE,true)
    }
}

export const deleteSongList = function({commit}) {
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_PLAYLIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_PLAYING_STATE,false)
}
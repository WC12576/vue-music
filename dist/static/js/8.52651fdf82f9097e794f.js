webpackJsonp([8],{Hy1L:function(e,t){},YOyO:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("Dd8w"),a=s.n(r),c=s("2X+S"),i=s("6Xyt"),o=s("vhoT"),n=s("XEAW"),h=s("qwAB"),u=s("8stH"),l=s("T452"),f=s("NYxO"),y=s("F4+m"),v={mixins:[y.a,y.c],data:function(){return{hotKey:[],query:""}},created:function(){this._getHotKey()},computed:a()({shortcut:function(){return this.hotKey.concat(this.searchHistory)}},Object(f.c)(["searchHistory"])),methods:a()({handlePlayList:function(e){var t=e.length>0?"60px":"";this.$refs.searchResult.style.bottom=t,this.$refs.suggest.refresh(),this.$refs.shortcutWrapper.style.bottom=t,this.$refs.shortcut.refresh()},addQuery:function(e){this.$refs.searchBox.setQuery(e)},deleteOne:function(e){this.deleteSearchHistory(e)},clearHistory:function(){this.clearSearchHistory()},showConfirm:function(){this.$refs.confirm.show()},_getHotKey:function(){var e=this;Object(u.a)().then(function(t){t.code===l.a&&(e.hotKey=t.data.hotkey.slice(0,10))})}},Object(f.b)(["saveSearchHistory","deleteSearchHistory","clearSearchHistory"])),watch:{query:function(e){var t=this;e||setTimeout(function(){t.$refs.shortcut.refresh()},20)}},components:{SearchBox:c.a,Suggest:i.a,SearchList:o.a,Confirm:n.a,Scroll:h.a}},d={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"search"},[s("div",{staticClass:"search-box-wrapper"},[s("SearchBox",{ref:"searchBox",on:{query:e.onQueryChange}})],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.query,expression:"!query"}],ref:"shortcutWrapper",staticClass:"shortcut-wrapper"},[s("Scroll",{ref:"shortcut",staticClass:"shortcut",attrs:{data:e.shortcut,refreshDelay:e.refreshDelay}},[s("div",[s("div",{staticClass:"hot-key"},[s("h1",{staticClass:"title"},[e._v("热门搜索")]),e._v(" "),s("ul",e._l(e.hotKey,function(t){return s("li",{staticClass:"item",on:{click:function(s){e.addQuery(t.k)}}},[s("span",[e._v(e._s(t.k))])])}))]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.searchHistory.length,expression:"searchHistory.length"}],staticClass:"search-history"},[s("h1",{staticClass:"title"},[s("span",{staticClass:"text"},[e._v("搜索历史")]),e._v(" "),s("span",{staticClass:"clear",on:{click:e.showConfirm}},[s("i",{staticClass:"icon-clear"})])]),e._v(" "),s("SearchList",{attrs:{searches:e.searchHistory},on:{select:e.addQuery,delete:e.deleteOne}})],1)])])],1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.query,expression:"query"}],ref:"searchResult",staticClass:"search-result"},[s("Suggest",{ref:"suggest",attrs:{query:e.query},on:{listScroll:e.blurInput,select:e.saveSearch}})],1),e._v(" "),s("Confirm",{ref:"confirm",attrs:{text:"是否清空所有搜索历史",confirmBtnText:"清空"},on:{confirm:e.clearHistory}}),e._v(" "),s("router-view")],1)},staticRenderFns:[]},m=s("VU/8")(v,d,!1,function(e){s("Hy1L")},null,null);t.default=m.exports}});
//# sourceMappingURL=8.52651fdf82f9097e794f.js.map
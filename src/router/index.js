import Vue from 'vue'
import Router from 'vue-router'

// import Recommend from 'components/recommend/recommend'
// import Singer from 'components/singer/singer'
// import Rank from 'components/rank/rank'
// import Search from 'components/search/search'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import Disc from 'components/disc/disc'
// import TopList from 'components/top-list/top-list'
// import UserCenter from 'components/user-center/user-center'


Vue.use(Router)
//路由懒加载，性能优化
const Recommend = (reslove) => {
  import('components/recommend/recommend').then((module) => {
    reslove(module)
  })
}

const Singer = (reslove) => {
  import('components/singer/singer').then((module) => {
    reslove(module)
  }) 
}

const Rank = (reslove) => {
  import('components/rank/rank').then((module) => {
    reslove(module)
  })
}

const Search = (reslove) => {
  import('components/search/search').then((module) => {
    reslove(module)
  })
}

const SingerDetail = (reslove) => {
  import('components/singer-detail/singer-detail').then((module) => {
    reslove(module)
  })
}

const Disc = (reslove) => {
  import('components/disc/disc').then((module) => {
    reslove(module)
  })
}

const TopList = (reslove) => {
  import('components/top-list/top-list').then((module) => {
    reslove(module)
  })
}

const UserCenter = (reslove) => {
  import('components/user-center/user-center').then((module) => {
    reslove(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]

    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path:'/user',
      component: UserCenter
    }
  ]
})

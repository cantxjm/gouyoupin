import Vue from 'vue';
import App from './App.vue';


// 定义全局组件: 在入口文件注册一次后，在任何组件当中都可以使用
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui'

// 全局组件 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// 注册全局路由组件
// Vue.component(Button.name, Button);
// ELementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


// 引入路由
import router from '@/router';
// 引入仓库
import store from './store';

// 引入mockServe.js---mock数据
import '@/mock/mockServe';
// 引入swiper样式
import 'swiper/css/swiper.css'

//统一接收api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'

// 测试
// import { reqGetSearchInfo } from '@/api';
// reqGetSearchInfo({})

import atm from '@/assets/1.gif'
// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm,
})


// 关闭vue的生产提示
Vue.config.productionTip = false


// 引入自定义插件
/* import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
}) */

// 引入表单校验插件
import "@/plugins/validate"


new Vue({
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线$bus配置
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  mounted() {
    console.log(this);
  },
  // 注册路由: 底下的写法是KV一致省略V【router小写的】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例的身上会多一个属性#store属性
  store
}).$mount('#app')

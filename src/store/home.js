import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api';
// home模块的小仓库
// state:仓库存储数据的地方
const state = {
    // state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组。【根据接口返回值初始化的】
    // home仓库中存储三级菜单的数据
    categoryList: [],
    // 轮播图数据
    bannerList: [],
    // floor组件数据
    floorList: []
};
// mutations:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList.slice(0, 16);
    },
    GETBANNERLIST(state, bannerList) {
        // 修改仓库中bannerList数据
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
// actions:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        // console.log(reqCategoryList());
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
    // 获取首页轮播图数据
    async getBannerList({ commit }) {
        // 向服务器发起ajax请求,获取首页轮播图数据
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    // 获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            // 提交mutations
            commit("GETFLOORLIST", result.data);
        }
    }
};
// getters:理解为计算属性,用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
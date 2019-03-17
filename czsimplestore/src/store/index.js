import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        shoppingCarData: [],
        shoppingAlertShow: false, //  添加购物车弹出框
        carPanelShow: false //  购物车显示
    },
    mutations: {
        // 添加商品到购物车
        addShopping(state, data) {
            let bOff = true; //  标识添加的是购物车中没有的商品
            state.shoppingCarData.forEach(good => {
                if (good.sku_id === data.sku_id) {
                    good.count++;
                    bOff = false;
                    // 超过限制, 赋值最大, 商品添加弹出框状态改变
                    if (good.count >= good['limit-num']) {
                        good.count = good['limit-num']
                        state.shoppingAlertShow = true
                    }
                }
            })
            if (bOff) {
                let goodData = data;
                Vue.set(goodData, 'count', 1)
                state.shoppingCarData.push(goodData)
            }
            console.log(state.shoppingCarData)
        },
        //  删除购物车指定商品
        delShopping(state, dataId) {
            state.shoppingCarData.forEach((item, index) => {
                if (item.sku_id === dataId) {
                    state.shoppingCarData.splice(index, 1)
                    return
                }
            })
            console.log(state.shoppingCarData)
        },
        //  购物车显示/隐藏
        carPanelOpeartion(state, type) {
            if (type === "show") { //  显示
                state.carPanelShow = true;
            } else if (type === "hide") { //  隐藏
                setTimeout(() => {
                    state.carPanelShow = false;
                }, 1500)
            }
        }
    },
    actions: {
        addShopping: ({
            commit
        }, data) => {
            commit('addShopping', data)
        }
    },
    getters: {
        //  购物车商品总数量/价格
        shoppingTotal(state) {
            let totalPrice = 0,
                totalCount = 0;
            state.shoppingCarData.forEach(item => {
                totalPrice += item.count * item.price;
                totalCount += item.count;
            })
            return {
                totalPrice,
                totalCount
            }
        }
    }
})
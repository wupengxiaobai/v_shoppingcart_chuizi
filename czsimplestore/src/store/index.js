import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        shoppingCarData: [],
        shoppingAlertShow: false, //  添加购物车弹出框
        carPanelShow: false, //  购物车显示
        ball: {
            show: false,
            el: null, //  触发对象
            img: null
        }, //  小球
    },
    mutations: {
        // 添加/删除商品操作
        shoppingOperation(state, params) {
            if (params.type == 'addShop') {
                if (!state.ball.show) {
                    let bOff = true; //  标识添加的是购物车中没有的商品
                    state.shoppingCarData.forEach(good => {
                        if (good.sku_id === params.data.sku_id) {
                            good.count += params.num || 1;
                            bOff = false;
                            // 超过限制, 赋值最大, 商品添加弹出框状态改变
                            if (good.count > good['limit-num']) {
                                good.count = good['limit-num']
                                state.shoppingAlertShow = true
                                return
                            }

                            // 小球设置
                            state.ball.show = true;
                            state.ball.img = params.data.ali_image
                            state.ball.el = event.path[0]
                        }
                    })
                    if (bOff) {
                        let goodData = params.data;
                        Vue.set(goodData, 'count', params.num || 1)
                        state.shoppingCarData.push(goodData)

                        // 小球设置
                        state.ball.show = true;
                        state.ball.img = params.data.ali_image
                        state.ball.el = event.path[0]
                    }
                    console.log('添加到购物车操作')
                    // console.log(event)
                }

            } else if (params.type == 'delShop') {
                state.shoppingCarData.forEach((item, index) => {
                    if (item.sku_id === params.data.sku_id) {
                        state.shoppingCarData.splice(index, 1)
                        return
                    }
                })
                console.log('删除购物车商品操作')
            }
            console.log('shoppingCarData: ' + JSON.stringify(state.shoppingCarData))
        },
        //  购物车显示/隐藏
        carPanelOpeartion(state, type) {
            if (type === "show") { //  显示
                state.carPanelShow = true;
            } else if (type === "hide") { //  隐藏
                state.carPanelShow = false;
            }
        },
        // 改变shoppingAlertShow状态
        shoppingAlertShowChange(state, type) {
            if (type === 'show') {
                state.shoppingAlertShow = true
            } else {
                state.shoppingAlertShow = false
            }
        }
    },
    /* actions: {
        shoppingOperation: ({
            commit
        }, params) => {
            commit('addShopping', params)
        }
    }, */
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
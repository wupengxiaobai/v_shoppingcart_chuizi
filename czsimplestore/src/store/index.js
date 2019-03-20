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
        checkedAll: true //  购物车全选按钮选中
    },
    mutations: {
        //  加入购物车/删除购物车商品操作
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
                        Vue.set(goodData, 'checked', true)
                        state.shoppingCarData.push(goodData)

                        // 小球设置
                        state.ball.show = true;
                        state.ball.img = params.data.ali_image
                        state.ball.el = event.path[0]
                    }
                    // console.log('添加到购物车操作')
                    // console.log(event)
                }

            } else if (params.type == 'delShop') {
                state.shoppingCarData.forEach((item, index) => {
                    if (item.sku_id === params.data.sku_id) {
                        state.shoppingCarData.splice(index, 1)
                        return
                    }
                })
                // console.log('删除购物车商品操作')
            }
            console.log('shoppingCarData: ' + JSON.stringify(state.shoppingCarData))
        },
        //  购物车商品数量增加/减少操作
        shoppingCarInDeOperation(state, params) {
            if (params.type === 'decrement') {
                state.shoppingCarData.find(item => {
                    if (item.sku_id == params.goodId) {
                        item.count--
                        if (item.count <= 1) {
                            item.count = 1;
                            return
                        }
                    }
                });
            } else {
                state.shoppingCarData.find(item => {
                    if (item.sku_id == params.goodId) {
                        item.count++
                        if (item.count > item['limit-num']) {
                            item.count--
                            return
                        }
                    }
                });
            }
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
        },
        // 改变的购物车中, 单选checkbox状态
        shoppingCarCheckboxStatusChange(state, goodId) {
            state.shoppingCarData.forEach(item => {
                if (item.sku_id == goodId) {
                    item.checked = !item.checked
                    return
                }
            })
        },
        //  购物车全选checkbox触发单选checkbox变化
        shoppingCarAllCheckboxStatusChange(state) {
            // 本身修改
            state.checkedAll = !state.checkedAll;
            // 单选修改
            state.shoppingCarData.forEach(item => {
                item.checked = state.checkedAll
            })
        },
        //  购物车删除选中的所有商品
        delShoppingCarCheckedCommodity(state) {
            // 这样会出问题, 删除一位， 索引未改变
            /* state.shoppingCarData.forEach((item, index) => {
                if (item.checked) {
                    state.shoppingCarData.splice(index, 1)
                }
            }) */
            // 批量操作数组中不同索引位技巧： 反向操作
            let i = state.shoppingCarData.length;
            while (i--) {
                if (state.shoppingCarData[i].checked) {
                    state.shoppingCarData.splice(i, 1)
                }
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
        },
        //  购物车全选按钮是否选中
        shoppingCarAllCheckboxStatus(state) {
            let AllCheckboxChecked = true;
            state.shoppingCarData.forEach(item => {
                if (!item.checked) {
                    AllCheckboxChecked = false;
                    return;
                }
            })
            state.checkedAll = AllCheckboxChecked
            return AllCheckboxChecked;
        },
        //  购物车选中商品数量/价格
        shoppingCarCheckboxCheckedTotal(state) {
            let totalCountChecked = 0,
                totalPriceChecked = 0;
            state.shoppingCarData.forEach(item => {
                if (item.checked) {
                    totalCountChecked += item.count;
                    totalPriceChecked += item.count * item.price;
                }
            })
            return {
                totalCountChecked,
                totalPriceChecked
            }
        }
    }
})
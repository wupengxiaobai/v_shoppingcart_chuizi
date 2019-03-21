<template>
  <div class="address-pop" v-if="show">
    <div class="main">
      <div class="title">
        <span>管理收货地址</span>
        <div class="close" @click="hidePop">＋</div>
      </div>
      <div class="content">
        <input type="text" v-model="receive.name" name="name" placeholder="收货人姓名">
        <div class="phone">
          <input
            :class="{'noAgree':showTip}"
            type="text"
            v-model="receive.phone"
            name="phone"
            placeholder="手机号"
          >
          <span v-show="showTip">格式不正确</span>
        </div>
        <div class="inp3">
          <input type="text" v-model="receive.areaCode" name="qh" placeholder="区号(可选)">
          <input type="text" v-model="receive.landLine" name="dh" placeholder="固定电话(可选)">
        </div>
        <select name="province_code" v-model="receive.provinceId" id="province_code">
          <option selected value="0">请选择省份</option>
          <option
            v-for="(province,provinceIndex) in provinceList"
            :key="provinceIndex"
            :value="province.area_id"
          >{{ province.area_name }}</option>
        </select>
        <div class="sel5">
          <select name="city_code" v-model="receive.cityId" id="city_code">
            <option selected value="0">请选择城市</option>
            <option
              v-for="(city,cityIndex) in cityList"
              :key="cityIndex"
              :value="city.area_id"
            >{{ city.area_name }}</option>
          </select>
          <select name="county_code" v-model="receive.countyId">
            <option selected value="0">请选择区县</option>
            <option
              v-for="(county,countyIndex) in countyList"
              :key="countyIndex"
              :value="county.area_id"
            >{{ county.area_name }}</option>
          </select>
        </div>
        <input type="text" name="add" placeholder="详细地址，如街道名称，楼层，门牌号码等" v-model="receive.add">
        <label class="setdefault" for="setdefault">
          <input
            type="checkbox"
            name="setdefault"
            :checked="receive.default"
            id="setdefault"
            @click="setDefault"
          >设为默认收货地址
        </label>
        <button class="save" @click="addAddressOperation">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../../../data.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      show: false, //  显示pop
      receive: {
        name: "",
        phone: "",
        areaCode: "",
        landLine: "",
        provinceId: 0,
        province: "请选择省份",
        cityId: 0,
        city: "请选择城市",
        countyId: 0,
        county: "请选择区县",
        add: "",
        default: true
      }, //  数据初始值
      provinceList: [] //  菜单数据
    };
  },
  methods: {
    //  添加地址
    addAddressOperation() {
      let data = this.receive;
      this.addShoppingAddress(data);
      //   添加地址成功
      setTimeout(() => {
        this.hidePop();
      }, 500);
    },
    // 设置默认操作
    setDefault() {
      this.receive.default = !this.receive.default;
    },
    showPop() {
      this.show = true;
    },
    hidePop() {
      this.show = false;
    },
    ...mapMutations(["addShoppingAddress"])
  },
  computed: {
    cityList() {
      let cityList = [];
      this.provinceList.forEach(item => {
        if (item.area_id == this.receive.provinceId) {
          cityList = item.city_list;
        }
      });
      if (true) {
        //this.receive.provinceId == 0
        this.receive.cityId = 0;
        this.receive.countyId = 0;
      }
      return cityList;
    },
    countyList() {
      let countyList = [];
      this.cityList.forEach(item => {
        if (item.area_id == this.receive.cityId) {
          countyList = item.county_list;
        }
      });
      if (true) {
        //this.receive.cityId == 0
        this.receive.countyId = 0;
      }
      return countyList;
    },
    // 手机号校验
    showTip() {
      return this.receive.phone && !/^1[34578]\d{9}$/.test(this.receive.phone);
    }
  },
  watch: {
    //  侦听选择菜单变化 -> 赋值选项对应名称的数据
    "receive.provinceId"() {
      this.receive.province = this.provinceList.find(item => {
        if (item.area_id == this.receive.provinceId) {
          return item;
        }
      }).area_name;
    },
    "receive.cityId"() {
      this.receive.city = this.cityList.find(item => {
        if (item.area_id == this.receive.cityId) {
          return item.area_name;
        }
      }).area_name;
    },
    "receive.countyId"() {
      this.receive.county = this.countyList.find(item => {
        if (item.area_id == this.receive.countyId) {
          return item;
        }
      }).area_name;
    }
  },
  created() {
    this.provinceList = data.provinceList;
  }
};
</script>

<style lang="less" scoped>
.address-pop {
  position: fixed;
  z-index: 1001;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  font-size: 16px;
  color: #666;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    position: relative;
    width: 450px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset, 1px 0 3px rgba(0, 0, 0, 0.1);
    .title {
      overflow: hidden;
      padding: 0 15px;
      width: 100%;
      height: 60px;
      font-size: 18px;
      background: linear-gradient(#fff, #f5f5f5);
      border-bottom: 1px solid #dcdcdc;
      border-radius: 10px 10px 0 0;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        flex: 1;
      }
      .close {
        flex: 0 0 30px;
        height: 30px;
        font-size: 28px;
        transform: rotate(45deg);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      padding: 30px 35px;
      min-height: 480px;
      .phone {
        position: relative;
        width: 100%;
        span {
          position: absolute;
          padding: 5px;
          right: 5px;
          top: 50%;
          font-size: 12px;
          transform: translateY(-50%);
          color: #fff;
          background: #f40;
          border-radius: 3px;
        }
        input {
          &.noAgree {
            border-color: #f40;
          }
        }
      }
      input,
      select {
        outline: none;
        position: relative;
        padding: 0 15px;
        width: 100%;
        line-height: 46px;
        height: 46px;
        outline: none;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
          -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
        opacity: 0.618;
      }
      select {
        option {
          outline: none;
        }
      }
      .inp3 {
        display: flex;
        justify-content: space-between;
        input:nth-of-type(1) {
          flex: 1;
        }
        input:nth-of-type(2) {
          flex: 2;
          margin-left: 10px;
        }
      }
      .sel5 {
        display: flex;
        width: 100%;
        justify-content: space-between;
        select {
          width: 48%;
        }
      }
      .setdefault {
        user-select: none;
        font-size: 12px;
        cursor: pointer;
        input {
          margin-right: 10px;
          display: inline-block;
          padding: 0;
          width: 14px;
          height: 15px;
          vertical-align: middle;
        }
      }
      .save {
        width: 100%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: #fff;
        background: #6383c6;
        background: linear-gradient(#6383c6, #4262af);
        border: none;
        border-radius: 6px;
        outline: none;
        opacity: 0.7;
        &:hover {
          opacity: 1;
          cursor: pointer;
        }
      }
    }
  }
}
</style>



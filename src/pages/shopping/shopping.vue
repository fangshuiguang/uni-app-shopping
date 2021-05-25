<template>
  <view style="height: 100%;">
    <view class="title">
      <view class="title-top">
        购物车
      </view>
<!--      <view class="title-edit" @click="txtClick">
        {{ edit }}
      </view>-->
    </view>
    <scroll-view scroll-y="ture" class="main">
      <view class="cart-empty" v-show="cart==''">
        <image src="../../static/shopping.png" mode=""></image>
        <text>购物车还是空的</text>
        <button>去逛逛</button>
      </view>
      <view class="cart">
        <view class="cart-li" v-for="(item,index) in cart" :key="item.id">
<!--          <view class="group">
            <checkbox-group @change="checkboxChange">
              <label>
                <checkbox color="#DD524D" @change="selected(checked)" :checked="item.checked" :value="item.id"/>
              </label>
            </checkbox-group>
          </view>-->
          <image :src="item.cover" mode=""></image>
          <view style="display: inline-block; overflow: hidden;height: auto;">
            <view class="cart-li-txt">
              <view>
                <checkbox-group @change="selected(item)">
                  <checkbox color="#DD524D" :checked="item.checked" :value="item.id"/>
                </checkbox-group>
                {{ item.title }}
              </view>
            </view>
            <view class="cart-li-txt">
              <view class="" style="vertical-align: bottom;">
                <text style="color: #DD524D;margin-right: 50upx;">¥{{ item.pprice }}</text>
                <text @click="reduce(item)">[-]</text>
                {{ item.num }}
                <text @click="add(item)">[+]</text>
                <!-- <text class="del" @click="del(item,index)">删除</text> -->
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="recommended">
        <view class="rec-txt">
          <view class="rec-txt-t">为你推荐</view>
          <view class="rec-txt-b">——————————— 买了的人还买了 ———————————</view>
        </view>
        <recommended></recommended>
      </view>
    </scroll-view>
    <view class="footer">
      <view class="footer-item">
        <view class="checkbox-icon">
          <checkbox-group @change="selectedall()">
            <checkbox class="quanxuananniu" :checked="allchecked"/>
          </checkbox-group>
        </view>
      </view>
      <view class="total">合计:
        <text class="money"> ￥ {{ money }}</text>
      </view>
      <view class="shop-footer-item">
        <button class="settlement-btn">结算</button>
      </view>
    </view>
  </view>
</template>

<script>
import recommended from "../../components/recommended.vue";

export default {
  components: {
    recommended
  },
  data() {
    return {
      edit: "编辑",
      allSelect: false,
      money: 0,
      cart: '',
      flag: true, // 用于判断用户购物车是否有商品，没有商品为true，有商品为false
      allchecked: true //默认全选为true，因为后台数据没有是否选中的信息
    }
  },
  onLoad() {
    uni.request({
      url: 'http://ceshi3.dishait.cn/api/login',
      method: 'POST',
      data: {
        username: 'user2',
        password: 'zcmcss'
      },
      success: (res) => {
        console.log(res.data.data.token);
        uni.request({
          url: 'http://ceshi3.dishait.cn/api/cart',
          header: {
            'token': res.data.data.token
          },
          success: (res) => {
            this.cart = res.data.data;
            this.cart.forEach((item,index)=>{
              item.checked = true;
            });
            this.sumAll();
          }
        });
      }
    });

  },
  methods: {
    txtClick() {
      console.log('编辑点击了')
    },
    sumAll(){
      let result = this.cart.filter((item)=>{
        return !!item.checked;
      });
      this.money = (result.length>0)?(result.map(val => val.pprice*val.num).reduce((pre, next) => pre + next)).toFixed(2):'0.00';
    },
    add(item){
      item.num++;
      this.sumAll();
    },
    reduce(item){
      if(item.num>1){
        item.num--;
      }
      this.sumAll();
    },
    // 单个商品前的勾选
    selected(item) {
      console.log(item)
      item.checked = !item.checked;

      if (!item.checked) {
        this.allchecked = false
      } else {
        const test = this.cart.every(item => {
          return item.checked === true
        })
        this.allchecked = test?true:false;
      }
      this.sumAll();
    },
    selectedall() {
      this.allchecked = !this.allchecked
      if (this.allchecked) {
        this.cart.map(item => {
          item.checked = true
        })
      } else {
        this.cart.map(item => {
          item.checked = false
        })
      }
      this.sumAll();
    }
  }
}
</script>

<style scoped>
.main {
  padding: 100 upx 0;
  height: calc(100% - 200upx);
  width: 100%;
  overflow: hidden;
  word-wrap: break-word;
}

.cart-li {
  height: 200 upx;
  width: 94%;
  margin: 0 auto;
  padding: 20 upx 0;
  border-bottom: 4 upx #BEBEBE solid;
}

.cart {
  position: relative;
  padding-left: 50 upx;
}

.cart .group {
  /* position: absolute;
  left: 10upx;
  top: 150upx; */
  vertical-align: middle;
  display: inline-block;
}

.cart-li > image {
  height: 150 upx;
  width: 150 upx;
  padding: 20 upx;
  border: #cccccc 2 upx solid;
  display: inline-block;
  vertical-align: middle;
}

.cart-li-txt {
  display: inline-block;
  width: 100%;
}

.cart-empty {
  height: 100 upx;
  width: 100%;
  text-align: center;
  margin: 40 upx 0 20 upx 0;
}

.cart-empty > text {
  color: #C0C0C0;
  font-size: 28 upx;
  margin: 0 20 upx;
  line-height: 80 upx;
}

.cart-empty > button {
  display: inline-block;
  width: 180 upx;
  height: 70 upx;
  vertical-align: middle;
  background-color: #FFFFFF;
  font-size: 30 upx;
  line-height: 70 upx;
  font-weight: bold;
}

.cart-empty image {
  width: 50 upx;
  height: 50 upx;
  vertical-align: middle;
}

.rec-txt {
  padding-top: 50 upx;
  padding-bottom: 20 upx;
  text-align: center;
  background-color: #F5F5F5;
}

.rec-txt-t {
  color: #FD6801;
  font-weight: bold;
  font-size: 40 upx;
}

.rec-txt-b {
  font-size: 20 upx;
  color: #bebebe;
}

uni-page-body {
  height: 100%;
}

.title {
  font-weight: bold;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100 upx;
  line-height: 100 upx;
  background-color: #FFFFFF;
  z-index: 999;
}

.title-top {
  text-align: center;
  margin: 30upx auto;
}

.title-edit {
  position: absolute;
  right: 20 upx;
  top: 0;
}

.footer {
  font-weight: bold;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100 upx;
  line-height: 100 upx;
  display: flex;
  border-top: #d5d5d6 2 upx solid;
  background-color: #FFFFFF;
  z-index: 999;
}

.shop-footer-item {
  width: 40%;
  height: 100%;
  margin-left: auto;
}

.money {
  color: #FD6801;
}

.checkbox-icon {
  width: 160 upx;
  padding-left: 40 upx;
}

.settlement-btn {
  width: 100%;
  height: 100%;
  background-color: #FD6801;
  color: #FFFFFF;
  border-radius: 0;
}
</style>
<style>
page {
  height: 100% !important;
}
</style>

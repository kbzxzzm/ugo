<template>
  <view class="wrapper">
    <!-- 收货信息 -->
    <view class="shipment">
      <block v-if="address">
        <view class="dt">收货人: </view>
        <view class="dd meta">
          <text class="name">{{address.userName}}</text>
          <text class="phone">{{address.telNumber}}</text>
        </view>
        <view class="dt">收货地址:</view>
        <view class="dd">{{detailAddress}}</view>
      </block>
      <button v-else type="primary" @click="chooseAddress">收货地址</button>
    </view>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <view
          :key="goods.goods_id"
          v-for="(goods, index) in carts"
          class="goods">
          <!-- 商品图片 -->
          <image class="pic" :src="goods.goods_small_logo"></image>
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{goods.goods_name}}</view>
            <view class="price">
              <text>￥</text>{{goods.goods_price}}<text>.00</text>
            </view>
            <!-- 加减 -->
            <view class="amount">
              <text
                @click="changeNumber(index, -1)"
                class="reduce">-</text>
              <!-- $event 是 vue 中固定的名称，代表事件对象 -->
              <input
                @input="setVal($event, index)"
                type="number"
                :value="goods.goods_number"
                class="number">
              <text
                @click="changeNumber(index, 1)"
                class="plus">+</text>
            </view>
          </view>
          <!-- 选框 -->
          <view class="checkbox">
            <icon
              @click="toggle(index)"
              type="success"
              size="20"
              :color="goods.goods_checked ? '#ea4451' : '#ccc'"></icon>
          </view>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <!-- uni-app 中计算属性在使用时存在 bug -->
      <!-- 如果计算属性在属性绑定时 -->
      <label class="checkall">
        <icon
          @click="checkAll"
          type="success"
          :color="all ? '#ea4451' : '#ccc'"
          size="20"></icon>
        全选
      </label>
      <view class="total">
        合计: <text>￥</text><label>{{amount}}</label><text>.00</text>
      </view>
      <view @click="createOrder" class="pay">结算({{checkedGoods.length}})</view>
    </view>
  </view>
</template>

<script>
  export default {

    data () {
      return {
        // 购物车数据
        carts: [],
        // 收货地址
        address: null
      }
    },
    computed: {
      // 拼接详细地地址
      detailAddress () {
        return this.address && [
          this.address.provinceName,
          this.address.cityName,
          this.address.countyName,
          this.address.detailInfo
        ].join('');
      },

      // 选中的商品
      checkedGoods () {
        return this.carts.filter((goods) => {
          return goods.goods_checked;
        })
      },

      // 判断购物车的商品数量是否是选中商品数量相等
      all () {
        return this.carts.length === this.checkedGoods.length;
      },

      // 总金额
      amount () {
        let total = 0;
        this.checkedGoods.forEach((goods) => {
          total += goods.goods_price * goods.goods_number;
        });

        return total;
      }
    },

    methods: {
      // 生成订单
      async createOrder () {
        // 1. 必须有收货地址
        if(!this.address) return uni.showToast({title: '地址不能为空!'});
        // 2. 至中选中一件商品
        if(!this.checkedGoods.length) return uni.showToast({title: '至少1件商品!'});
        // 3. 检测是否登录
        if(!uni.getStorageSync('token')) {
          // 跳转到登录
          return uni.navigateTo({
            url: '/pages/auth/index'
          })
        }

        // 请求后端接口（生成订单）
        const {message, meta} = await this.http({
          url: '/api/public/v1/my/orders/create',
          method: 'post',
          header: {
            // 登录状态
            Authorization: uni.getStorageSync('token')
          },
          data: {
            order_price: this.amount,
            consignee_addr: this.detailAddress,
            goods: this.checkedGoods
          }
        })

        // console.log(message);
        if(meta.status === 200) {
          uni.navigateTo({
            url: '/pages/order/index'
          })
        }
      },
      chooseAddress () {
        // 调用 API 获取微信用户的收货地址
        uni.chooseAddress({
          success: (info) => {
            // console.log(info);
            // 将用户的收货地址保存起来
            this.address = info;
          }
        })
      },
      setVal (ev, index) {
        // console.log(ev);
        // 表单中的内容
        let val = ev.detail.value;
        // 边界值
        if(val && val <= 1) return val = 1;
        if(val >= 10) return val = 10;
        // 修改数量
        this.carts[index].goods_number = val;
        // 保持本地存储的数据为最新
        uni.setStorageSync('carts', this.carts);
      },
      // 选中所有商品
      checkAll () {
        this.carts.forEach((goods) => {
          goods.goods_checked = true;
        })
        // 保持本地存储的数据为最新
        uni.setStorageSync('carts', this.carts);
      },
      // 切换选中状态
      toggle (index) {
        this.carts[index].goods_checked = !this.carts[index].goods_checked;
        // 保持本地存储的数据为最新
        uni.setStorageSync('carts', this.carts);
      },
      // 修改商品购买数量
      changeNumber (index, step) {
        let num = this.carts[index].goods_number;
        // 检测边界值，最少1件，最多不超库存（假设10）
        if(step === -1 && num <= 1) return;
        if(step === 1 && num >= 10) return;
        this.carts[index].goods_number += step;
        uni.setStorageSync('carts', this.carts);
      },
      // 获取购物车接口
      getCarts () {
        // 由于购物车是存在本地的，所以无须请求
        // 后端而是从本地获取即：
        this.carts = uni.getStorageSync('shop') || [];
      }
    },
    
    onLoad () {
      // 获取购物车数据
      this.getCarts();
    }
  }
</script>

<style scoped lang="less">
  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    .dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    .dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    text.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .shopname {
      padding: 30rpx;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;

      .checkbox {
        width: 101rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -100rpx;
        top: 0;
      }

      &:last-child {
        border-bottom: none;
      }

      .pic {
        width: 200rpx;
        height: 200rpx;
        margin-right: 30rpx;
      }

      .meta {
        flex: 1;
        font-size: 27rpx;
        color: #333;
        position: relative;
      }

      .name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        position: absolute;
        bottom: 0;

        color: #ea4451;
        font-size: 33rpx;

        text {
          font-size: 22rpx;
        }
      }

      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        text {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    /* #ifdef H5 */
    bottom: 50px;
    /* #endif */
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, text {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      text {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }
  }
</style>


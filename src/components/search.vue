<template>
  <view class="search" :class="{ show: focus }">
    <view class="input-box">
      <i class="icon"></i>
      <input type="text" placeholder="输入文字即可搜索" @focus="gosearch" />
      <text class="cancel" @click="show">取消</text>
    </view>
    <!--搜索内容-->
    <view class="content"> </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      focus: false
    };
  },
  methods: {
    gosearch() {
      this.focus = true;
      const { windowHeight } = uni.getSystemInfoSync();//   console.log(windowHeight);
      this.$emit('search',{pageHeight:windowHeight+'px'})
    },
    show() {
      this.focus = false;
       this.$emit('search',{pageHeight:'auto'})
    }
  },
  onLoad(){
     
  }
};
</script>

<style lang="less" scoped>
.search {
  // overflow: hidden;
  .input-box {
    display: flex; //让盒子在右边显示
    background-color: #ea4451;
    padding: 20rpx 15rpx;
    input {
      flex: 1; //让盒子在右边显示
      background-color: #fff;
      height: 60rpx;
      text-align: center;
    }
    .icon {
      position: absolute;
      background-image: url("../static/images/icon_search@2x.png");
      width: 33rpx;
      height: 33rpx;
      left: 190rpx;
      top: 35rpx;
      background-size: contain;
    }
  }
  .cancel {
    display: none;
    width: 100rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    color: #333;
    font-size: 30rpx; //文字的高度
  }

  &.show {
    .icon {
      position: absolute;
      background-image: url("../static/images/icon_search@2x.png");
      width: 33rpx;
      height: 33rpx;
      left: 147rpx;
      top: 35rpx;
      background-size: contain;
    }
    z-index: 9;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .input-box {
      background-color: #ccc; //并集选择器，既要search还要show，省一些资源
    }
    input {
      flex: 1; //让盒子在右边显示
      background-color: #fff;
      height: 60rpx;
      text-align: center;
    }
    .cancel {
      display: block;
    }
    .content {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 100rpx;
      background-color: #fff;
    }
  }
}
</style>

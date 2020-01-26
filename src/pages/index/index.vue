<template>
  <view class="content">
    <!-- 搜索框 -->
    <view class="search">
      <view class="input-box">
        <input type="text" placeholder="输入文字即可搜索" />
      </view>
      <!--搜索内容-->
      <view class="content"></view>
    </view>

    <view class="swiper">
      <swiper circular>
        <swiper-item
          ><navigator url=""
            ><image
              src="../../static/uploads/banner1.png"
              mode="scaleToFill"
              lazy-load="false"
            >
            </image> </navigator
        ></swiper-item>
        <swiper-item
          ><navigator url=""
            ><image
              src="../../static/uploads/banner2.png"
              mode="scaleToFill"
              lazy-load="false"
            >
            </image> </navigator
        ></swiper-item>
        <swiper-item
          ><navigator url="">
            <image
              src="../../static/uploads/banner3.png"
              mode="scaleToFill"
              lazy-load="false"
            >
            </image></navigator
        ></swiper-item>
      </swiper>
    </view>

    <view class="navs">
      <navigator url="{{}}">
        <image src="../../static/uploads/icon_index_nav_1@2x.png"> </image>
      </navigator>
      <navigator url="{{}}">
        <image src="../../static/uploads/icon_index_nav_2@2x.png"> </image>
      </navigator>
      <navigator url="{{}}">
        <image src="../../static/uploads/icon_index_nav_3@2x.png"> </image>
      </navigator>
      <navigator url="{{}}">
        <image src="../../static/uploads/icon_index_nav_4@2x.png"> </image>
      </navigator>
    </view>

    <view class="floors">
      <view class="floor">
        <view class="title">
          <image src="../../static/uploads/pic_floor01_title.png"> </image>
        </view>
        <view class="container"> </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.search {
  .input-box {
    background-color: #ea4451;
    padding: 20rpx 15rpx;
    input {
      background-color: #fff;
      height: 60rpx;
    }
  }
}
swiper {
  height: 340rpx;
}
.swiper image {
  width: 750rpx;
  height: 340rpx;
}
.navs {
  height: 192rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  navigator {
    width: 128rpx;
    height: 140rpx;
  }
}
.floors {
	.floor{
		.title{
			width: 750rpx;
			height: 60rpx;
		}
	}
}
</style>

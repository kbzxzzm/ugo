<template>
  <view class="content" :style="{ overflow: 'hidden', height: pageheight }">
    <!-- 搜索框,自定义组件 -->
    <search @search="disabledscroll"></search>

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
        <view class="item">
          <navigator url="">
            <image src="../../static/uploads/pic_floor02_1@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor02_2@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor02_3@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor02_4@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor02_5@2x.png"> </image>
          </navigator>
        </view>
        <view class="container"> </view>
      </view>

      <view class="floor">
        <view class="title">
          <image src="../../static/uploads/pic_floor02_title.png"> </image>
        </view>
        <view class="item">
          <navigator url="">
            <image src="../../static/uploads/pic_floor03_1@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor03_2@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor03_3@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor03_4@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor03_5@2x.png"> </image>
          </navigator>
        </view>
        <view class="container"> </view>
      </view>

      <view class="floor">
        <view class="title">
          <image src="../../static/uploads/pic_floor03_title.png"> </image>
        </view>
        <view class="item">
          <navigator url="">
            <image src="../../static/uploads/pic_floor01_1@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor01_2@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor01_3@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor01_4@2x.png"> </image>
          </navigator>
          <navigator url="">
            <image src="../../static/uploads/pic_floor01_5@2x.png"> </image>
          </navigator>
        </view>
        <view class="container"> </view>
      </view>
    </view>
  </view>
</template>

<script>
import search from "@/components/search.vue";
export default {
  data() {
    return {
      pageheight: "auto"
    };
  },
  methods: {
    disabledscroll(params) {
      console.log("父组件触发", params);
      this.pageheight = params.pageHeight;
    },
  async  getswiper() {
    //   uni.request({
    //     url: "http://ugo.botue.com/api/public/v1/home/swiperdata",
    //     success(info) {
    //       console.log(info);
    //     }
	//   });老式方法
	//    const res=await uni.request({
    //     url: "http://ugo.botue.com/api/public/v1/home/swiperdata"
	//   });
	//   console.log(res);
	//   function http(baseurl){
	// 	  return function(url){
	// 		  uni.request({
	// 			  url:baseurl+url
	// 		  })
	// 	  }
	//   }
	//   http('http://www.baidu.com')('/api/123')
  const {message}=await this.http({url:'/api/public/v1/home/swiperdata'})
  console.log(message);
  
  },
    getnav() {},
    getfloor() {}
  },
  onLoad() {
    //当前页面加载发送请求，拿数据
    this.getswiper();
    this, getnav();
    this.getfloor();
  },

  components: {
    search
  }
};
</script>

<style lang="less" scoped>
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
  .floor {
    .title {
      width: 750rpx;
      height: 60rpx;
      background-color: #f4f4f4;
      padding: 30rpx 0 0 15rpx;
    }
  }
}
.item {
  padding: 20rpx 16rpx;
  overflow: hidden; //*隐藏溢出的view
  navigator {
    float: left;
    margin-left: 10rpx;
  }
  navigator:first-child {
    width: 232rpx;
    height: 386rpx;
    margin-left: 0;
  }
  navigator:nth-child(3),
  navigator:nth-child(4) {
    width: 193rpx;
    height: 188rpx;
  }
  navigator:nth-child(2),
  navigator:nth-child(5) {
    width: 273rpx;
    height: 188rpx;
  }
  navigator:nth-child(4),
  navigator:nth-child(5) {
    margin-top: 13rpx;
  }
}
</style>

<template>
  <view class="content" :style="{ overflow: 'hidden', height: pageheight }">
    <!-- 搜索框,自定义组件 -->
    <search @search="disabledscroll"></search>
    <view class="swiper">
      <swiper circular>
        <swiper-item v-for="item in swiperlist" :key="item.goods_id"
          ><navigator :url="'/pages/goods/index?id='+item.goods_id"
            ><image :src="item.image_src"> </image> </navigator
        ></swiper-item>
      </swiper>
    </view>
    <view class="navs">
      <navigator
        :open-type="item.open_type||'navigate'"
        :url="item.open_type ? '/pages/classification/index':'/pages/list/index?query='+item.name"
        v-for="item in navlist"
        :key="item.name"
      >
        <image :src="item.image_src"> </image>
      </navigator>
    </view>

    <view class="floors">
      <view class="floor" :key="key" v-for="(item, key) in floorlist">
        <view class="title">
          <image :src="item.floor_title.image_src"></image>
        </view>
        <view class="item">
          <navigator
            :url="'/pages/list/index?query='+params.name"
            v-for="(params, index) in item.product_list"
            :key="index"
          >
            <image :src="params.image_src"> </image>
          </navigator>
        </view>
      </view>
    </view>
    <i class="top"
    v-if="scrollTop>100"
     @click="top"></i>
  </view>
</template>

<script>
import search from "@/components/search.vue";
export default {
  data() {
    return {
      pageheight: "auto",
      swiperlist: [],
      navlist: [],
      floorlist: [],
      scrollTop:0//设置后只能隐藏，这时必须事件监听才能知道用户做了什么
    };
  },
  methods: {
    top(){
     uni.pageScrollTo({scrollTop:0})
    },
    disabledscroll(params) {
      console.log("父组件触发", params);
      this.pageheight = params.pageHeight; //修改页面高度，防止滚动
    },
    async getswiper() {
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
      const { message } = await this.http({
        url: "/api/public/v1/home/swiperdata"
      });
      this.swiperlist = message;//赋值给list利于操作
    },
    async getnav() {
      const { message } = await this.http({
        url: "/api/public/v1/home/catitems"
      });
      // console.log(message);
      this.navlist = message;
    },
    async getfloor() {
      const { message } = await this.http({
        url: "/api/public/v1/home/floordata"
      });
      this.floorlist = message;
    }
  },
  async onPullDownRefresh() {
    console.log("用户下拉刷新了"); //监听用户下拉刷新
    await this.getswiper();
    await this.getnav();
    await this.getfloor();
    uni.stopPullDownRefresh(); //api关闭下拉交互,这是异步的，添加async和await同步
  },
  onLoad() {
    //当前页面加载发送请求，拿数据
    this.getswiper();
    this.getnav();
    this.getfloor();
  },
onPageScroll(ev){
console.log(ev);//监听滚动到哪了
this.scrollTop=ev.scrollTop//修改data中的值
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
.top {
  background-image: url("../../static/顶部.png");
  background-size: contain;
  width: 60rpx;
  height: 60rpx;
  position: fixed;
  right: 50rpx;
  bottom: 120rpx;
  background-color: #fff;
  border-radius: 50%;
  opacity: 0.4;
}
</style>

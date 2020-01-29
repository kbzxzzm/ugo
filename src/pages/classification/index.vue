<template>
  <view>
    <!-- 搜索 -->
    <search />
    <!-- 分类 -->
    <view class="category">
      <!-- 顶级分类 -->
      <view class="sup">
        <scroll-view scroll-y>
          <text
            @click="clickcat(index)"
            :class="{ active: catindex === index }"
            :key="index"
            v-for="(item, index) in catlist"
            >{{ item.cat_name }}</text
          >
        </scroll-view>
      </view>
      <!-- 子级分类 -->
      <view class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image
            src="http://static.botue.com/ugo/uploads/category.png"
            class="thumb"
          ></image>
          <view
            class="children"
            v-for="(item, index) in childrens"
            :key="index"
          >
            <view class="title">{{ item.cat_name }}</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator
                url="/pages/list/index"
                :key="index"
                v-for="(child, index) in item.children"
              >
                <image
                  :src="child.cat_icon"
                ></image>
                <text>{{child.cat_name}}</text>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>
<script>
import search from "@/components/search";
export default {
  components: {
    search
  },
  computed:{
    childrens(){
        return this.catlist.length && this.catlist[this.catindex].children//返回数组长度以及数组对应索引子级长度
    }
  },
  data() {
    return {
      catlist: [],
      catindex: 0
    };
  },
  onLoad() {
    this.getcategories();
  },
  methods: {
    clickcat(index) {
      this.catindex = index;
    },
    async getcategories() {
      const { message } = await this.http({
        url: "/api/public/v1/categories"
      });
      // console.log(message);
      this.catlist = message;
    }
  }
};
</script>
<style scoped lang="less">
scroll-view {
  height: 100%;
}
.category {
  display: flex;
  width: 100%;
  position: absolute;
  top: 100rpx;
  bottom: 0;
  .sup {
    width: 196rpx;
    background-color: #f4f4f4;
    text {
      display: block;
      height: 100rpx;
      text-align: center;
      line-height: 100rpx;
      font-size: 27rpx;
      color: #333;
      border-bottom: 1rpx solid #eee;
      &:last-child {
        border-bottom: none;
      }
      &.active {
        background-color: #fff;
        color: #ea4451;
        position: relative;
        &::before {
          content: "";
          display: block;
          width: 8rpx;
          height: 60rpx;
          transform: translateY(-50%);
          background-color: #ea4451;
          position: absolute;
          left: 0;
          top: 50%;
        }
      }
    }
  }
  .sub {
    flex: 1;
    padding: 20rpx 18rpx;
    .thumb {
      width: 100%;
      height: 180rpx;
    }
    .children {
      text-align: center;
      color: #333;
      .title {
        display: inline-block;
        margin: 40rpx 0 20rpx;
        font-size: 30rpx;
        &::before {
          content: "/";
          margin-right: 20rpx;
          color: #666;
        }
        &::after {
          content: "/";
          margin-left: 20rpx;
          color: #666;
        }
      }
    }
    .brands {
      display: flex;
      flex-wrap: wrap;
      navigator {
        width: 33%;
        margin-bottom: 20rpx;
      }
      image {
        width: 120rpx;
        height: 120rpx;
      }
      text {
        display: block;
        font-size: 24rpx;
      }
    }
  }
}
</style>

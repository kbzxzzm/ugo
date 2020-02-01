<template>
  <view class="search" :class="{ show: focus }">
    <view class="input-box">
      <i class="icon"></i>
      <input
        type="text"
        placeholder="输入文字即可搜索"
        @input="search"
        v-model="keywords"
        @focus="foucs"
        @confirm="golist"
      />
      <text class="cancel" @click="show">取消</text>
    </view>
    <!--搜索内容-->
    <div class="content">
      <div class="title">
        搜索历史<span class="clear" @click="clear"></span>
      </div>
      <div class="history">
        <navigator
          url="/pages/list/index"
          v-for="(item, index) in history"
          :key="index"
          >{{ item }}</navigator
        >
      </div>
      <!-- 结果 -->
      <scroll-view scroll-y class="result" v-if="searchlist.length">
        <navigator
          url="/pages/goods/index"
          v-for="(item, index) in searchlist"
          :key="index"
          >{{ item.goods_name }}</navigator
        >
      </scroll-view>
    </div>
  </view>
</template>

<script>
export default {
  data() {
    return {
      focus: false,
      keywords: "",
      searchlist: [],
      history: uni.getStorageSync("history") || [] //
    };
  },
  methods: {
    clear() {
      this.history = [];
    },
    golist() {
      console.log("用户敲击回车了/return");
      this.history.push(this.keywords);
      this.history = [...new Set(this.history)]; //去重
      // console.log(this.history);
      uni.setStorageSync("history", this.history);
      // this.history.push(this.keywords);
      uni.navigateTo({
       url: '/pages/list/index?query=' + this.keywords
      });
    },
    async search() {
      const { message } = await this.http({
        url:'/api/public/v1/goods/qsearch',
        data: {
          query: this.keywords
        }
      });
      this.searchlist = message;
      // console.log(message);
    },
    foucs() {
      this.focus = true;
      const { windowHeight } = uni.getSystemInfoSync(); //   console.log(windowHeight);
      this.$emit("search", { pageHeight: windowHeight + "px" });
    },
    show() {
      this.focus = false;
      this.$emit("search", { pageHeight: "auto" });
      this.placeholder = "";
      this.keywords = "";
      this.searchlist = [];
    }
  },
  onLoad() {}
};
</script>

<style lang="less" scoped>
.content {
  display: none;
}
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
    z-index: 9;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .icon {
      position: absolute;
      background-image: url("../static/images/icon_search@2x.png");
      width: 33rpx;
      height: 33rpx;
      left: 147rpx;
      top: 35rpx;
      background-size: contain;
    }

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
      display: block;
      .title {
        font-size: 27rpx;
        line-height: 1;
        color: #333;
      }
      .clear {
        display: block;
        width: 27rpx;
        height: 27rpx;
        float: right;
        background-image: url(http://static.botue.com/ugo/images/clear.png);
        background-size: cover;
      }

      .history {
        padding-top: 30rpx;

        navigator {
          display: inline-block;
          line-height: 1;
          padding: 15rpx 20rpx 12rpx;
          background-color: #ddd;
          font-size: 24rpx;
          margin-right: 20rpx;
          margin-bottom: 15rpx;
          color: #333;
        }
      }

      .result {
        // display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #fff;

        navigator {
          line-height: 1;
          padding: 20rpx 30rpx;
          font-size: 24rpx;
          color: #666;
          border-bottom: 1px solid #eee;

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
}

.result {
  // display: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;

  navigator {
    line-height: 1;
    padding: 20rpx 30rpx;
    font-size: 24rpx;
    color: #666;
    border-bottom: 1px solid #eee;

    &:last-child {
      border-bottom: none;
    }
  }
}

// 获得焦点状态
&.focused {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;

  .input-wrap {
    background-color: #eee;

    &::before {
      display: none;
    }

    &::after {
      display: block;
    }
  }

  span.cancle {
    display: block;
  }

  .content {
    display: block;
  }
}
</style>

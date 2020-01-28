//   function http(baseurl){
// 	  return function(url){
// 		  uni.request({
// 			  url:baseurl+url
// 		  })
// 	  }
//   }
//   http('http://www.baidu.com')('/api/123')
export default function(config) {
  const { baseURL } = config; //传入baseurl
  return function(vue) {
    // console.log(vue);
    vue.prototype.http = async function(params) {
      // console.log('全局方法添加上了');
      const { url, method, data } = params;
      uni.showLoading({title:'数据加载中!'})//数据发送前給用户提示
      const res=await uni.request({
        url: baseURL + url,
        method,
        data,
      });
      uni.hideLoading()//数据回来，关闭提示框
      // console.log(res);
      return res[1].data  //将数据第一项里面的data返回出去
    };
  };
}

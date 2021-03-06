//ajax的配置 ==> 优化根路径
$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  // console.log(options);
  //处理请求头
  options.headers = {
    // token 的值存储在本地存储中，需要从本地存储中来获取到
    // Authorization 这个不是随便写的，后端定义要求的
    Authorization: localStorage.getItem("token"),
  };
});

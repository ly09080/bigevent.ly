$(function () {
  let form = layui.form;
  let layer = layui.layer;
  //发送ajax请求来获取到用户的基本信息
  getUserInfo();
  function getUserInfo() {
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        // console.log(res);
        //给表单赋值
        form.val("form", res.data);
      },
    });
  }

  //实现重置功能
  $("#resetBtn").click(function (e) {
    e.preventDefault();
    //重新发送ajax请求来获取到用户的信息填充到form中
    getUserInfo();
  });

  //实现表单的提交功能
  //1.给form注册submit事件
  //2.阻止其默认行为
  //3.手机表单数据
  //4.ajax
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    // console.log(data);

    $.ajax({
      url: "/my/userinfo",
      type: "POST",
      data,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg("修改用户信息失败!", { icon: 2 });
        }
        layer.msg("修改用户信息成功!", { icon: 1 });

        //更新index页面左侧导航的名字
        //window.parent 来获取到父页面(index页面)
        window.parent.getUserInfo();
      },
    });
  });
});

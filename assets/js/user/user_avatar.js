$(function () {
  let layer = layui.layer;
  //1.1获取裁剪区域的DOM元素
  let $image = $("#image");

  //1.2配置选项
  const options = {
    //纵横比
    aspectRatio: 1,
    //指定预览区域
    preview: ".img-preview",
  };

  //1.3创建裁剪区域
  $image.cropper(options);

  //点击上传按钮
  $("#chooseBtn").click(function () {
    //模拟点击了文件域
    $("[type=file]").click();
  });

  //给文件域注册change事件 ==> 当文件域发生改变的时候来触发该事件 ==> 更换裁剪区域的图片
  $("#file").change(function () {
    // console.log("wenj ");

    //获取到我们选择的图片 ==>通过文件域DOM对象的files的属性
    let file = this.files[0];

    //2.把我们选择的图片处理成一个url地址
    let newImgURL = URL.createObjectURL(file);
    //3.先销毁旧的裁剪区域,再重新设置图片路径,之后再创建新的裁剪区域
    $image.cropper("destroy").attr("src", newImgURL).cropper(options);
  });

  //确定按钮注册click==>发送ajax提交裁剪的头像
  $("#sureBtn").click(function () {
    let dataURL = $image
      .cropper("getCroppedCanvas", {
        //创建一个Canvas画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");
    // console.log(dataURL);
    $.ajax({
      url: "/my/update/avatar",
      type: "POST",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新头像失败!");
        }
        layer.msg("更新头像成功!", { icon: 1 });
        window.parent.getUserInfo();
      },
    });
  });
});

var $ = {
  params: function (obj) {
    var str = "";
    for (key in obj) {
      str += key + "=" + obj[key] + "&"
    }
    str = str.substring(0, str.length - 1);
    return str;
  },
  ajax: function(options) {
    var xhr = new XMLHttpRequest();
    // 对data的数据进行判断
    if (typeof options.data == "object") {
      options.data = this.params(options.data);
    }
    if (options.type.toLocaleLowerCase() === 'get') {
      options.url = options.url + "?" + options.data;
      options.data = null;
    }
    xhr.open(options.type, options.url);
    if (options.type.toLocaleLowerCase() === 'post') {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    if (options.beforeSend) {
      var flag = options.beforeSend();
      if (!flag) {
        return;
      }
    }
    xhr.send(options.data);
    // 接收数据
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var responseData = xhr.responseText;
          // options.success(responseData)
          // if (options.success) {
          //   options.success(responseData)
          // }
          options.success && options.success(responseData);
        } else {
          // 请求出错的时候调用
          options.error && options.error();
        }
        // 调用回调函数
        options.complete && options.complete();
      }
    }
  }
}
## 文件上传

```php
header("Content-Type:text/html;charset=utf-8");
1:怎么去接收文件上传的数据 实际上就是去这个数组里面把客户端传递的文件内容一个一个取出来
//var_dump($_FILES);
接收到的是文件上传的数据. lifephoto 是文件上传的参数的名称
$_FILES=array(
  "lifephoto"=>
    array(
      name=>"", 客户端传递的文件的名称
      type=>"image/jpeg", 客户端传递的文件类型
      tmp_name=>"",  客户端传递的文件在服务端临时的一个保存地址
      error=>"0"  文件上传的时候可能会发生失败，出错误
      size=>"10823" 客户端上传的 文件的大小
    )
  );
1.1 获取文件上传的数据
  $fileName=$_FILES["lifephoto"]["name"];
1.2 获取文件上传的时候在服务器端临时的存储位置
  $tmpaddress=$_FILES["lifephoto"]["tmp_name"];
2：接收到文件上传的数据之后，我们怎么去处理这些数据.，实际上要把客户端上传的数据保存在服务端的硬盘上面.
2.1 怎么去保存，php 提供了一个函数 move_uploaded_file，可以将文件上传的数据移动到指定的某个目录文件下面接收两个参数
1:临时的文件存放的地址
2:我要放在的目标位置, images/1.jpg
  move_uploaded_file($tmpaddress,"images/".$fileName);
3：响应数据
  echo "<font color='green'>恭喜你，文件上传成功</font>";
```

### 网络通信协议

指服务器和客户端间进行通信时的约束和规范，客户端与服务端的数据交互并不是杂乱无章的，需要遵照（基于）一定的规范进行。

###常见协议

1、HTTP、HTTPS 超文本传输协议

2、FTP 文件传输协议

3、SMTP 简单邮件传输协议

4、即时通讯协议 XMPP

### http 协议

即超文本传输协议，网站是基于 HTTP 协议的，例如网站的图片、CSS、JS 等都是基于 HTTP 协议进行传输的。

HTTP 协议是由从客户机到服务器的请求(Request)和从服务器到客户机的响应(Response)进行了约束和规范。

即 HTTP 协议主要由请求和响应构成。

1、请求行

由请求方式、请求 URL 和协议版本构成

2、请求头

Host：localhost 请求的主机

Cache-Control：max-age=0 控制缓存

Accept：接受的文档 MIME 类型

User-Agent：很重要

Referer：从哪个 URL 跳转过来的

Accept-Encoding：可接受的压缩格式

3、请求主体

即传递给服务端的数据

**注：当以 post 形式提交表单的时候，请求头里会设置**

**Content-Type: application/x-www-form-urlencoded，以 get 形式当不需要**

特殊的请求头介绍：

Content-Type:""

referer: 请求头

refresh 响应头

Content-Type: 响应头

### **响应/响应报文**

响应由服务器发出，其规范格式为：状态行、响应头、响应主体。

1、状态行

由协议版本号、状态码和状态信息构成

2、响应头

Date：响应时间

Server：服务器信息

Content-Length：响应主体长度

Content-Type：响应资源的 MIME 类型

**MIME 是标识文件类型的，文件后缀并不能正确无误的标识文件的类型。**

**客户端与服务器在进行数据传输的时候都是以字节形式进行的，咱们可以理解成是以“文本形式”传输，这时浏览器就需要明确知道该怎么样来解析这些文本形式的数据，MIME 就是明确告知浏览器该如何来处理。**

3、响应主体

即服务端返回给客户端的内容；

状态码

常见的有 200 代表成功、304 文档未修改、403 没有权限、404 未找到、500 服务器错误,302 代表的是请求重定向。

### get 请求的数据格式.

1: 请求首行

```
GET 请求的提交方式  
/code/fileupload.html  根据地址去找服务器上面的资源.
HTTP/1.1 定义的协议的版本.

**GET /code/01_fileupload.html?username=zhangsan&age=11 HTTP/1.1**

主机地址:127.0.0.1

**Host	127.0.0.1**

**Upgrade-Insecure-Requests	1**

告诉服务器客户端浏览器的版本，以及操作系统的版本.
**User-Agent	Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36**

接收，告诉服务器，客户端接收的数据格式.
**Accept	text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8**

告诉服务器，请求来自于那个页面.
**Referer	http://127.0.0.1/code/**

接收的服务器的压缩类型
**Accept-Encoding	gzip, deflate, br**

接收的语言。
**Accept-Language	zh-CN,zh;q=0.9,ko;q=0.8,zh-HK;q=0.7**

版本匹配
**If-None-Match	"2a000000005186-273-56efe0a46c0d8"**

修改
**If-Modified-Since	Tue, 19 Jun 2018 12:44:16 GMT**
```

---

### POST 请求的数据格式

请求首行

POST /day_02/code/api/02_post.php HTTP/1.1

请求头 请求头的名称 以及请求头的值。

```
Host	127.0.0.1
Content-Length	15
Cache-Control	max-age=0
Origin	http://127.0.0.1
Upgrade-Insecure-Requests	1
//POST 提交有一个默认的请求头 Content-Type  application/x-www-form-urlencoded
Content-Type	application/x-www-form-urlencoded
User-Agent	Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36
Accept	text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Referer	http://127.0.0.1/day_02/code/01_fileupload.html
Accept-Encoding	gzip, deflate, br
Accept-Language	zh-CN,zh;q=0.9,ko;q=0.8,zh-HK;q=0.7
```

请求空行

请求体

---

### `get`方式提交跟`post`方式提交的具体的区别:

1. get发送的数据都在地址栏当中，不安全 ，请求的参数在地址栏当中

2. get发送的数据对数据大小有限制。 请求的参数在地址栏当中

3. get没有请求体，请求的参数在地址栏当中

4. post发送的数据在请求体当中，相对安全

5. post对请求的数据的大小没有限制，文件上传就必须使用post

6. post有一个特殊的请求头 Content-Type:application/x-www-form-urlencoded

7. get的请求头相对较少，性能稍微要高一些.

---

服务器响应到客户端的内容，称为响应的数据格式.
响应的数据格式是服务器发送到客户端的。
响应首行
响应头
响应空行
响应体

```
响应首行
HTTP/1.1 200 OK
服务器的事件
Date	Tue, 19 Jun 2018 13:45:04 GMT
Server	Apache/2.2.21 (Win32) PHP/5.3.10
//文件的最后修改文件
Last-Modified	Tue, 19 Jun 2018 13:30:43 GMT
//文件的版本.
ETag	"3600000000518d-253-56efeb066168b"
//字节
Accept-Ranges	bytes
//告诉客户端浏览器，响应体的长度.
Content-Length	595
//告诉客户端浏览器，响应的数据格式.  text/html
Content-Type	text/html
```

**协议就是定义的一堆数据格式**

### 一些常用的

#### 请求头

`User-Agent`：告诉服务器，客户端浏览器的版本以及操作系统的版本

```php
<?php
// 解决乱码，给客户端一个响应头
header("Content-Type:text/html;charset=utf-8");
// 1:获取请求头 获取所有的请求头.
$arrHeader = getallheaders();
// 2:我获取的是User-Agent 请求头对应的值
$headeValue = $arrHeader["User-Agent"];
// echo $headeValue;
// 3:php 里面有一个函数 strstr() 判断字符串是否包含指定的字符串.
if(strstr($headeValue,"Chrome")){
  echo "您当前使用的google 浏览器，棒棒哒!";
}else if(strstr($headeValue," Firefox")){
  echo "您当前使用的火狐 浏览器，双击666";
}else if(strstr($headeValue,"MSIE")){
  echo "您当前使用的浏览器版本较低，请<a href='http://www.360.com'>升级</a>";
}
?>
```

#### 响应头

`Refresh`：告诉客户端浏览器，几秒钟之后跳转某个具体的页面

```php
// 案例2
<?php
header("Content-Type:text/html;charset=utf-8");
//1:给一个响应头
header("Refresh:5; url=http://www.baidu.com");
// 2：给文字提示.
echo "<span>5</span> 秒钟之后会自动跳转页面，如果没有跳转，请点击<a href='http://www.baidu.com'>这里</a>";
?>
<script>
  var i = 5;
  var ids = window.setInterval(function() {
    i--;
    if(i==0){
      window.clearInterval(ids);
      return;
    }
    document.querySelector("span").innerHTML=i;
  }, 1000);
</script>
```

+++
author = "Zhou Fang"
title = "网址操作及页面转向的几种方式"
date = "2017-02-04"
updated = "2017-02-04"
category = "网站建设"
tags = [
    "Apache",
    "Javascript",
    "Nginx",
]
+++

# 浅谈页面转向
先来讲讲页面转向的问题。
「页面转向」常规来讲是一种对网址重写的过程。  
所以，Ngnix 及 Apache 的 Rewrite 规则是非常常用的手段。
<!--more-->

# Ngnix 的页面转向
Ngnix 需要自行修改对应空间的 Ngnix conf 文件。

## 方法 A
通过`$host`获取域名信息来判断。
```nginx
if ($host != 'www.fang2hou.com' ) {
    rewrite ^/(.*)$ http://www.fang2hou.com/$1 permanent;
}
```
此转向方式为 301 转向。
意为「非指定域名均转向指定域名且保留后面的 path」。
## 方法 B
通过 80 端口传入的网址直接进行 rewrite 转向。
```nginx
server
{
    listen 80;
    server_name test.com;
    rewrite ^/(.*)$ http://www.test.com/$1 permanent;
}
```
此转向方式为 301 转向。
意为「从匹配地址的 80 端口传入后，转发到指定地址且保留后面的 path」。
比较麻烦的是，该方法需要自己建一个独立的 vhost 来完成操作。

# Apache 的页面转向
Apache 需要自行修改对应空间的 http.conf 文件。
开启 Apache 的 Rewrite 模块。（默认**关闭**）
```apache
LoadModule rewrite_module modules/mod_rewrite.so
```

## 方法
添加
```apache
RewriteEngine on
RewriteCond %{HTTP_HOST} ^fang2hou.com [NC]
RewriteRule ^(.*)$ http://www.fang2hou.com/$1 [L,R=301]
```

# <meta> 标签法
在`<head>`标签中，我们只要添加如下代码即可完成转向。
```html
<meta http-equiv="refresh" content="0;url=https://www.google.co.jp">
```
这样，网页就会自动转向到谷歌。

# JavaScript 操作网址
网址操作是基于 Javascript 的，非常的简便，快捷。
为了更加容易解释，我将采用下面的这个网址：
<center>`http://fang2hou.com/index.html#section-1`</center>

## 网络协议（protocol）实际操作
首先我们可以剥离网址中的**网络协议**部分。
```js
var siteprot = "";
siteprot = window.location.protocol;
```
此时，我们将网页窗口的网址的网络协议部分放到了`siteprot`变量中。
**注意： `siteprot`现在是「http:」而不是「http」。冒号是获取到的数据的一部分。**
自然，我们也可以像下方一样来改变网络协议。**不需要加冒号。**
```js
window.location.protocol = "https";
```

## 其他操作
与上方类似，各个属性都能够被操作。

| 属性 | 说明 |
|--------|--------|
| Location | 浏览器的实例对象 |
| Location.hash | 分隔符（如#及〜） |
| Location.host | 域名及端口信息 |
| Location.hostname | 域名信息 |
| Location.href | 完整网址信息 |
| Location.pathname | 域名信息 |
| Location.port | 端口信息 |
| Location.protocol | 网络协议 |
| Location.search | 查询部分（「?」之后的部分） |
+++
author = "Zhou Fang"
title = "OwnCloud 报 502 错误的处理"
date = "2017-05-27"
updated = "2017-05-27"
category = "网站建设"
tags = [
    "Nginx",
    "OwnCloud",
]
+++

# 背景
出于偷懒的目的，我总是采用 LNMP 一键安装包来部署 Nginx，MySQL 及 PHP。
但是在 OwnCloud 安装后，进入后台会报 502 错误，网上许多使用者都在这上面栽了一头。OwnCloud 对 Apache 的支持很不错，Nginx 仅仅提供了一个 Rewrite 文件。经过一段时间的摸索，其实也是有很简单的解决方案的。
<!--more-->

# 解决方案
## 检查 `pathinfo` 组件是否启用
OwnCloud 是要求 pathinfo 启用的，在 PHP 5.3 以上版本中，pathinfo 已经是默认安装的部分了，我们仅需在 Nginx 虚拟空间对应的 conf 文件中加入以下语句即可。
```nginx
include pathinfo.conf;
```
这样，我们就可以启用 pathinfo。
## 监听位置修改
```shell
upstream php-handler {
    server 127.0.0.1:9000;
    #server unix:/var/run/php5-fpm.sock;
}
```
上面是官方提供的监听规则，而使用 LNMP 一键安装包的情况下，设置的默认位置与其不同。
所以，我们只要监听 `/tmp/php-cgi.sock` 即可修正该设定。
```shell
upstream php-handler {
    server unix:/tmp/php-cgi.sock;
    #server 127.0.0.1:9000;
    #server unix:/var/run/php5-fpm.sock;
}
```
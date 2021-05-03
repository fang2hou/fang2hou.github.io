+++
author = "Zhou Fang"
title = "自定义 SSH 的服务端口"
date = "2017-02-03"
updated = "2017-02-03"
category = "通信网络"
tags = [
    "SSH",
]
+++

## 契机
每次在维护服务器的时候，总会在登录时收到许多其他 IP 尝试登陆 SSH 的失败信息。为了提高服务器的安全性，修改 SSH 默认的 `22` 端口可能会帮助屏蔽一些恶意扫描。

<!--more-->
## 修改方法
在撰写本文时，我较为常使用 CentOS 7。实际上，所有的 Linux 系统在这个设定上都大同小异，下面讲的方式是通用的。
SSH 端口的配置是存放在下面的路径 `/etc/ssh/sshd_config` 之中。
使用 vim 打开它
```shell
vim /etc/ssh/sshd_config
```
在文档中应该已经有这么一行：
```shell
#Port 22
```
就在该行下方另起一行，假设我们想修改到 10000 端口上，就可以输入
```shell
Port 10000
```
在添加/修改操作完毕后，保存设定。
接着重启服务，即可使修改生效。
```shell
service sshd restart
```
此时，你的 SSH 连接端口就转移到了 10000 端口。
今后在 Terminal 中使用 SSH 时，不要忘了加入端口信息
```shell
ssh -p 10000 Username@XXX.XXX.XXX.XXX
```
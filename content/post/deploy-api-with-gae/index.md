+++
author = "Zhou Fang"
title = "用 GAE 搭建简易 API"
date = "2018-02-14"
updated = "2018-02-16"
category = "网站建设"
tags = [
    "GAE",
    "Flask",
    "Python"
]
+++

# 注册 Google Cloud Platform
Google Cloud Platform，即**谷歌云平台**，提供了大量的云服务以及为期一年的 300 美金体验费用。
Google App Engine 是云平台上的一种服务，其实在很早以前就有了。但是随着基于这个服务的某个代理项目成熟，中国大陆对其进行了屏蔽。
不过也有好处，GAE 现在的使用门槛提高后，GAE 的滥用情况减少了很多。绑定自己的域名后还是可以解决大陆的访问问题。

> [Google Cloud Platform 主页](https://console.cloud.google.com)

注册 GCP 需要你拥有一张信用卡 / 借记卡（JCB, 银联不可以），一个谷歌账户，和一个能上谷歌的网络环境。
<!--more-->

# 安装 Google Cloud SDK
Google Cloud SDK，这是一个客户端，能够帮助我们快速管理 GCP 上的项目。
在这里，我用 macOS 做演示，其实是都差不多的。

1. 打开官方的 [macOS 支持页面](https://cloud.google.com/sdk/docs/quickstart-macos)，下载对应的文件包。  
2. 解压之

```bash
cd ~/Downloads
tar xzvf google-cloud-sdk-188.0.1-darwin-x86_64.tar.gz
```

3. 移动文件夹到你常用的地方。（下面路径是个例子，注意替换）

```bash
mv google-cloud-sdk ~/Applications/gcsdk
```

4. 执行安装文件

```bash
cd ~/Applications/gcsdk
./install.sh
```

5. 像我的话是使用 zsh 的，所以为了方便使用，添加文件到我的 zsh 配置文件中。
PS：zsh 对应 .zshrc，bash 对应 .bashrc 别加错文件了。

```bash
echo "source ~/Applications/gcsdk/path.zsh.inc"
```

# 创建一个 Flex 的 Python App Engine

Standard 对应 Python 2.7 （一直以来支持的版本）
Flexible 对应 Python 2.7 & 3.6（随着 Python 3 的流行，谷歌也提供了新的环境）
先登录认证一下自己的谷歌账户。

```bash
gcloud auth login<
```

在网页面板上创建一个 Python 的 App Engine，请注意，请一定要参加一下官方教程。
经过教程，你应该能很快掌握 GAE 的部署。

# 用 Flask 写出简单的 API
其实参考 Hello World 程序的代码，就算没有用过 Flask 的人，也能够在 1 小时内迅速的将 API 上线。
当然，前提是你已经将 API 所用到的各个方法已经封装好了。

# 部署到云端

谷歌已经帮你做了大部分工作，你只需要通过下面的代码即可一键部署。

```bash
gcloud app deploy --project <项目名>
```

# 有一个坑，如果你遇到了可以参考
谷歌好像不会自动把服务账号的邮箱添加进有权限的用户组，我们可以手动在面板上操作解决。
IAM 和管理 -> IAM -> 添加服务账号 -> 设置服务账号权限为编辑者

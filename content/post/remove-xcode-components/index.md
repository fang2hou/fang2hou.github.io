+++
author = "Zhou Fang"
title = "快速删除 Xcode 中的 Components"
date = "2017-03-19"
updated = "2017-03-19"
category = "开发手札"
tags = [
    "Xcode",
]
+++

# 更人性化的 Xcode
在 Xcode 中，有时候会特意下载一些 Component 比如 iOS 9.2 的 SDK 来测试是否能在不同系统版本上面运行。
但是，随着系统版本的不断更新，一些旧版本已经无需测试，但是 Apple 并没有提供一个删除的按钮。
好在 Xcode 在更新到最新版本之后，Components 保存地址十分的固定且打包程度极高。
<!--more-->

# 简单操作
用 Finder 打开存放文件夹。

```shell
open /Library/Developer/CoreSimulator/Profiles/Runtimes
```

就可以看到已经安装的 Component，我们直接删除就行了（需要 root 权限）。

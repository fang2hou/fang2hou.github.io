+++
author = "Zhou Fang"
title = "在 macOS 上为树莓派安装 Ubuntu Mate"
date = "2018-06-04"
updated = "2018-06-04"
category = "树莓派"
tags = [
    "Raspberry Pi",
]
+++

# 前言
树莓派官方系统 Raspbian 加了一些不必要的东西，作为系统洁癖，肯定还是想搞个比较纯净的环境。我这里推荐 Ubuntu Core 和 Ubuntu Mate。

鉴于 Ubuntu Mate 官方并没有提供在 macOS 上进行安装的教程。以下是我成功安装的简单步骤。

<!--more-->
# 安装步骤
采用了同官方系统安装同样的烧录步骤。
1. 从 [官方下载点](https://ubuntu-mate.org/download/) 下载镜像。
2. 解压 xz 压缩包，得到镜像文件 (.img)。
`unxz` 命令，或是其他解压工具。
3. 验证文件完整性，特别是用下载工具 P2P 下载的话，这真的非常重要。
```shell
shasum -a 256 <.img 镜像文件>
```
4. 打开「终端」，执行命令来获取各磁盘的信息。
```shell
diskutil list
```
5. 找到打算用作树莓派系统的 SD 卡，比如我的是 `/dev/disk2` 。
6. 执行命令，来格式化 SD 卡。
```shell
sudo diskutil eraseDisk <文件系统> <磁盘名> <磁盘>
```
7. 执行命令，来卸载磁盘用于后续烧录。
```shell
# sudo diskutil unmountDisk <磁盘>
```
8. 执行命令，烧录镜像。建议在镜像所在的文件夹执行，比较方便。
```shell
sudo dd bs=1m if=<.img 镜像文件> of=<磁盘路径> conv=sync
```

**小知识**
因为 `dd` 命令不是随机读取的，所以在采用 `dd` 命令写入的时候可以用 `rdisk` 替代 `disk` ，如 `/dev/disk2` 就用 `/dev/rdisk2` 就可以更快写入。

# 命令实例
``` shell
# 验证
shasum -a 256 ubuntu-mate-16.04.2-desktop-armhf-raspberry-pi.img.xz
# 解压
unxz ubuntu-mate-16.04.2-desktop-armhf-raspberry-pi.img.xz
# 查看磁盘列表
diskutil list
# 格式化磁盘
sudo diskutil eraseDisk FAT32 RPIBOOT /dev/disk2
# 卸载磁盘
sudo diskutil unmountDisk /dev/disk2
# 写入
sudo dd bs=1m if=ubuntu-mate-16.04.2-desktop-armhf-raspberry-pi.img of=/dev/rdisk2 conv=sync
```
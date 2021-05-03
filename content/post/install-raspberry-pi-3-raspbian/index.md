+++
author = "Zhou Fang"
title = "在树莓派上安装配置 Raspbian"
date = "2018-11-12"
updated = "2018-11-12"
category = "树莓派"
tags = [
    "Raspberry Pi",
]
+++

# 简介
`Raspbian` —— 一个专门用于树莓派的 Debian 分支，且唯一获得树莓派官方支持的系统。
本文将介绍在不同的主流操作系统中安装 `Raspbian` 的多种方法，你可以选择最适合自己的方式进行安装。

# 准备
1. 树莓派 (Raspberry Pi)
2. SD 卡及读卡器
3. 控制工具（选一个即可，也可无线）
    * 网线
    * HDMI 线 + 显示屏 + 键盘

<!--more-->
# 安装
## 下载镜像
首先，从 **[官方镜像网站](https://www.raspberrypi.org/downloads/raspbian/)** 下载最新的 Raspbian 操作系统。

其中，
1. `Raspbian Stretch with desktop and recommended software` 是自带了 LXDE，我的世界等一系列软件的开箱即用版本。
2. `Raspbian Stretch with desktop` 是自带了 LXDE，及必要的开发工具的开箱即用版本。
3. `Raspbian Stretch Lite` 是一个精简版本，自带了常用的库，开发工具，但是没有桌面和 GUI 程序。

个人强烈推荐第三个版本，因为就算想使用桌面也可通过 `aptitude` 很方便得进行安装，而开箱即用版本中存在的大量软件都是不常用的（如游戏，LibreOffice）。如果不熟悉纯命令行界面，第二个轻量桌面版本也是很推荐的。

3 个版本核心部分是一样的，所以在版本选择上不要有太大压力。

## 烧录
请根据操作系统来选择性的阅读本节。
### Windows 篇
Windows 下使用需要使用以下 2 个免费软件：
1. [SD 卡格式化工具](https://www.sdcard.org/chs/downloads/formatter_4/eula_windows/index.html)
2. [Win32 Disk Imager](https://zh.osdn.net/projects/sfnet_win32diskimager/downloads/Archive/Win32DiskImager-1.0.0-binary.zip/)

在安装/解压软件后，我们就可以开始实际的烧录工作了。

1. 解压 Zip 压缩包，得到镜像文件 (.img)。
2. 打开 `SD 卡格式化工具`，选择打算用作树莓派系统的 SD 卡，点击 `格式化` 按钮。
不需要任何特殊设置，直接格式化即可。
1. 打开 `Win32 Disk Imager`，点击蓝色的文件夹图标，选择镜像（.img），点击 `Write` 按钮开始写入。
不需要任何特殊设置，直接写入。如果你比较在意 MD5 验证，可根据下载页面上的 MD5 进行验证。

### macOS 篇
macOS 下不需要安装任何工具即可烧录。

1. 解压 Zip 压缩包，得到镜像文件 (.img)。
`unzip` 命令，或是其他解压工具。
3. 打开 `终端`，执行命令来获取各磁盘的信息。
```shell
diskutil list
```
3. 找到打算用作树莓派系统的 SD 卡，比如我的是 `/dev/disk2`。
4. 执行命令，来格式化 SD 卡。
语法为 `diskutil eraseDisk <文件系统> <新磁盘名> <磁盘>`
下方是我的例子：
```shell
sudo diskutil eraseDisk FAT32 RPIBOOT /dev/disk2
```
5. 执行命令，来卸载磁盘用于后续烧录。
语法为 `diskutil unmountDisk <磁盘>`
下方是我的例子：
```shell
sudo diskutil unmountDisk /dev/disk2
```
6. 执行命令，烧录镜像。建议在镜像所在的文件夹执行，比较方便。
语法为 `dd bs=1m if=<.img 镜像文件> of=<磁盘路径> conv=sync`
下方是我的例子：
```shell
sudo dd bs=1m if=2018-10-09-raspbian-stretch-lite.img of=/dev/rdisk2 conv=sync
```

# 配置
## SSH 配置
在烧录完成之后，在 SD 卡根目录下建立一个名为 `ssh` 的空文件，这样在系统启动的时候，树莓派会自动启用 SSH 功能。

## 连接到树莓派
第一次连接的时候，只有 3 种方式连接到树莓派。
1. 网线连接到本地网络。
2. 使用 HDMI 线接入屏幕。
3. 配置无线网卡连接到本地无线网络。（无头模式）

下面我就 3 种方式分别来介绍下连入方式。

__切记：Raspbian 默认账户为 `pi`，对应的密码是 `raspberry`。__

### 网线连接篇
1. 使用网线连接的其实也有很多种，但是不论你是通过路由器连接，还是直接接入电脑，我相信你都可以通过下面的命令来找到你的树莓派网络地址/主机名：
```shell
arp -a
```
2. 因为我们刚才已经配置了 SSH 远程连接，所以，我们可以直接用下面的命令来连接到树莓派。
   - Windows
   ```shell
   ssh pi@respberrypi
   ```
   - macOS
   ```shell
   ssh pi@respberrypi.lan
   ```
   - 如果网络设备名都不能获取到，用 IP 地址连接
   ```shell
   ssh pi@<树莓派 IP>
   ```
3. 登入 Raspbian 之后，用下面的命令运行树莓派自带的设置工具
```shell
sudo raspi-config
```
4. 选择 `Network Options`-`Wi-Fi`，添加无线网络的 SSID 及密码。
5. 记得同时设定时区（Timezone）。
6. 退出树莓派设定工具，用 `reboot` 重启机器，拔掉网线。

### HDMI 连接篇

> 如果你是桌面版本的 Raspbian，直接通过左上菜单中的 `Menu`-`Preferences`-`Raspberry Pi Configuration`设定更加简便。

1. 登入 Raspbian 之后，用下面的命令运行树莓派自带的设置工具。
```shell
sudo raspi-config
```
2. 选择 `Network Options`-`Wi-Fi`，添加无线网络的 SSID 及密码。
3. 记得同时设定时区（Timezone）。
4. 退出树莓派设定工具，用 `reboot` 重启机器，拔掉网线。
 
## 无头模式设定树莓派
**如果你无任一连接线，可以选择通过这个方法直接设定 Wifi。**
1. 在 SD 卡根目录下建立一个 `wpa_supplicant.conf` 文件：
```shell
country=JP
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
    ssid="<Wi-Fi 名>"
    psk="<Wi-Fi 密码>"
}
```
2. 使用网线连接的其实也有很多种，但是不论你是通过路由器连接，还是直接接入电脑，我相信你都可以通过下面的命令来找到你的树莓派网络地址/主机名：
```shell
arp -a
```
3. 因为我们刚才已经配置了 SSH 远程连接，所以，我们可以直接用下面的命令来连接到树莓派。
   - Windows
   ```shell
   ssh pi@respberrypi
   ```
   - macOS
   ```shell
   ssh pi@respberrypi.lan
   ```
   - 如果网络设备名都不能获取到，用 IP 地址连接
   ```shell
   ssh pi@<树莓派 IP>
   ```

## VNC 配置
VNC 是一个带图像的远程控制工具，如果你需要使用，可以在树莓派设定工具中启用 VNC 支持，然后下载一个 VNC 客户端连接即可。

# 常用软件
## Python 3
安装用于 Python3 的 pip，且添加 GPIO 支持。
之前有过因为忘记添加 Python 3 的 GPIO 包导致无法控制电机，囧。
```shell
sudo apt install python3-pip
pip3 install RPi.GPIO
```

## Go
1. 下载编译后的 Go 包
在 [Go 官方下载页面](https://golang.org/dl/) 中找到 ARMv6 平台的 Linux 版本下载地址。
更新此文时，适用于 ARMv6 的 Go 版本号为 1.11.5，我们可以用 `wget` 快速下载
```shell
wget https://dl.google.com/go/go1.11.5.linux-armv6l.tar.gz
```
2. 解包到 `/usr/local`。
```shell
tar -C /usr/local -xzf go1.11.5.linux-armv6l.tar.gz
```
3. 添加 Go 二进制文件目录到环境变量
如果在上一步放置 Go 到了其他地方，别忘了下面命令的目录地址要跟着改。
```shell
echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.profile
```
4. 重新读取 Shell 配置
```shell
source .profile
```

## Git
Git 版本控制。
```shell
sudo apt install git
```

## Vim
非常强大又方便的编辑器。
```shell
sudo apt install vim
```

## Zsh
通过 Aptitude 安装，且添加 `Oh-my-zsh` 项目
```shell
sudo apt install zsh git
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

## Xfce4
如果你是 Lite 版本的用户，且同时想要一个桌面，我这里推荐安装 Xfce4，占用低，效果也不错。
```shell
sudo apt install xfce4
```

# 参考文献
1. [Raspberry Pi 3（RASPBIAN JESSIE）OS インストールから初期設定【セットアップ前編 】](https://hirazakura.hatenablog.com/entry/raspberrypi/setup/first)
2. [2. How to configure Raspberry-Pi using sudo raspi-config - Youtube](https://www.youtube.com/watch?v=kiXotzK5eSQ)
3. [Getting Started - The Go Programming Language](https://golang.org/doc/install)
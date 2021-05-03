+++
title = "FzActive"
description = "FzActive"
date = "2021-05-01"
author = "Zhou Fang"
layout = "page"
+++

# FzActive 帮助

## ❗ 事前声明

FzActive 是一个用来免费试激活软件的研究项目。
无法保证 100% 的服务在线率，同时对非法使用也不负任何责任。

{{< colored red "请您使用正版！" >}}

## ✅ 支持的软件列表
### {{< faicon b microsoft >}} Microsoft 全线产品

这是一个微软 KMS 服务器的代替。
使用 FzActive，你就可以激活全部微软的软件及操作系统。
当你在安装微软的产品时，可以选择直接跳过验证，或者临时使用 [微软产品密钥](https://technet.microsoft.com/en-us/library/jj612867.aspx) 来跳过验证。

#### 使用方式

{{< colored red "请务必使用管理员权限打开命令提示符！" >}}

你可以经由以下命令来将 KMS 服务器切换到 `active.fang2hou.com`。
一般来说可以用于替换本地 KMS 服务器，或者替换别的失效在线 KMS 服务器。
```dos
slmgr.vbs -skms active.fang2hou.com
```

这是从头开始激活 Windows 10 专业版的步骤。
```dos
slmgr.vbs -ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr.vbs -skms active.fang2hou.com
slmgr.vbs -ato
```

Office 请通过 [Office Tools Plus](https://otp.landian.vip/) 来安装并设定 KMS 服务器。

#### 特别感谢
服务器端开发者：[Hotbird64](https://forums.mydigitallife.info/threads/50234-Emulated-KMS-Servers-on-non-Windows-platforms)

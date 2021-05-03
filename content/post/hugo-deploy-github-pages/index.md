+++
author = "Zhou Fang"
title = "Hugo 部署到 Github Pages"
date = "2021-05-03"
updated = "2021-05-03"
category = "网站建设"
tags = [
    "博客",
    "Hugo",
]
+++

# 开始之前
在开始介绍如何静态部署 Hugo 网站到 Github Pages 之前，首先你要现在本地建立一个 Hugo 网站，并且通过`hugo server`能够在本地成功预览不出错。

<!--more-->

# Github Actions
## 简介
Github Actions 是 Github 推出的自动化工具，功能和传统的 CI 工具 Travis CI 类似。通过排列组合他人的 Action（动作），并书写简单的步骤之后，就可以制作出符合自己需求的 Action（动作）。

简单的说，Github 提供了一个临时的云端计算实例，会根据脚本自动执行后销毁。Actions 不会保存信息，所以如果需要导出结果，那么需要自己添加上传或者更新 repo 的脚本。

常见的应用有自动部署，自动发布，代码质量检查等等。如果之前没有了解的话，可以借这个机会体验一下 CI 技术，熟练使用的话，可以显著得减少开发的复杂度。

## 脚本介绍

Github 会自动执行位于 `/.github/workflows` 中的脚本，在 push 到 Github 后可以直接在 Actions 这个标签页里确认。

我的博客源文件存放在 `hugo-source` 分支中，Github Pages 调用的是`gh-pages`分支。
所以整体的流程大概是：
1. 新建空环境
2. 拉取 `hugo-source`
3. 下载 Hugo
4. 编译
5. 上传到 `gh-pages`

这个脚本编辑自 Hugo 官方的 [文档](https://github.com/marketplace/actions/hugo-setup)。

```yaml
name: generation # 自定义任务名

on:
  push:
    branches: # 在指定的分支接收到了 push 事件之后
      - hugo-source  # hugo 源文件分支，比如我的博客是 hugo-source 分支

jobs:
  deploy:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2
        with: # 这里不指定 repo 的话就会自动拉取动作所在的 repo
          submodules: true  # 用于获取用 git submodule 引入的 Hugo 主题
          fetch-depth: 0    # 加快速度，编译时不需要获取 git 历史记录

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.81.0'
          # extended: true # 如果用 extend 版本的 Hugo 的话，得加上

      - name: Build # 编译网站
        run: hugo --minify

      - name: Deploy # 将编译后的结果放到 Github Pages 的分支里
        uses: peaceiris/actions-gh-pages@v3 # 这个动作可以将文件夹上传到远端的 gh-pages 分支
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public # Hugo 编译后默认位于 public 文件夹
```

这里唯一需要注意的是 `${{ secrets.GITHUB_TOKEN }}` 这个部分。
一般来说 Token（访问令牌）都是用的自己或者所属组织的，但在 Github Actions 里 Github 提供了一个通用的访问令牌，不需要在 repo 中进行额外配置就能调用。
如果需要较为高级的 CI 应用，那么可以改动这个访问令牌值。

# 一些附加工作
可以在 Hugo 源文件的分支里，忽略掉 `public` 文件夹。
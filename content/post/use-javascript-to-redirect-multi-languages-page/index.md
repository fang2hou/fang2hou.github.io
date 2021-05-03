+++
author = "Zhou Fang"
title = "使用 Javascript 来做多语言页面的转向"
date = "2017-02-06"
updated = "2017-02-06"
category = "网站建设"
tags = [
    "Javascript",
]
+++

# 契机
今天，我的一个项目更新了多语言的说明文档，为了更快的帮助用户，我觉得有必要做一个自动的语言转向功能。
经过一番查询，当前很多浏览器对「navigator.language」变量有很好的支持。  
藉此，我们可以使用 Javascript 来做一个语言识别并转向。

<!--more-->
# 代码
```js
setTimeout(function() {
    // 在 3s 后跳转
    // 修改 URL
    var siteHref = window.location.href;
    var siteDir = siteHref.split('/index');
    if (siteDir[1]) {siteDir[0] += '/';};
    // 获取浏览器语言
    var navlang = navigator.language;
    // 设定英语为默认语言
    var langpage = 'en';
    navlang = navlang.split('-')[0];
    // 确认转向目标
    if (navlang == 'zh'){langpage = 'zh';};
    if (navlang == 'ja'){langpage = 'ja';};
    // 修改 URL
    window.location.href = siteDir[0] + langpage;
}, 3000);
```

# 简单分析
* 首先这是一个通过`setTimeout`来延时3s后的转向。
* 正如代码中分段注释的那样，首先，我们要对当前的URL做一个处理。简单的来讲，就是提取出最纯粹的当前网站目录。（不带有默认 index 文件）
* 关于网址的操作，在之前的文章『[网址操作及页面转向的几种方式]({{< ref "/post/url-operation" >}})』中可以找到。
* 最后，我们先设定默认语言为英语，以帮助非支持语言的阅读者。接着，通过「navigator.language」来获取浏览器语言，并且用字符串分割功能去除国家信息，将相应语言的值写在默认语言中。
* 根据URL规则将新的网址覆盖到用户的浏览器。

# 总结
这是一个比较小的功能，但在某些情况下却非常实用。
特别是像我这样采用 Hexo 的网站，不像PHP这样能有比较简便的方法，对于 HTML 来说，采用 Javascript 做一些功能，真的是特别方便。

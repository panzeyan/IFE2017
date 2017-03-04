# Ajax 本地跨域问题笔记

在 [ECharts NO.3 - 绘制地图](http://ife.baidu.com/course/detail/id/54?t=1488604518621#learn) 这个任务中，需要Ajax异步加载一个本地JSON文件，js代码如下：

```javascript
$.get('map/world_map.json', function (worldMap) {
  echarts.registerMap('worldMap', worldMap);
  var chart = echarts.init(document.getElementById('main'));
  chart.setOption({
    series: [{
      type: 'map',
      map: 'worldMap'
    }]
  });
});
```

打开chrome预览其效果，发现地图不显示，同时控制台输出错误信息：

```
XMLHttpRequest cannot load file:///C:/Users/panze/Desktop/IFE2017/%E5%8F%AF%E8%A7%86%E5%8C%96/js/map/world_map.json. Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource.
```

信息的大意就是`file:///`不在跨域请求支持的协议列表中，所以被禁止。

google一下，发现stackoverflow上类似问题还挺多的。找到一个chrome可用的 [方法](http://stackoverflow.com/questions/18586921/how-to-launch-html-using-chrome-at-allow-file-access-from-files-mode)，在win10、chrome 56环境下亲测有效：

```
chrome --allow-file-access-from-files file:///C:/test%20-%203.html
```

这条语句以`--allow-file-access-from-files`模式启动chrome，打开html文件。

具体到我的话，就是以管理员身份打开cmd，输入以下命令：

```
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files file:///C:/Users/panze/Desktop/IFE2017/%E5%8F%AF%E8%A7%86%E5%8C%96/%E7%BB%98%E5%88%B6%E5%9C%B0%E5%9B%BE.html
```

chrome不再报错，成功显示出了世界地图！

代码地址： https://github.com/panzeyan/IFE2017/blob/master/%E5%8F%AF%E8%A7%86%E5%8C%96/%E7%BB%98%E5%88%B6%E5%9C%B0%E5%9B%BE.html

demo地址： https://panzeyan.github.io/IFE2017/%E5%8F%AF%E8%A7%86%E5%8C%96/%E7%BB%98%E5%88%B6%E5%9C%B0%E5%9B%BE.html
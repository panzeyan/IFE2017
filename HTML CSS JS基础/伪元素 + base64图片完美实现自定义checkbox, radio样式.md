这个任务要求用背景图和伪元素两种不同方式实现。背景图不多说，就是用CSS雪碧图完成。而伪元素，我看了下大家的笔记，都是在`::before`伪元素中使用[unicode字符](http://www.w3cplus.com/solution/css3content/images/html.png)实现。
这里就有个小问题，unicode字符中的“勾”是和题目里提供的样例是有差异的（作为处女座简直不能忍）。如何解决差异呢？我想到了热身任务里的 base64 编码。正好这里的图片大小非常小，编码后字符串不会太大，符合使用base64 图片的条件。
接下来就很简单了：

1. PS切图。把大图切成4份；
2. base64 编码。在网上搜一个转码工具，分别上传图片就能得到base64码；
3. 写CSS。

代码如下：
1. HTML
```HTML
<div class="pseudo-elments">
      <h2>伪元素实现</h2>
      <input type="checkbox" id="checkbox3" checked>
      <label for="checkbox3"><span>checkbox3</span></label>
      <br>

      <input type="checkbox" id="checkbox4">
      <label for="checkbox4"><span>checkbox4</span></label>
      <br>

      <input type="radio" id="radio3" name="example2" checked>
      <label for="radio3"><span>radio3</span></label>
      <br>

      <input type="radio" id="radio4" name="example2">
      <label for="radio4"><span>radio4</span></label>
    </div>
```

2. CSS
```CSS
.pseudo-elments input[type='checkbox']+label::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWElEQVQ4je2TsQ2AMAwED4jEKJ4NBoIik3kUXkRQEBoqLBqKXOPqztXDRzoAd1+AKeiuZjZTA0f08+30UfFJC7TAPwIJQFKO7kFShrrGBAMwct03FGDboZyDlxrN2Y7oWwAAAABJRU5ErkJggg==) no-repeat;
}

.pseudo-elments input[type='checkbox']:checked+label::before {
  content: '';
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA3klEQVQ4jb3TrU4DQRiF4QdYggTDRawdPyEhCAwSg0Hyo7gPBARRRD0JEgd6/QrM0BtAoLAstItgSBpoNywkHDPizPvOT/LxxyxAimGAo57sZVnVx7Kg7XvyJ7PYF/ya/xOkGHZTDKu/EqQYDnGNuxTD8nRXzNi8jx3slVXdZHiQ66uyql/nClIMazjFOm5SDLc4y/VJWdUXnU8oq/oZW3jCNs674G+CLLnHBh7RdsEzBVnygE0cdMHM+MQpyQijLnjuDfqkgGbSDvvOQzNph+RpLFjCio/1Jxnj5Y3xO0btSLveVPEAAAAAAElFTkSuQmCC) no-repeat;
}

.pseudo-elments input[type='radio']+label::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABj0lEQVQ4jZ2TMUtcQRSFvzvIFgtuihRiYRPEm/aBUywI+QGKXSCQwsIqKhhYwfyDpNAQCLJdmjQhkkYTWAttLRYiWjkaSBFFFuGB78EW4zKTYl/CskTjeuA2l/MdLnPvCH1yzo0BL4AZYKJoHwNbQF1VL3r9pg9+DXwHcuA58KCoOeAaOHLOvellpAfeAEaAeVW96p+s8FSAD0BLVRf/BhSp48BTVY3/gntCBNgEfqjqK3HOjQKHwLiqZrfBfZOcApMmhLAAvL8rDFB434UQFoyIzNJ94UH1VURmjIgo3TUNKiciE+b/vhtVijFemxDCCfD4HgGPYow/jff+GzB7j4Bp733DnJ+d1YGlYjV3UuF92Wq16jIEpnlwsF4ul8cY4JDa7fYvmyQ104Fgk2Q1z/MM+OycG74FHgY28zzPbJKsdiAIwFD3pEv7zeZapVJ5BrwFtgEHlOj+ymlgOcuyT1VrVwDfgWgAOhABX7W2tre7+yRN01Hv/ZcYYzuEcOm9/5im6cOdRmOqam3tDwzwG8lbrnZ0/2pYAAAAAElFTkSuQmCC) no-repeat;
}

.pseudo-elments input[type='radio']:checked+label::before {
  content: '';
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB00lEQVQ4jZWTQUgUURjHf+/tukbldgwPdtDVGrwII4gJc+2giJcgqPQQQRHYwUo7dPJQWHQIpA6xl4VF8pYGQbeB7bJNZiSTFVoQRDdbTWln5o2HGeXxWKw+eIfve/////2/970nMMJ37DbgKjAEdKXlj8Bz4LHlej90vDTId4G3wCZwHjiWrjEgAN77jn1P5wiNPAscBy5ZrvfLdJZi8kAR+Gm53rV9gVS1AJy1XC9uRNZEBDAPfLFcb0r4jt0KLAMFy/VqB5ENJ5+BXrHi2NMS6pbrTWuAHHAfuJC6LAE3Ldera5jbCvJZAcPAqHHIDDCu5ePADjCl1RYFlKWAkyRj0uNiA+eXjXxVQJdsAPzXyMUQSAWfgFPGZqkB4amRt8ewng2UetEs5TDJJPbiFsnl7bVSAu4YAoOBUi/FYm/3iY7Dh6pA5/+O8dvOn3458mbl+3akykAxfSR/IwuguB2p8lD1w1cZguqrLE1uhVENeOY7dssB5BZgfiuMan2VpckQlADIJv3mKqd7HuSzmXPAQ2ABWAVyJL9yELheC6O5gdfvbgD1EOJ9y6lI06PujkJP/uiVI5nMmSYp2mMIQhWv/Y6iV9WNzScT/to6EIQQA+wCGE2kAg7qk5gAAAAASUVORK5CYII=) no-repeat;
}
```

实现效果见demo。

demo地址： https://panzeyan.github.io/IFE2017/HTML%20CSS%20%E5%9F%BA%E7%A1%80/%E8%87%AA%E5%AE%9A%E4%B9%89checkbox%2C%20radio%E6%A0%B7%E5%BC%8F.html

源码地址： https://github.com/panzeyan/IFE2017/blob/master/HTML%20CSS%20%E5%9F%BA%E7%A1%80/%E8%87%AA%E5%AE%9A%E4%B9%89checkbox%2C%20radio%E6%A0%B7%E5%BC%8F.html
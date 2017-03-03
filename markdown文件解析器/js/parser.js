var mdParser = {

  // 解析用re
  regex: {
    
    // 标题
    headline: /^(\#{1,6})([^\#\n]+)$/m,

    // 无序列表
    ul: /^([\*|\-] ([^\n]+)\n)+/gm,

    // 有序列表
    ol: /^(\d+\. ([^\n]+)\n)+/gm,

    // 引用
    quote: /^>\s+([^\n]+)/m,

    // 代码块
    codeblock: /\`\`\`\n?([^\`]+)\`\`\`/g
  },

  parse: function (str) {
    var count, strlist, line,
        stra = [];
    
    // 解析标题
    while ((stra = mdParser.regex.headline.exec(str)) !== null) {
      count = stra[1].length;
      str = str.replace(stra[0], '<h' + count + '>' + stra[2] + '</h' + count + '>');
    }

    // 解析代码块
    while ((stra = mdParser.regex.codeblock.exec(str)) !== null) {
      str = str.replace(stra[0], '<pre><code>' + stra[1] + '</code></pre>')
    }

    // 解析引用
    while ((stra = mdParser.regex.quote.exec(str)) !== null) {
      str = str.replace(stra[0], '<blockquote><p>' + stra[1] + '</p></blockquote>')
    }

    // 解析列表
    // 无序列表
    while ((stra = mdParser.regex.ul.exec(str)) !== null) {
      repstr = '<ul>';
      strlist = stra[0].split('\n');
      for (var index = 0; index < strlist.length; index++) {
        var element = strlist[index];
        if (element.length > 0) {
          line = /^[\*|\-] ([^\n]+)/.exec(element);
          repstr = repstr + '<li>' + line[1] + '</li>';
        }
      }
      repstr = repstr + '</ul>';

      str = str.replace(stra[0], repstr);
    }

    // 有序列表
    while ((stra = mdParser.regex.ol.exec(str)) !== null) {
      repstr = '<ol>';
      strlist = stra[0].split('\n');
      for (index = 0; index < strlist.length; index++) {
        element = strlist[index];
        if (element.length > 0) {
          line = /^\d+\. ([^\n]+)/.exec(element);
          repstr = repstr + '<li>' + line[1] + '</li>';
        }
      }
      repstr = repstr + '</ol>';

      str = str.replace(stra[0], repstr);
    }

    return str;
  }
}

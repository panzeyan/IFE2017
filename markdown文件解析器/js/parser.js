var mdParser = {

  // 解析用re
  regex: {
    
    // 标题
    headline: /^(\#{1,6})([^\#\n]+)$/m,

    // 无序列表
    ul: /^\*\s+([^\n]+)/m,

    // 有序列表
    ol: /^\d\. ([^\n]+)/m,

    // 引用
    quote: /^>\s+([^\n]+)/m,

    // 代码块
    codeblock: /\`\`\`\n?([^\`]+)\`\`\`/g
  },

  parse: function (str) {
    var count,
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

    return str;
  }
}

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
    codeblock: /\`\`\`\n([^\`]+)\`\`\`/g
  },

  parse: function (str) {
    var count,
        stra = [];
    
    // 处理标题
    while ((stra = mdParser.regex.headline.exec(str)) !== null) {
      count = stra[1].length;
      str = str.replace(stra[0], '<h' + count + '>' + stra[2] + '</h' + count + '>');
    }
    

    return str;
  }
}

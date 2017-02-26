// 获取文本框对象
var phoneInput = document.getElementById("phone_input"),
    wordsInput = document.getElementById("words_input");

// 判断给定输入值是否为手机号码
function isPhoneNumber(value) {

  // 手机号码正则规则
  var partern = /^1[3|4|5|7|8]\d{9}$/;

  value = value.trim();
  return partern.test(value)
}

// 判断输入的字符串是否有相邻重复单词
function hasRepeatedWords(value) {

  // 正则规则
  var partern = /\b([a-zA-Z]+)\b\s+\b\1\b/;

  return partern.test(value.trim())
}

phoneInput.addEventListener("keypress", function (e) {
  if (e.keyCode == 13) {
    alert(isPhoneNumber(e.target.value));
  }
})

wordsInput.addEventListener("keypress", function (e) {
  if (e.keyCode == 13) {
    console.log(e.target.value);
    alert(hasRepeatedWords(e.target.value));
  }
})

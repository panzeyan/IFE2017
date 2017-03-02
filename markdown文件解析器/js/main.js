var editorInput = document.getElementById("editor-input");
var previewer = document.getElementById("previewer")

editorInput.addEventListener("keyup", function (e) {

  if (e.keyCode == 13) {
    var value = e.target.value;
    previewer.innerHTML = mdParser.parse(value);
  }
}, false);

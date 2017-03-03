var editorInput = document.getElementById("editor-input");
var previewer = document.getElementById("previewer")

previewer.innerHTML = mdParser.parse(editorInput.value);

editorInput.addEventListener("keyup", function (e) {
  var value = e.target.value;

  if (value.length > 0) {
    previewer.innerHTML = mdParser.parse(value);
  }
}, false);

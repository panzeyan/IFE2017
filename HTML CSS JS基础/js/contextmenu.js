var contextMenu = document.getElementById("contextmenu");

// 获取 contextMenu 宽高
var menuWidth = contextMenu.offsetWidth,
    menuHeight = contextMenu.offsetHeight;

var wrapper = document.getElementById("wrapper");

var body = document.body;

// 获取视窗大小
var winWidth = body.clientWidth,
    winHeight = body.clientHeight;

function show(obj) {
  obj.style.visibility = "visible";
}

function hide(obj) {
  obj.style.visibility = "hidden";
}


// 设置对象的位置
function setPosition(obj, x, y) {
  obj.style.left = x + "px";
  obj.style.top = y + "px";
}

// 根据光标位置和自定义菜单大小，自动调整菜单位置
function autoAdjustMenu(cursorX, cursorY) {
  var thresholdX = winWidth - menuWidth,
      thresholdY = winHeight - menuHeight;
  
  if (cursorX <= thresholdX && cursorY <= thresholdY) {
    setPosition(contextMenu, cursorX, cursorY);
  } else if (cursorX > thresholdX && cursorY <= thresholdY) {
    setPosition(contextMenu, cursorX - menuWidth, cursorY);
  } else if (cursorX <= thresholdX && cursorY > thresholdY) {
    setPosition(contextMenu, cursorX, cursorY - menuHeight);
  } else {
    setPosition(contextMenu, cursorX - menuWidth, cursorY - menuHeight)
  }
}

wrapper.addEventListener("contextmenu", function (e) {

  // 阻止默认菜单
  e.preventDefault();

  // 显示自定义菜单
  autoAdjustMenu(e.clientX, e.clientY);
  show(contextMenu);
}, true);

contextMenu.addEventListener("click", function (e) {
  hide(contextMenu);

  if (e.target.tagName === "LI") {
    alert(e.target.innerHTML);
  }
}, true);

// 点击非菜单区隐藏自定义菜单
body.addEventListener("click", function (e) {
  if (e.target !== contextMenu) {
    hide(contextMenu);
  }
})

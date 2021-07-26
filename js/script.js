var index = 0;
prev = byId("prev");
next = byId("next");
pics = byId("banner").getElementsByTagName("div");
size = pics.length;
dots = byId("dots").getElementsByTagName("span");
dotSize = dots.length;
timer = null;
main = byId("main");
menuContent = byId("menu-content");
menuItems = menuContent.getElementsByClassName("menu-item");
subMenu = byId("sub-menu");
innerBox = subMenu.getElementsByClassName("inner-box");

function byId(id) {
  return typeof (id) === "string" ? document.getElementById(id) : id;
}

//addEventListener()//可以为元素添加多个事件
//removeEventListener()//移除事件处理函数

function addHandler(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  }
  else if (element.attachEvent) {
    element.attachEvent('on' + type, handler);
  }
  else {
    element['on' + type] = handler;
  }
}

addHandler(next, "click", function () {
  index++;
  if (index >= size) index = 0;

  changeImg();
})

addHandler(prev, "click", function () {
  if (index === 0) index = size;
  index--;

  changeImg();
})

function changeImg() {
  for (var i = 0, len = dots.length; i < len; i++) {
    dots[i].className = "";
    pics[i].style.display = "none";
  }
  dots[index].className = "active";
  pics[index].style.display = "block";
}

// for (var d = 0; d <= dotSize; d++) {
//   dots[d].setAttribute("tid", d);
//   addHandler(dots[d], "click", function () {
//     // alert(this["tid"]);
//     // alert(this.tid);
//     // alert(this.getAttribute("tid"));
//     index = this.getAttribute("tid");
//     changeImg();
//   });
// }

// 点击导航切换
for (var i = 0, len = dots.length; i < len; i++) {
  dots[i].id = i;
  addHandler(dots[i], "click", function () {
    index = this.id;
    changeImg();
  })
}

function startAutoPlay() {
  timer = setInterval(function () {
    index++;
    console.log(index);
    if (index >= size) index = 0;
    changeImg();
  }, 3000)
}

function stopAutoPlay() {
  if (timer) {
    clearInterval(timer);
  }
}

for (var m = 0, mlen = menuItems.length; m < mlen; m++) {
  menuItems[m].id = m;
  addHandler(menuItems[m], "mouseover", function () {
    subMenu.className = "sub-menu";
    idx = this.id;
    for (var j = 0; j < innerBox.length; j++) {
      innerBox[j].style.display = "none";
      menuItems[j].style.background = "none";
    }
    innerBox[idx].style.display = "block";
    menuItems[idx].style.background = "rgba(0,0,0,0.1)";
  })
}

addHandler(subMenu,"mouseover",function(){
  this.className = "sub-menu";
});

addHandler(subMenu,"mouseout",function(){
  this.className = "sub-menu hide";
});

addHandler(banner,"mouseout",function(){
  subMenu.className = "sub-menu hide";
});

addHandler(menuContent,"mouseout",function(){
  subMenu.className = "sub-menu hide";
});

addHandler(main, "mouseover", stopAutoPlay);
addHandler(main, "mouseout", startAutoPlay);

startAutoPlay();
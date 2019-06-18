# 模块化

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-06-18_10-50-37.png)

![](https://niliv-technology-1252830662.cos.ap-chengdu.myqcloud.com/javascript/Snipaste_2019-06-18_11-15-53.png)



**不同功能的js放入不同的文件**

**每个文件用立即执行函数封装**

```javascript
! function () {}.call
```

**如果要相互访问，可以使用闭包，传出一个函数让其他文件操作部分功能**

```javascript
var a = function(){
	var bb = 1;
	return function(){
		return bb+1;
	}
}.call()

! function(){
	var bb = 1;
	window.grow = function(){
		return bb+1;
	}
}.call()
```

**将每个文件封装成MVC对象**

```javascript
! function () {
  /**添加导航菜单事件 */
  let view = document.getElementsByClassName('menuTrigger');

  var controller = {
    view: null,
    init: function (view) {
      this.view = view;
      this.bindEvents()
    },
    bindEvents: function () {
      var view = this.view
      for (let i = 0; i < view.length; i++) {
        view[i].onmouseenter = function (e) {
          e.currentTarget.classList.add('active')
        }
        view[i].onmouseleave = function (e) {
          e.currentTarget.classList.remove('active')
        }
      }
    }
  }
  controller.init(view);
}.call()
```

```javascript
! function () {
  var view = document.querySelector('.content')
  var controller = {
    view: null,
    swiper: null,
    swiperOptions: {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    },
    init: function (view) {
      this.view = view
      console.log(this.view)
      this.initSwiper()
    },
    initSwiper: function () {
      this.swiper = new Swiper(this.view.querySelector('.swiper-container'), this.swiperOptions)
    }
  }
  controller.init(view)
}.call()
```


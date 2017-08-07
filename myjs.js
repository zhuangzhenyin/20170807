//获取节点
function $(ele) {
	return document.querySelector(ele);
}
//向上缓冲运动
function buffTop(ele,iTarget) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		speed = (iTarget - ele.offsetTop)/10;
		speed = speed > 0 ?Math.ceil(speed) : Math.floor(speed);
		ele.style.top = ele.offsetTop + speed + "px";
		if(speed == 0 ) {
			clearInterval(ele.timer);
		}
	},20)
}

//向右缓冲运动
function buffLeft(ele,iTarget) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		speed1 = (iTarget - ele.offsetLeft)/10;
		speed1 = speed1 > 0 ?Math.ceil(speed1) : Math.floor(speed1);
		ele.style.left = ele.offsetLeft + speed1 + "px";
		if(speed1 == 0 ) {
			clearInterval(ele.timer);
		}
	},20)
}
//滚动缓冲
function scrollbuff(iTarget) {
	var h = 0;
	clearInterval(timer);
	timer = setInterval(function() {
		h = scroll().top;
		speed = (iTarget - h)/10;
		speed = speed > 0 ?Math.ceil(speed) : Math.floor(speed);
		// img.style.left = img.offsetLeft + speed + "px";
		window.scrollTo(0,speed + h);
		if(speed == 0 ) {
			clearInterval(timer);
		}
	},20)
}
//获取滚动高度
function scroll() {
	if(document.body.scrollTop) {
		return {
			top: document.body.scrollTop,
			left:document.body.scrollTop
		}
	}
	else {
		return {
			top: document.documentElement.scrollTop,
			left:document.documentElement.scrollTop
		}
	}
}

//获取css属性
function getStyle(obj,attr) {
		if(getComputedStyle(obj,null)[attr]) {
			return getComputedStyle(obj,null)[attr]; //w3c
		}
		else {
			return obj.currentStyle[attr]; //常用
		}
	}

//
function animate(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        //不要忘了去掉PX
        var off=true;
        for(var attr in json){   //attr 属性   json[attr]目标点
            var current = parseInt(getStyle(obj,attr));
            speed = (json[attr] - current) /10;
            speed = speed >0 ? Math.ceil(speed) : Math.floor(speed);

            if (attr == "opacity" || attr=== "zIndex"){
                obj.style[attr]=json[attr];
            }
            else{
                obj.style[attr]=current + speed + "px";
            }

            if (json[attr] != current){   //目标点只要有一个人没到位置  就是false
                off=false;
            }
        }
        if (off){
            clearInterval(obj.timer);
            if(fn){
                fn()
            }
        }
    },30)
}


document.addEventListener('touchstart',function (ev) {
	ev.preventDefault();
});
//页面生成
var ul1 = document.createElement('ul');
var ul2 = document.createElement('ul');
data.forEach(function (item,i) {
	var li = document.createElement('li');
	li.innerHTML = `
		<a href="javascritp:;">
			<span class="iconfont ${item.icon}" style="background: ${item.back}"></span>
			<span>${item.title}</span>
		</a>
	`;
	if ( i < 10 ) {
		ul1.appendChild(li);
	} else {
		ul2.appendChild(li);
	}
});

$('.navList').append(ul1);
$('.navList').append(ul2);

listData.forEach(function (item,i) {
	var li = document.createElement('li');
	if ( item.banner ) {
		li.className = 'banner'
		li.innerHTML = `
			<a href="javascript:;">
				<img _src="${item.banner}">
			</a>
		`
	} else {
		li.innerHTML = `
			<a href="javascript:;">
				<div class="img">
					<img _src="${item.img}">
				</div>
				<div class="introduce">
					<p>${item.title}</p>
					<p>${item.desc}</p>
					<p>
						<span>${item.price}</span>
						<span>元</span>
						<span>门市价:${item.doorPrice}元</span>
						<span>已售${item.num}</span>
					</p>
				</div>
			</a>
		`
	}
	
	$('.loveList').append(li);
	
});




;(function () {
	css($('.scroll')[0],'translateZ',0.01);//3D硬件加速

	var startTouch = 0;//初始点击的位置
	var startEl = 0;//初始元素的位置
	var lastY = 0;//上一次的距离
	var lastTime = 0;//上一次的时间
	var lastTimeDis = 0;//最后一次的时间差
	var lastDis = 0;//获取最后一次的距离
	
	var wH = $('.wrap')[0].clientHeight;//wrap可是区的高度
	
	var sH = $('.scroll')[0].offsetHeight;//总高度
	
	var maxH = wH - sH;//最大滚动距离
	
	var scale = wH / sH;//比例
	
	$('.scroll')[0].style.minHeight = '100%';
	var disX = 0;
	var W = $('.navList ul').width();
	var n = 0;
	var left = 0;
	$('.navList').on('touchstart',function (ev) {
		var e = ev.changedTouches[0];
		disX = e.pageX;
		this.style.transition = 'none';
		left = this.offsetLeft;
	});
	$('.navList').on('touchmove',function (ev) {
		var e = ev.changedTouches[0];
		if ( left == 0 && e.pageX - disX > 0 ) {
			this.style.left = 0;
		} else {
			this.style.left = left + e.pageX - disX + 'px';
		}
		if ( left == -W && e.pageX - disX < 0 ) {
			this.style.left = -W + 'px';
		}
		if ( left !== this.offsetLeft ) {
			$('.scroll').unbind();
		}
		
	});
	$('.navList').on('touchend',function (ev) {
		
		$('.scrollBar').height();
		
		if ( left === this.offsetLeft ) {
			return
		}
		var e = ev.changedTouches[0];
		this.style.transition = '.5s';
		if ( e.pageX > disX ) {
			this.style.left = 0;
			n = 0;
		}
		if ( e.pageX < disX ) {
			this.style.left = -W + 'px';
			n = 1
		}	
		$('.dot a').eq(-n).addClass('active').siblings().removeClass('active');
		$('.scroll').on('touchstart',scrollStart);
		$('.scroll').on('touchmove',scrollMove);
		$('.scroll').on('touchend',scrollEnd);
	});
	
	
	$('.scroll').on('touchstart',scrollStart);
	$('.scroll').on('touchmove',scrollMove);
	$('.scroll').on('touchend',scrollEnd);
	function scrollStart(ev) {
		clearInterval(this.timer);
		wH = $('.wrap')[0].clientHeight;//wrap可是区的高度
		sH = $('.scroll')[0].offsetHeight;//总高度
		maxH = wH - sH;//最大滚动距离
		scale = wH / sH;//比例
		
		if ( maxH >= 0 ) {
			$('.scrollBar').hide();
		} else {
			$('.scrollBar').show();
		}

		$('.scrollBar').height(scale*wH);

		var e = ev.changedTouches[0];
		startTouch = e.pageY;
		startEl = css(this,'translateY');
		lastY = startEl;
		lastTimeDis = lastTime = 0;
		lastTime = new Date().getTime(); 
		$('.scrollBar').animate({
			opacity: 1
		},.3);
	};

	function scrollMove(ev) {
		var e = ev.changedTouches[0];
		var dis = e.pageY - startTouch;
		var translateY = startEl + dis;
		css(this,'translateY',translateY);
		lastDis = translateY - lastY;
		lastY = translateY;
		var nowTime = new Date().getTime();
		lastTimeDis = nowTime - lastTime;
		lastTime = nowTime;
		
		css($('.scrollBar')[0],'translateY',-translateY*scale);
		
		if ( Math.abs(css(this,'translateY')) >= wH ) {
			$('.back').show();
		} else {
			$('.back').hide();
		}
		
		load();
	};
	
	
	function scrollEnd() {
		var _this = this;
		var type = 'easeOut';
		var speed = Math.round(lastDis / lastTimeDis*10);
		
		speed = lastTimeDis <= 0 ? 0 : speed;
		var target = Math.round(speed * 20) + css(this,'translateY');
		if ( target > 0 ) {
			target = 0;
			type = 'backOut';
		} else if ( target < maxH ) {
			target = maxH;
			type = 'backOut';
		}
		MTween({
			el: this,
			target: {translateY: target},
			time: Math.round(Math.abs(target - css(this,'translateY'))*2),
			type: type,
			callBack: function () {
				$('.scrollBar').animate({
					opacity: 0
				},.3);
			},
			callIn: function () {
				if ( Math.abs(css(this,'translateY')) >= wH ) {
					$('.back').show();
				} else {
					$('.back').hide();
				}
				var translateY = css(_this,'translateY');
				css($('.scrollBar')[0],'translateY',-translateY*scale);
			}
		})
	}
	
	$('.back').on('touchend',function () {
		MTween({
			el: $('.scroll')[0],
			target: {translateY: 0},
			time: 500,
			type: 'easeOut',
			callIn: function () {
				if ( Math.abs(css(this,'translateY')) >= wH ) {
					$('.back').show();
				} else {
					$('.back').hide();
				}
			}
		})
	});
	
	//设置目标时间
	var targetTime = new Date();
	targetTime.setTime(targetTime.getTime() + 3600*2000);
	
	setInterval(function () {
		var disTime = (targetTime - new Date().getTime()) / 1000;
		var H = parseInt(disTime / 3600);
		var M = parseInt((disTime - H * 3600)/60);
		var C = parseInt(disTime % 60);
		$('.clock span').eq(0).html(toD(H));
		$('.clock span').eq(1).html(toD(M));
		$('.clock span').eq(2).html(toD(C));
	},20)
	
	function toD(num) {
		return num = num <= 9 ? '0' + num : '' + num;
	}
	//懒加载
	var H = window.innerHeight;
	load();	
	function load() {
		var imgs = document.querySelectorAll(".loveList img");
		for ( var i = 0; i < imgs.length; i++  ) {
			var top = imgs[i].getBoundingClientRect().top;
			if ( top < H ) {
				if ( imgs[i].getAttribute('_src') ) {
					var src = imgs[i].getAttribute('_src');
					imgs[i].removeAttribute('_src');
					imgs[i].setAttribute('src',src);
					MTween({
						el: imgs[i],
						target: {opacity: 100},
						time: 500,
						type: 'easeOut'
					})
				}
			}
		}
	}
	
	
	
})();



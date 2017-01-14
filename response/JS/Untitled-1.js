// JavaScript Document
function fn1(slide,S_dot,icon_Sleft,icon_Sright) {
	var slide = document.querySelector(slide);
	var icon_Sleft = document.querySelector(icon_Sleft);
	var icon_Sright = document.querySelector(icon_Sright);
	var S_dot = document.querySelector(S_dot);
	var as = S_dot.querySelectorAll('a');
	var lis = slide.querySelectorAll('li');
	var n = 0;
	for (var i = 0; i < as.length; i++) {
		as[i].index = i;
		as[i].onclick = function () {
			as[n].className = '';
			lis[n].className = '';
			this.className = 'active';
			lis[this.index].className = 'show';
			n = this.index;
		};
	}

	icon_Sleft.onclick = function () {
		as[n].className = '';
		lis[n].className = '';
		n--;
		if ( n < 0) {
			n = 2;
		}
		as[n].className = 'active';
		lis[n].className = 'show';
	}
	icon_Sright.onclick = next;
	var timer = 0;
	timer = setInterval(next,4000);
	slide.onmouseover = function () {
		clearInterval(timer);
	};
	slide.onmouseout = function () {
		timer = setInterval(next,4000);
	};
	function next() {
		as[n].className = '';
		lis[n].className = '';
		n++;
		if ( n > 2) {
			n = 0;
		}
		as[n].className = 'active';
		lis[n].className = 'show';
	}
};

window.onload = function () {
	fn1('.slide','.S_dot','.icon_Sleft','.icon_Sright');
	fn1('.Aslide','.dot','.icon_Aleft','.icon_Aright');


	var select = document.querySelector('.select');
	var input = document.querySelector('.input');
	var li = select.getElementsByTagName('li');
	var a = select.getElementsByTagName('a');
	var n = 0;

	input.onOff = true;
	input.onclick = function () {
		if (this.onOff) {
			select.style.display = 'block';
		} else {
			select.style.display = 'none';
		}
		input.onOff = !input.onOff;
	};
	for (var i = 0; i< li.length; i++) {
		li[i].index = i;
		li[i].onmouseover = function () {
			li[n].className = '';
			this.className = 'active';
			n = this.index;
		};
		li[i].onclick = function () {
			input.value = a[this.index].innerHTML;
			select.style.display = 'none';
			input.onOff = true;
		};
	}
	select.onmouseleave = function () {
		this.style.display = 'none';
		input.onOff = true;
	};
};

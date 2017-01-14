// JavaScript Document

window.onload = function () {
	var denglu = document.querySelector('.denglu');
	var Dland = document.querySelector('.Dland');
	var triangle = document.querySelector('.triangle');
	var spirittwo = document.querySelector('.spirittwo');
	var timer = 0;
	
	denglu.onmouseover = function () {
		clearTimeout(timer);
		Dland.style.display = 'block';
		triangle.style.display = 'block';
		spirittwo.style.background = 'url(img/Dlandiconh.gif) no-repeat';
	};
	denglu.onmouseout = function () {
		timer = setTimeout(function () {
			Dland.style.display = 'none';
			triangle.style.display = 'none';
			spirittwo.style.background = 'url(img/main.gif) no-repeat -37px 0';
		},500)		
	};
	Dland.onmouseover = function () {
		clearTimeout(timer);
		Dland.style.display = 'block';
		triangle.style.display = 'block';
		spirittwo.style.background = 'url(img/Dlandiconh.gif) no-repeat';	
	}
	Dland.onmouseout = function () {
		timer = setTimeout(function () {
			Dland.style.display = 'none';
			triangle.style.display = 'none';
			spirittwo.style.background = 'url(img/main.gif) no-repeat -37px 0';
		},500)	
	}
	
	var pic = document.querySelector('.pic');
	var img = pic.querySelectorAll('img');
	var dot = document.querySelector('.dot');
	var dotA = dot.querySelectorAll('a');
	var guild = document.getElementById('guild');
	var prev = document.querySelector('.prev');
	var next = document.querySelector('.next');
	console.log(next,prev);
	var timer2 = 0;
	var arr = ['#81a69e','#f8e8d8','#06355f','#b9282b','#f3b3b3','#839cba','#032587','#29241e'];
	var n = 0;
	for ( var i = 0; i < dotA.length; i++ ) {
		dotA[i].index = i;
		dotA[i].onclick = function () {
			dotA[n].className = '';
			img[n].className = '';
			n = this.index;
			dotA[n].className = 'active';	
			img[n].className = 'active';
			guild.style.background = arr[n];
		}	
	}
	prev.onclick = Prev;
	next.onclick = Next;

	guild.onmouseover = function () {
		clearInterval(timer2);
	};
	guild.onmouseout = function () {
		timer2 = setInterval(Next,4000);
	}
	timer2 = setInterval(Next,4000);
	function Next() {
		dotA[n].className = '';
		img[n].className = '';
		n++;
		if ( n === img.length ) {
			n = 0;	
		}
		dotA[n].className = 'active';
		img[n].className = 'active';
		guild.style.background = arr[n];	
	}
	function Prev() {
		dotA[n].className = '';
		img[n].className = '';
		n--;
		if ( n < 0 ) {
			n = img.length - 1;	
		}
		dotA[n].className = 'active';
		img[n].className = 'active';
		guild.style.background = arr[n];	
	}
	
	
	
	var play1 = document.querySelectorAll('.play1');
	var play2 = document.querySelectorAll('.play2');
	var play3 = document.querySelectorAll('.play3');
	for ( var i = 0; i < play1.length; i++ ) {
		play1[i].onmouseover = function () {
			this.style.background = 'url(img/play1h.gif) no-repeat';	
		};
		play1[i].onmouseout = function () {
			this.style.background = 'url(img/right.gif) no-repeat -184px 0';	
		};
	}
	for ( var i = 0; i < play2.length; i++ ) {
		play2[i].onmouseover = function () {
			this.style.background = 'url(img/play2h.gif) no-repeat';	
		};
		play2[i].onmouseout = function () {
			this.style.background = 'url(img/right.gif) no-repeat -201px 0';	
		};
	}
	for ( var i = 0; i < play3.length; i++ ) {
		play3[i].onmouseover = function () {
			this.style.background = 'url(img/play3h.gif) no-repeat';	
		};
		play3[i].onmouseout = function () {
			this.style.background = 'url(img/right.gif) no-repeat -214px 0';	
		};
	}
};
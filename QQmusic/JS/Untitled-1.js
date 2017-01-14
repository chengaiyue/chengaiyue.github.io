// JavaScript Document

window.onload = function () {
	var same = document.querySelector('.same');
	console.log(same);
	var Mas = same.querySelectorAll('a');
	var logo_right = document.querySelector('.logo_right');
	var Lnavs = logo_right.querySelectorAll('nav');
	var n;
	var m;
	for ( var i = 0; i < Mas.length; i++ ) {
		if (Lnavs[i].id == 'show') {
			n = i;
		}
	}
	m = n;
	
	for ( var i = 0; i < Lnavs.length; i++ ) {
		Mas[i].index = i;
		Mas[i].onmouseover = function () {
			Lnavs[n].id = '';
			n = this.index;
			Lnavs[n].id = 'show';
		};
	}
	logo_right.onmouseleave = function () {
		for (var i = 0; i < Lnavs.length; i++) {
			Lnavs[i].id = '';
		}
		Lnavs[m].id = 'show';
		n = m;
	};
	
	var dele = document.querySelector('.delete');
	var download_edition = document.querySelector('.download_edition');
	
	dele.onclick = function () {
		download_edition.style.display = 'none';	
	};
	
	
	
	
	iconChange('.icon_MVplay');
	iconChange('.icon_play');
	iconChange('.icon_MMVplay');
	function iconChange( iconN ) {
		var iconName = document.querySelectorAll(iconN);
		
		for ( var i = 0; i　< iconName.length; i++ ) {
			iconName[i].onmouseover = function () {
				this.style.background = 'url(img/icon_play.png) no-repeat -20px 0';
			};
			iconName[i].onmouseout = function () {
				this.style.background = 'url(img/icon_paly.png) no-repeat';
			};
		}
	}

};




























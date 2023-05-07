// copyright christopher pietsch
// cpietsch@gmail.com
// @chrispiecom
// 2015-2018


window.utils = {};

utils.isMobile = function(){
  return (window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth) < 500;
}

utils.isSafari = function(){
	return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

utils.welcome = function(){
	// who needs this fancy console styles
    if (window.console)
    {
        window.console.log('\n _   ________ ____  ______ \n| | / /  _/ //_/ / / / __/ \n| |/ // // ,< / /_/ /\ \ \n|___/___/_/|_|\____/___/_______ \n| | / /  _/ __/ | /| / / __/ _ \ \n| |/ // // _/ | |/ |/ / _// , _/ \n|___/___/___/ |__/|__/___/_/|_| \n')
    }	
}

utils.initConfig = function(config){

	// load infosidebar info.md
	d3.text(config.loader.info, function(text){ if(text) infoVue.info = text })

	// set window title
	document.title = config.project.name

	if (config.searchEnabled !== undefined){
		!config.searchEnabled ? document.querySelector('.searchbar').style.display = 'none' : null;
	}

	document.documentElement.style.setProperty('--font-color-active', config.style.fontColorActive);
	document.documentElement.style.setProperty('--font-background', config.style.fontBackground);
	document.documentElement.style.setProperty('--timeline-background', config.style.timelineBackground);
	document.documentElement.style.setProperty('--timeline-font-color', config.style.timelineFontColor);
	document.documentElement.style.setProperty('--font-color', config.style.fontColor);
	document.documentElement.style.setProperty('--text-shadow', config.style.textShadow);
	document.documentElement.style.setProperty('--info-background', config.style.infoBackground);
	document.documentElement.style.setProperty('--info-font-color', config.style.infoFontColor);
	document.documentElement.style.setProperty('--detail-background', config.style.detailBackground);
	document.documentElement.style.setProperty('--detail-font-color', config.style.detailFontColor);
	document.documentElement.style.setProperty('--searchbar-background', config.style.searchbarBackground);
	document.documentElement.style.setProperty('--navigation-button-font-color', config.style.navigationButtonFontColor);
	document.documentElement.style.setProperty('--navigation-button-background', config.style.navigationButtonBackground);
	document.documentElement.style.setProperty('--navigation-button-active-font-color', config.style.navigationButtonActiveFontColor);
	document.documentElement.style.setProperty('--navigation-button-active-background', config.style.navigationButtonActiveBackground);
	document.documentElement.style.setProperty('--detail-close-button-color', config.style.detailCloseButtonColor);
	document.documentElement.style.setProperty('--detail-close-button-opacity', config.style.detailCloseButtonOpacity);
	document.documentElement.style.setProperty('--detail-close-button-active-opacity', config.style.detailCloseButtonActiveOpacity);
}

// exhibition installations, will reinitialize the vis after x seconds
utils.ping = function(){
	var time = +new Date();
	var timeout = 2 * 60 * 1000;
	var interval = setInterval(function() {
		if(new Date() - time > timeout ){
			//location.reload();
		}
	}, 1000);

	return function(){
		time = +new Date();
	}
}

utils.printkeywords = function(data){
	var keywords = {};
	data.forEach(function(d){
		d.keywords.forEach(function(d){
		  keywords[d] = 0;
		})
	})
	d3.keys(keywords).forEach(function(d){
		console.log(d);
	})
}

utils.fullscreen = function(){
	document.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen;

	function requestFullscreen(element) {
	    if (element.requestFullscreen) {
	        element.requestFullscreen();
	    } else if (element.mozRequestFullScreen) {
	        element.mozRequestFullScreen();
	    } else if (element.webkitRequestFullScreen) {
	        element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	    }
	}

	if (document.fullscreenEnabled) {
	    requestFullscreen(document.documentElement);
	}
}	

utils.clean = function(data, separator) {

	data.forEach(function(d,i){
		d.search = Object.keys(d).map(function(e) { return d[e] }).join(' - ').toUpperCase()
		d.i = i;
		d.keywords = _(d.keywords)
		  .chain()
		  .split(separator || ",")
		  .map(_.trim)
		  .uniq()
		  .filter(function(d) { return d !== "" })
		  .value()

		// for proper sorting
		d.keywords = d.keywords.map(function(d){ 
			return d.charAt(0).toUpperCase() + d.slice(1);
		});

		d._year = d.year
		d._keywords = d.keywords

		// internal vars
		d.alpha = 1;
		d.active = 1;
		d.loaded = false;
		d.type = "image";
		d.page = 0
		d.scaleFactor = 0.9
		d.x = i;
		d.y = i;
		d.order = i;
	});

}

utils.simulateLargeDatasets = function(data){
	Array.prototype.push.apply(data, _.clone(data, true))
	Array.prototype.push.apply(data, _.clone(data, true))
	Array.prototype.push.apply(data, _.clone(data, true).slice(0,1036))
}


/**
 * Note that I had to use an Angular controller for the video initialization because
 * you needed access to the $window object. And the only way to get access to the
 * $window is by injecting it into an angular controller. You can check for details
 * here: https://docs.angularjs.org/api/ng/service/$window
 *
 * The rest of the code ends up being very similar to what you had originally.
 * I've made a few changes to some "this" keywords which were not wrapped as
 * Jquery objects (I've converted them to $(this)).
 */

var app = angular.module('coverrApp', []);
app.controller('CoverrController', ['$scope', '$window', function($scope, $window) {
	scaleVideoContainer();

	initBannerVideoSize('.video-container .poster img');
	initBannerVideoSize('.video-container .filter');
	initBannerVideoSize('.video-container video');

	angular.element($window).bind('resize', function() {
		scaleVideoContainer();
		scaleBannerVideoSize('.video-container .poster img');
		scaleBannerVideoSize('.video-container .filter');
		scaleBannerVideoSize('.video-container video');
	});


	function scaleVideoContainer() {

		var height = $window.innerHeight + 5;
		var unitHeight = parseInt(height) + 'px';
		$('.homepage-hero-module').css('height',unitHeight);

	}

	function initBannerVideoSize(element){

		$(element).each(function(){
			$(this).data('height', $(this).height());
			$(this).data('width', $(this).width());
		});

		scaleBannerVideoSize(element);

	}

	function scaleBannerVideoSize(element){

		var windowWidth = $window.innerWidth,
		windowHeight = $window.innerHeight + 5,
		videoWidth,
		videoHeight;

		console.log(windowHeight);

		$(element).each(function(){
			var videoAspectRatio = $(this).data('height') / $(this).data('width');

			$(this).width(windowWidth);

			if(windowWidth < 1000){
				videoHeight = windowHeight;
				videoWidth = videoHeight / videoAspectRatio;
				$(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

				$(this).width(videoWidth).height(videoHeight);
			}

			$('.homepage-hero-module .video-container video').addClass('fadeIn animated');

		});
	}
}]);
angular.module('org.nemanjan00.musictime', ['ui.router', 'org.nemanjan00.musictime.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app', {
			url: "/app",
			abstract: true,
			templateUrl: "templates/menu.html"
		})

		.state('app.player', {
			url: "/player",
			views: {
				'menuContent' :{
					templateUrl: "templates/player.html",
				}
			}
		})
		
		.state('app.search', {
			url: "/search",
			views: {
				'menuContent' :{
					templateUrl: "templates/search.html",
				}
			}
		});

	$urlRouterProvider.otherwise('/app/search');
});

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
		});

	$urlRouterProvider.otherwise('/app/player');
});

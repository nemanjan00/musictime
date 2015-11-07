torrentStream = require("torrent-stream");
http = require('http');
fs = require("fs");
path = require('path');
pump = require('pump');
var rangeParser = require('range-parser');

var extensions = [".mp3", ".mp4", ".ogg", ".opus", "wav"];

var playing = -1;
var engine;

soundManager.setup();

http.createServer(function(request, response) {
	var file = engine.files[request.url.replace("/", "")];

	if (request.method === 'OPTIONS' && request.headers['access-control-request-headers']) {
		response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
		response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
		response.setHeader('Access-Control-Allow-Headers', request.headers['access-control-request-headers']);
		response.setHeader('Access-Control-Max-Age', '1728000');

		response.end();
		return
	}

	if (request.headers.origin) response.setHeader('Access-Control-Allow-Origin', request.headers.origin);

	var range = request.headers.range;
	range = range && rangeParser(file.length, range)[0];
	response.setHeader('Accept-Ranges', 'bytes');
	//response.setHeader('Content-Type', getType(file.name));
	response.setHeader('transferMode.dlna.org', 'Streaming');
	response.setHeader('contentFeatures.dlna.org', 'DLNA.ORG_OP=01;DLNA.ORG_CI=0;DLNA.ORG_FLAGS=017000 00000000000000000000000000');
	if (!range) {
		response.setHeader('Content-Length', file.length);
		if (request.method === 'HEAD') return response.end();
		pump(file.createReadStream(), response);
		return;
	}

	response.statusCode = 206;
	response.setHeader('Content-Length', range.end - range.start + 1);
	response.setHeader('Content-Range', 'bytes ' + range.start + '-' + range.end + '/' + file.length);
	if (request.method === 'HEAD') return response.end();
	pump(file.createReadStream(range), response);
  
}).listen(8080);

angular.module('org.nemanjan00.musictime', [])
.controller("Player", function($scope, $http, $timeout){
	engine = torrentStream('magnet:?xt=urn:btih:c8b34f885e7e588ad95a5ca92f758a13f7c8f67e&dn=Dubioza+kolektiv+-+Happy+Machine+%28EP%29+2014&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969');

	$scope.songs = [];
	$scope.status = "play";


	engine.on('ready', function() {
		var scope = angular.element(document.getElementsByClassName("window")[0]).scope();
		
		engine.files.forEach(function(file) {	
			file.active = "";

			scope.$apply(function(){
				if(extensions.indexOf(path.extname(file.name.toLowerCase())) !== -1){
					scope.songs.push(file);
				}
			});
		});

		$timeout(function () { $scope.play(0); } , 0);
	});

	engine.listen();

	$scope.safeApply = function() {
		var phase = this.$root.$$phase;
		if(!(phase == '$apply' || phase == '$digest')) {
			this.$apply();
		}
	};
	
	$scope.toggle = function(){
		if(playing !== -1){
			sound = soundManager.getSoundById("song"+playing);

			if(sound.paused === true){
				sound.resume();

				$scope.status = "pause";
			}
			else
			{
				sound.pause();

				$scope.status = "play";
			}
		}	
	}

	$scope.next = function(){
		if($scope.songs[playing+1] !== undefined){
			$scope.play(playing + 1);
		}
		else
		{
			$scope.play(0);
		}
	}

	$scope.back = function(){
		if($scope.songs[playing-1] !== undefined){
			$scope.play(playing - 1);
		}
		else
		{
			$scope.play($scope.songs.length - 1);
		}
	}

	$scope.play = function(id){	
		if(playing !== -1){
			$scope.songs[playing].active = "";
			soundManager.getSoundById("song"+playing).stop();
		}

		$scope.songs[id].active = "active";

		$scope.safeApply();

		while(soundManager.getSoundById("song"+id) !== undefined){
			soundManager.destroySound("song"+id);
		}

		mySong = soundManager.createSound({
			id: "song"+id,
			url: 'http://localhost:8080/'+id
		});

		mySong.play({onfinish:$scope.next});

		playing = id;

		if($scope.songs[playing+1] !== undefined){
			$scope.songs[playing+1].select();
		}

		$scope.status = "pause";
	};
});

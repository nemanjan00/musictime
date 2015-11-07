torrentStream = require("torrent-stream");
http = require('http');
fs = require("fs");
path = require('path');

var playing = -1;

var engine;

var mySong = 0;

http.createServer(function(req, res) {
  var file = engine.files[req.url.replace("/", "")];

  console.log('filename:', file.name);
  var stream = file.createReadStream();

  // This will wait until we know the readable stream is actually valid before piping
  stream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    stream.pipe(res);
  });

  // This catches any errors that happen while creating the readable stream (usually invalid names)
  stream.on('readable', function(err) {
    res.write(stream.read());
  });
}).listen(8080);

soundManager.setup({
  onready: function() {
    var mySound = soundManager.createSound({
      id: 'aSound',
      url: 'http://localhost:8080/0'
    });
  }
});

angular.module('org.nemanjan00.musictime', [])
.controller("Test", function($scope, $http, $timeout){
	engine = torrentStream('magnet:?xt=urn:btih:7abf2eea1e0959886d838003a39940169d040cf5&dn=PINK+FLOYD+-+Discography+2011+Remasters+%5BBubanee%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969');

	$scope.songs = [];

	engine.on('ready', function() {
		var scope = angular.element(document.getElementsByClassName("window")[0]).scope();
		
		engine.files.forEach(function(file) {
			file.select();
		
			file.active = "";

			scope.$apply(function(){
				scope.songs.push(file);
			});
		});
	});

	engine.listen();

	$scope.toggle = function(){
		if(playing !== -1){
			sound = soundManager.getSoundById("song"+playing);

			if(sound.paused === true){
				sound.resume();
			}
			else
			{
				sound.pause();
			}
		}	
	}

	$scope.play = function(id){	
		if(playing !== -1){
			$scope.songs[playing].active = "";
			soundManager.getSoundById("song"+playing).stop();
		}

		$scope.songs[id].active = "active";

		mySong = soundManager.createSound({
			id: "song"+id,
			url: 'http://localhost:8080/'+id
		});

		mySong.play();

		playing = id;
	};
});

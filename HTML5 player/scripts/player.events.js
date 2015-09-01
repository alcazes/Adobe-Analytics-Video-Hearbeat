function load() {
		console.log("|*******************************|");
		console.log("|                               |");
		console.log("|PLAYER.EVENT.JS | VIDEO LOADED |");
		console.log("|                               |");
		console.log("|*******************************|");
		//Add Meta data when the video starts
		aaPlugin.setVideoMetadata({
			isUserLoggedIn: "false",
			tvStation: "Sample TV station",
			programmer: "Sample programmer"
		});
		
        window.vpPlugin.trackVideoLoad();

}

function trackPlay() {

    var myvideo = document.getElementById('videoasset');
	
	console.log("|*******************************|");
	console.log("|                               |");
	console.log("|PLAYER.EVENT.JS | VIDEO PLAYED |");
	console.log("|                               |");
	console.log("|*******************************|");
	window.vpPlugin.trackPlay();

}

function pause(e) {
	console.log("|*******************************|");
	console.log("|                               |");
	console.log("|PLAYER.EVENT.JS | VIDEO PAUSED |");
	console.log("|                               |");
	console.log("|*******************************|");
    window.vpPlugin.trackPause();

}

function seekStart(e) {
	console.log("|**********************************|");
	console.log("|                                  |");
	console.log("|PLAYER.EVENT.JS | VIDEO SEEK START|");
	console.log("|                                  |");
	console.log("|**********************************|");
    window.vpPlugin.trackSeekStart();

}

function seekEnd(e) {
	console.log("|********************************|");
	console.log("|                                |");
	console.log("|PLAYER.EVENT.JS | VIDEO SEEK END|");
	console.log("|                                |");
	console.log("|********************************|");
    window.vpPlugin.trackSeekComplete();

}

function trackComplete() {
	console.log("|*********************************|");
	console.log("|                                 |");
	console.log("|PLAYER.EVENT.JS | VIDEO COMPLETED|");
	console.log("|                                 |");
	console.log("|*********************************|");
    window.vpPlugin.trackComplete();

    window.vpPlugin.trackVideoUnload();
	
	//Unload Metadata
	//aaPlugin.setVideoMetadata(NULL);

}
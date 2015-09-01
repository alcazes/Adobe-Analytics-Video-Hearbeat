
/************************************************************/

/************************************************************/

var Heartbeat = ADB.va.Heartbeat;
var HeartbeatConfig = ADB.va.HeartbeatConfig;

var VideoPlayerPlugin = ADB.va.plugins.videoplayer.VideoPlayerPlugin;
var VideoPlayerPluginConfig = ADB.va.plugins.videoplayer.VideoPlayerPluginConfig;

var AdobeAnalyticsPlugin = ADB.va.plugins.aa.AdobeAnalyticsPlugin;
var AdobeAnalyticsPluginConfig = ADB.va.plugins.aa.AdobeAnalyticsPluginConfig;

var AdobeHeartbeatPlugin = ADB.va.plugins.ah.AdobeHeartbeatPlugin;
var AdobeHeartbeatPluginConfig = ADB.va.plugins.ah.AdobeHeartbeatPluginConfig;

var VideoInfo = ADB.va.plugins.videoplayer.VideoInfo;
var AssetType = ADB.va.plugins.videoplayer.AssetType;


/************************************************************/

/************************************************************/

var HeartbeatDelegate = ADB.va.HeartbeatDelegate;

$.extend(CustomHeartbeatDelegate.prototype, HeartbeatDelegate.prototype);

function CustomHeartbeatDelegate() {

}

CustomHeartbeatDelegate.prototype.onError = function(errorInfo) {
	console.log("Heartbeat error: " + errorInfo.getMessage() + " | " + errorInfo.getDetails());
};

window.CustomHeartbeatDelegate = CustomHeartbeatDelegate;

/************************************************************/

/************************************************************/

var AdobeHeartbeatPluginDelegate = ADB.va.plugins.ah.AdobeHeartbeatPluginDelegate;
$.extend(CustomAdobeHeartbeatPluginDelegate.prototype, AdobeHeartbeatPluginDelegate.prototype);

function CustomAdobeHeartbeatPluginDelegate() {

}

CustomAdobeHeartbeatPluginDelegate.prototype.onError = function(errorInfo) {
	console.log("AdobeHeartbeatPlugin error: " + errorInfo.getMessage() + " | " + errorInfo.getDetails());
};

window.CustomAdobeHeartbeatPluginDelegate = CustomAdobeHeartbeatPluginDelegate;

/************************************************************/

/************************************************************/

var AdobeAnalyticsPluginDelegate = ADB.va.plugins.aa.AdobeAnalyticsPluginDelegate;

$.extend(CustomAdobeAnalyticsPluginDelegate.prototype, AdobeAnalyticsPluginDelegate.prototype);

function CustomAdobeAnalyticsPluginDelegate() {

}

CustomAdobeAnalyticsPluginDelegate.prototype.onError = function(errorInfo) {
	console.log("AdobeAnalyticsPlugin error: " + errorInfo.getMessage() + " | " + errorInfo.getDetails());
};

window.CustomAdobeAnalyticsPluginDelegate = CustomAdobeAnalyticsPluginDelegate;

/************************************************************/

/************************************************************/

var VideoPlayerPluginDelegate = ADB.va.plugins.videoplayer.VideoPlayerPluginDelegate;

$.extend(CustomVideoPlayerPluginDelegate.prototype, VideoPlayerPluginDelegate.prototype);

function CustomVideoPlayerPluginDelegate(player) {
     
}

CustomVideoPlayerPluginDelegate.prototype.getVideoInfo = function() {
		var myvideo = document.getElementById('videoasset');
		var videoInfo = new VideoInfo();
		videoInfo.id = "TEST VIDEO ID Heartbeat NEW"; // e.g. “vid123-a”
		videoInfo.name = "TEST VIDEO NAME Heartbeat NEW"; // e.g. “My sample video”
		videoInfo.length = myvideo.duration; // e.g. 240 seconds
		videoInfo.playerName = "HTML 5 TEST VIDEO Heartbeat NEW"; // e.g. “Sample video player”
		videoInfo.playhead = myvideo.currentTime; // e.g. 115 (obtained from the video player)
		videoInfo.streamType = AssetType.ASSET_TYPE_VOD;
		return videoInfo;

};

CustomVideoPlayerPluginDelegate.prototype.getAdBreakInfo = function() {
        return null;
};

CustomVideoPlayerPluginDelegate.prototype.getAdInfo = function() {
        return null;
};

CustomVideoPlayerPluginDelegate.prototype.getChapterInfo = function() {
        return null;
};

CustomVideoPlayerPluginDelegate.prototype.getQoSInfo = function() {
        return null;
};

window.CustomVideoPlayerPluginDelegate = CustomVideoPlayerPluginDelegate;

/************************************************************/

/************************************************************/		


// Video Player plugin
var vpPluginDelegate = new CustomVideoPlayerPluginDelegate();
var vpPlugin = new VideoPlayerPlugin(vpPluginDelegate);
var vpPluginConfig = new VideoPlayerPluginConfig();
vpPluginConfig.debugLogging = true; // set this to false for production apps.
vpPlugin.configure(vpPluginConfig);
window.vpPlugin = vpPlugin;

// Adobe Analytics plugin
var aaPluginDelegate = new CustomAdobeAnalyticsPluginDelegate();
var aaPlugin = new AdobeAnalyticsPlugin(appMeasurement, aaPluginDelegate);
var aaPluginConfig = new AdobeAnalyticsPluginConfig();
aaPluginConfig.channel = "Alexis Channel AA plugin Config Test";  
aaPluginConfig.debugLogging = true; // set this to false for production apps.
aaPlugin.configure(aaPluginConfig);
window.aaPlugin = aaPlugin;

// Adobe Heartbeat plugin
var ahPluginDelegate = new CustomAdobeHeartbeatPluginDelegate();
var ahPlugin = new AdobeHeartbeatPlugin(ahPluginDelegate);
var ahPluginConfig = new AdobeHeartbeatPluginConfig("heartbeats.omtrdc.net", "[Publisher]");
ahPluginConfig.ovp = "Alexis online Platform NEW";
ahPluginConfig.sdk = "SDK ALEXIS 2.5";
ahPluginConfig.debugLogging = true; // set this to false for production apps.
ahPlugin.configure(ahPluginConfig);
window.ahPlugin = ahPlugin;

// Heartbeat
var plugins = [vpPlugin, aaPlugin, ahPlugin];
var heartbeatDelegate = new CustomHeartbeatDelegate();
var heartbeat = new Heartbeat(heartbeatDelegate, plugins);
var heartbeatConfig = new HeartbeatConfig();
heartbeatConfig.debugLogging = true; // set this to false for production apps.
heartbeat.configure(heartbeatConfig);
window.heartbeat = heartbeat;
    

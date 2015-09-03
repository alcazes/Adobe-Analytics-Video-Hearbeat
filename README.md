# Adobe-Analytics-Video-Hearbeat
Adobe Analytics Video Hearbeat

IT IS IMPORTANT THAT YOU FOLLOW THE DOCUMENTATION PROVIDED HERE : https://github.com/alcazes/Adobe-Analytics-Video-Hearbeat/blob/master/HTML5%20player/Doc/Video%20Hearbeat%20documentation.pdf

IN THE DOCUMENTATION YOU WILL FIND TEST IN BETWEEN [ ] : THIS MEANS THAT YOU HAVE TO INPUT YOUR OWN VALUES!!!

The steps below will highlight some of points at which you need to input your own code!

1.Get your Marketing Cloud Organization ID

You will need to follow the Requirements step in the documentation https://github.com/alcazes/Adobe-Analytics-Video-Hearbeat/blob/master/HTML5%20player/Doc/Video%20Hearbeat%20documentation.pdf
This MCOrgID will be required for the Visitor ID services implementation.

2.Implement Visitor ID services

In the documentation follow the step "Instantiate and configure the VisitorAPI library"

*MAKE SURE TO USE A RDC ADOBE ANALYTICS TRACKINGSERVER!!!!!!*

Example:
MCOrgID : 123ABC@AdobeOrg
trackingServer : test.d1.sc.omtrdc.net (SAN JOSE data Center)
The code in the VisitorAPI.js will look like this:
```JavaScript
/*******************************************************************/
/************************VISITOR ID CONFIGURATION*******************/
/*******************************************************************/
var visitor = Visitor.getInstance("123ABC@AdobeOrg", {
    trackingServer: "test.d1.sc.omtrdc.net", // same as s.trackingServer
    //trackingServerSecure: "INSERT-SECURE-TRACKING-SERVER-HERE", //same as s.trackingServerSecure
        
    // To enable CNAME support, add the following configuration variables
    // If you are not using CNAME, DO NOT include these variables
    //marketingCloudServer: "INSERT-TRACKING-SERVER-HERE",
    //marketingCloudServerSecure: "INSERT-SECURE-TRACKING-SERVER-HERE" //same as s.trackingServerSecure
});
```

3.For the Adobe Analytics code implementation you will need to follow the steps in the documentation.

Make sure to use the same MCOrgID as in the Visitor ID services and the same Tracking Server

Code:
```JavaScript
var appMeasurement = new AppMeasurement()
appMeasurement.account="testReportSuiteID"
appMeasurement.visitor = Visitor.getInstance("123ABC@AdobeOrg");
 
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Link Tracking Config */
appMeasurement.trackDownloadLinks=false
appMeasurement.trackExternalLinks=false
appMeasurement.trackInlineStats=false
appMeasurement.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
appMeasurement.linkInternalFilters="javascript:" //optional: add your internal domain here
appMeasurement.linkLeaveQueryString=false
/* uncomment below to use doPlugins */
appMeasurement.usePlugins=true
function s_doPlugins(s) {
/*SET ADDITIONAL TRACKING*/
 
}
/*appMeasurement.doPlugins=s_doPlugins
 
/* You may add or alter any code config here. */
appMeasurement.debugTracking=true
appMeasurement.trackingServer="test.d1.sc.omtrdc.net"
```

4.For the Video Heartbeat config library

Video Player Delegate:

```JavaScript
You need ti make sure to provide your OWN video details:
CustomVideoPlayerPluginDelegate.prototype.getVideoInfo = function() {
        var myvideo = document.getElementById('videoasset'); //HTML5 player used on HTML page
        var videoInfo = new VideoInfo();
        videoInfo.id = "TEST VIDEO ID Heartbeat NEW"; // e.g. “vid123-a”
        videoInfo.name = "TEST VIDEO NAME Heartbeat NEW"; // e.g. “My sample video”
        videoInfo.length = myvideo.duration; // e.g. 240 seconds
        videoInfo.playerName = "HTML 5 TEST VIDEO Heartbeat NEW"; // e.g. “Sample video player”
        videoInfo.playhead = myvideo.currentTime; // e.g. 115 (obtained from the video player)
        videoInfo.streamType = AssetType.ASSET_TYPE_VOD;
        return videoInfo;
 
};
```

Instantiate Adobe Analytics plugin

```JavaScript
// Adobe Analytics plugin
var aaPluginDelegate = new CustomAdobeAnalyticsPluginDelegate();
var aaPlugin = new AdobeAnalyticsPlugin(appMeasurement, aaPluginDelegate); //appMeasurement needs to have the same object name as in the AppMeasurement.js file
var aaPluginConfig = new AdobeAnalyticsPluginConfig();
aaPluginConfig.channel = "[CHANNEL NAME]"; // PUT THE CHANNEL NAME THAT YOU WANT
aaPluginConfig.debugLogging = true; // set this to false for production apps.
aaPlugin.configure(aaPluginConfig);
window.aaPlugin = aaPlugin;
```

Instantiate Adobe Heartbeat plugin : You need to make sure that the Video Hearbeat Publisher is provided to YOU before hand !

```JavaScript
// Adobe Heartbeat plugin
var ahPluginDelegate = new CustomAdobeHeartbeatPluginDelegate();
var ahPlugin = new AdobeHeartbeatPlugin(ahPluginDelegate);
var ahPluginConfig = new AdobeHeartbeatPluginConfig("heartbeats.omtrdc.net", "testPublisher");
ahPluginConfig.ovp = "TEST OVP";
ahPluginConfig.sdk = "TEST SDK";
ahPluginConfig.debugLogging = true; // set this to false for production apps.
ahPlugin.configure(ahPluginConfig);
window.ahPlugin = ahPlugin;
```

5.You will notice that in the player.events.js file in the load function, custom metadata is specified. make sure to change it to some thing that is relevant to you 

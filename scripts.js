var viewVideoLocal, viewVideoRemote;
var oConfigCall, oSipStack;
var oSipSessionRegister, oSipSessionCall;


viewVideoLocal = document.getElementById("video_local");
viewVideoRemote = document.getElementById("video_remote");

// oConfigCall = {
//   video_local: viewVideoLocal,
//   video_remote: viewVideoRemote,
//   screencast_window_id: 0x00000000, // entire desktop
//   bandwidth: { audio: undefined, video: undefined },
//   video_size: {
//     minWidth: undefined,
//     minHeight: undefined,
//     maxWidth: undefined,
//     maxHeight: undefined,
//   },
//   events_listener: { events: "*", listener: onSipEventSession },
//   sip_caps: [{ name: "+g.oma.sip-im" }, { name: "language", value: '"en,fr"' }],
// };
var eventsListener = function(e){
  console.log("connect event" , e);
  if(e.type == 'started'){
console.log("started");
      login();
  }

  else if(e.type == 'i_new_call'){ // incoming audio/video call
      acceptCall(e);
      
     console.log("accept call", e)
  }
}
oSipStack = new SIPml.Stack({
  realm: "conf.nitoville.com",
  impi: "641234567890",
  display_name: "641234567890",
  impu: "sip:641234567890@conf.nitoville.com:7443",
  password: "mysecret",
  enable_rtcweb_breaker: false,
  websocket_proxy_url: "wss://conf.nitoville.com:7443",
  outbound_proxy_url: "tls://conf.nitoville.com:7443",
  events_listener: { events: "*", listener: eventsListener },

  sip_headers: [
    // optional
    { name: "User-Agent", value: "IM-client/OMA1.0 sipML5-v1.0.0.0" },
    { name: "Organization", value: "Doubango Telecom" },
  ],
});
oSipStack.start();

var sessioneventsListener = function(e){
  console.info('session event listner = ' + e.type);
  if(e.type == 'connected' && e.session == oSipSessionRegister){
    console.log("connected and session available")
       makeCall();
      // sendMessage();
      // publishPresence();
      // subscribePresence('johndoe'); // watch johndoe's presence status change
  }else{
    console.log("not working properly")
  }
}
login=()=>{
  console.log("login")
  oSipSessionRegister= oSipStack.newSession('register', {
    events_listener: { events: '*', listener: sessioneventsListener } // optional: '*' means all events
});
oSipSessionRegister.register();
}
makeCall=()=>{111

  console.log("calling")
  oSipSessionCall= oSipStack.newSession('call-audiovideo', {
    video_local: viewVideoLocal,
    video_remote: viewVideoRemote,
    events_listener: { events: '*', listener: eventsListener } // optional: '*' means all events
});
oSipSessionCall.call('641234567891');
}
var acceptCall = function(e){
  e.newSession.accept(); // e.newSession.reject() to reject the call
}

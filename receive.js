

var options = {
SDKAppID: 20001658 // Replace 0 with the `SDKAppID` of your IM application when connecting.
};

// Create an SDK instance. The `TIM.create()` method returns the same instance for the same `SDKAppID`.

var tim = TIM.create(options);  // The SDK instance is usually represented by `tim`.

// Set the SDK log output level. For more information on each level, see <a href="https://web.sdk.qcloud.com/im/doc/en/SDK.html#setLogLevel">setLogLevel API Description</a>.
tim.setLogLevel(1); // Common level. We recommend you use this level during access as it covers more logs.
// tim.setLogLevel(1); // Release level, at which the SDK outputs important information. We recommend you use this log level in a production environment.

// Register the Tencent Cloud IM upload plugin.
tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});


userLogin()
// 
joinGroup()

// This event is triggered when the SDK receives a newly pushed one-to-one message, group message, group tip, or group system message. When this event occurs, you can traverse event.data to obtain the message list and render it to the UI.
let onMessageReceived = function(event) {
  // event.data - An array that stores Message objects - [Message]
  var name = this.makeid(8)
  // $('.user-join-name').text( name + " Đã tham gia" );
  var data = event.data;
  if(data.length > 0) {
    data = data[0];
    if (data.payload.memberCount)
    $('.number-view').text(data.payload.memberCount)
      // $('.user-chat').append('<div class="chat-block"><span class="user-name">' + data.from + ': </span><span class="chat-text">' + data.payload.text  + '</span></div>')
  }
  
  console.log("m RECEIVE: ", event.data)
};
tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);


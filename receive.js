

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


var genTestUserSig = genTestUserSig({SDKAppID: 20001658, secretKey: 'f6a85dbe41dc1e7d9ba2f49e125276de32714a5c25ada09b5d0f01157da9054b', userID: 'user1'});

let onSdkNotReady = function(event) {
  // To use features such as message sending, you need to drive the SDK to enter the `ready` status and then call the login API again as follows:
  tim.login({userID: 'user1', userSig: genTestUserSig.userSig});
};
tim.on(TIM.EVENT.SDK_NOT_READY, onSdkNotReady);
// 
let promise = tim.joinGroup({ groupID: '@TGS#a52FSOE5C4', type: TIM.TYPES.GRP_AVCHATROOM });
promise.then(function(imResponse) {
  switch (imResponse.data.status) {
    case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // Waiting to be approved by the admin
      break;
    case TIM.TYPES.JOIN_STATUS_SUCCESS: // Joined the group successfully
      console.log(imResponse.data.group); // Profile of the group
      break;
    case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // The user is already in the group
      break;
    default:
      break;
  }
}).catch(function(imError){
  console.warn('joinGroup error:', imError); // Error information
});

// This event is triggered when the SDK receives a newly pushed one-to-one message, group message, group tip, or group system message. When this event occurs, you can traverse event.data to obtain the message list and render it to the UI.
let onMessageReceived = function(event) {
  // event.data - An array that stores Message objects - [Message]
  var name = this.makeid(8)
  // $('.user-join-name').text( name + " Đã tham gia" );
  var data = event.data;
  if(data.length > 0) {
    data = data[0];
    $('.user-chat').append('<div class="chat-block"><span class="user-name">' + data.from + ': </span><span class="chat-text">' + data.payload.text  + '</span></div>')
  }
  
  console.log("m: ", event.data)
};
tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);


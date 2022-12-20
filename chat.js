
alert("okeee")

var options = {
SDKAppID: 20001658 // Replace 0 with the `SDKAppID` of your IM application when connecting.
};

// Create an SDK instance. The `TIM.create()` method returns the same instance for the same `SDKAppID`.

var tim = TIM.create(options);  // The SDK instance is usually represented by `tim`.

// Set the SDK log output level. For more information on each level, see <a href="https://web.sdk.qcloud.com/im/doc/en/SDK.html#setLogLevel">setLogLevel API Description</a>.
tim.setLogLevel(0); // Common level. We recommend you use this level during access as it covers more logs.
// tim.setLogLevel(1); // Release level, at which the SDK outputs important information. We recommend you use this log level in a production environment.

// Register the Tencent Cloud IM upload plugin.
tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});


var genTestUserSig = genTestUserSig({SDKAppID: 20001658, secretKey: 'f6a85dbe41dc1e7d9ba2f49e125276de32714a5c25ada09b5d0f01157da9054b', userID: 'kita12345'});

console.log(genTestUserSig);

// let promise = tim.login({userID: 'kita12345', userSig: genTestUserSig.userSig});
// This event is triggered when the SDK enters the `ready` status. When detecting this event during listening, you can call SDK APIs such as the message sending API to use various features of the SDK.
let onSdkReady = function(event) {
  let message = tim.createTextMessage({ to: 'user1', conversationType: 'C2C', payload: { text: 'Hello world! Ga qua' }});
  tim.sendMessage(message);
};
onSdkReady()
tim.on(TIM.EVENT.SDK_READY, onSdkReady);

// This event is triggered when the SDK enters the `not ready` status. In this case, you cannot use SDK features such as message sending. To use them, you need to call the `login` API to drive the SDK into the `ready` status.
let onSdkNotReady = function(event) {
  // To use features such as message sending, you need to drive the SDK to enter the `ready` status and then call the login API again as follows:
  tim.login({userID: 'kita12345', userSig: genTestUserSig.userSig});
};
onSdkNotReady()
tim.on(TIM.EVENT.SDK_NOT_READY, onSdkNotReady);


var options = {
SDKAppID: 20001658 // Replace 0 with the `SDKAppID` of your IM application when connecting.
};

// Create an SDK instance. The `TIM.create()` method returns the same instance for the same `SDKAppID`.

var tim = TIM.create(options);  // The SDK instance is usually represented by `tim`.

// Set the SDK log output level. For more information on each level, see <a href="https://web.sdk.qcloud.com/im/doc/en/SDK.html#setLogLevel">setLogLevel API Description</a>.
tim.setLogLevel(2); // Common level. We recommend you use this level during access as it covers more logs.
// tim.setLogLevel(1); // Release level, at which the SDK outputs important information. We recommend you use this log level in a production environment.

// Register the Tencent Cloud IM upload plugin.
tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});


var genTestUserSig = genTestUserSig({SDKAppID: 20001658, secretKey: 'f6a85dbe41dc1e7d9ba2f49e125276de32714a5c25ada09b5d0f01157da9054b', userID: 'user1'});

console.log(genTestUserSig);

let promise = tim.login({userID: 'user1', userSig: genTestUserSig.userSig});
promise.then(function(imResponse) {
  console.log("Login successful")
  console.log(imResponse.data); // Login successful
  if (imResponse.data.repeatLogin === true) {
    // Indicates that the account has logged in and that the current login will be a repeated login. This feature is supported from v2.5.1.
    console.log(imResponse.data.errorInfo);
  }
}).catch(function(imError) {
  console.warn('login error:', imError); // Error information
});


// This event is triggered when the SDK receives a newly pushed one-to-one message, group message, group tip, or group system message. When this event occurs, you can traverse event.data to obtain the message list and render it to the UI.
let onMessageReceived = function(event) {
  // event.data - An array that stores Message objects - [Message]
  console.log("Data: ", event.data[0])
};
tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
onMessageReceived()
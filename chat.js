
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

let promise = tim.login({userID: 'kita12345', userSig: genTestUserSig.userSig});
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


// Send a text message. The text message sending process in web apps is the same as that in Mini Programs.
// 1. Create a message instance. The returned instance can be displayed on the screen.
let message = tim.createTextMessage({
    to: 'user1',
    conversationType: TIM.TYPES.CONV_C2C,
    payload: {
      text: 'Hello world!'
    },
});

  // 2. Send the message.
let pro = tim.sendMessage(message);

pro.then(function(imResponse) {
    // The message is sent successfully.
    console.log("mes receive: ");
    console.log(imResponse);
  
}).catch(function(imError) {
    // The message fails to be sent.
    console.warn('sendMessage error:', imError);
});
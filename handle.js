function joinGroup() {
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

}


function userLogin() {
    var name = makeid(8)
    var genTestUser = genTestUserSig({SDKAppID: 20001658, secretKey: 'f6a85dbe41dc1e7d9ba2f49e125276de32714a5c25ada09b5d0f01157da9054b', userID: name});

    let onSdkNotReady = function(event) {
        // To use features such as message sending, you need to drive the SDK to enter the `ready` status and then call the login API again as follows:
        tim.login({userID: name, userSig: genTestUser.userSig});
      };
      onSdkNotReady()
    tim.on(TIM.EVENT.SDK_NOT_READY, onSdkNotReady);
}

function userSendMessage(content = "111") {
    let onSdkReady = function(event) {
        let message = tim.createTextMessage({ to: '@TGS#a52FSOE5C4', conversationType: TIM.TYPES.CONV_GROUP, payload: { text: content }});
        tim.sendMessage(message);
      };
      tim.on(TIM.EVENT.SDK_READY, onSdkReady);
}
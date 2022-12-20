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
    
    let onSdkNotReady = function(event) {
        // To use features such as message sending, you need to drive the SDK to enter the `ready` status and then call the login API again as follows:
        tim.login({userID: 'kita12345', userSig: 'eJwtzMsKgzAQheF3mXWRSUysFboQF*3CUkJvdikkypgqoiGUlr57RV2e78D-hWt*CbwZIAEeIGzmTdp0jiqa2ZIrGQ*FXM9R27LvSUPCEZFFMl7cUWsgYdGWSYlyh4uad0-D5BGKGFcbqZ66LH90d3RO*ecta0LfFFahTrPX8VSoSrfpR7gDr88M7R5*f-2*MS4_'});
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
function joinGroup() {
    let onSdkReady = function (event) {
        let promise = tim.joinGroup({ groupID: '@TGS#a52FSOE5C4', type: TIM.TYPES.GRP_AVCHATROOM  });
        promise.then(function (imResponse) {
            switch (imResponse.data.status) {
                case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // Waiting to be approved by the admin
                    break;
                case TIM.TYPES.JOIN_STATUS_SUCCESS: // Joined the group successfully
                    var memberNum = imResponse.data.group.memberNum
                    console.log("join success")
                    console.log("memberNum: ", memberNum)
                    // userSendMessage(memberNum)
                    $('.number-view').text(memberNum)
                    break;
                case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // The user is already in the group
                    break;
                default:
                    break;
            }

            // getMessageList()

        }).catch(function (imError) {
            console.warn('joinGroup error:', imError); // Error information
        });
    };

    tim.on(TIM.EVENT.SDK_READY, onSdkReady);
}


function userLogin() {
    var name = makeid(8)
    var genTestUser = genTestUserSig({ SDKAppID: 20001658, secretKey: 'f6a85dbe41dc1e7d9ba2f49e125276de32714a5c25ada09b5d0f01157da9054b', userID: name });

    let onSdkNotReady = function (event) {
        // To use features such as message sending, you need to drive the SDK to enter the `ready` status and then call the login API again as follows:
        tim.login({ userID: name, userSig: genTestUser.userSig });
    };
    onSdkNotReady()
    tim.on(TIM.EVENT.SDK_NOT_READY, onSdkNotReady);


}

function userSendMessage(content = "111") {
    let onSdkReady = function (event) {
        let message = tim.createTextMessage({ to: '@TGS#a52FSOE5C4', conversationType: 'GROUP', payload: { text: content } });
        tim.sendMessage(message);
    };
    // onSdkReady()
    tim.on(TIM.EVENT.SDK_READY, onSdkReady);
}

function getGroupMembers() {
    let onSdkReady = function (event) {
        let promise = tim.getGroupMemberList({ groupID: '@TGS#a52FSOE5C4', count: 30, offset: 0 }); // Pull 30 group members starting from 0
        promise.then(function (imResponse) {
            console.log("member: ");
            console.log(imResponse); // Group member list
        }).catch(function (imError) {
            console.warn('getGroupMemberList error:', imError);
        });
    };

    tim.on(TIM.EVENT.SDK_READY, onSdkReady);
}

function getMessageList() {
    // Pull the message list for the first time when a conversation is opened.
    let promise = tim.getMessageList({conversationID: 'GROUP@TGS#3ZQWSOE5CF', count: 15});
    promise.then(function(imResponse) {
        const messageList = imResponse.data.messageList; // Message list.
        console.log("m list: ", messageList)
        const nextReqMessageID = imResponse.data.nextReqMessageID; // This parameter must be passed in for the next pulling by page.
        const isCompleted = imResponse.data.isCompleted; // It indicates whether all messages have been pulled.
    });

}


function receiveMessage() {
    // This event is triggered when the SDK receives a newly pushed one-to-one message, group message, group tip, or group system message. When this event occurs, you can traverse event.data to obtain the message list and render it to the UI.
    let onMessageReceived = function(event) {
        // event.data - An array that stores Message objects - [Message]
        // var name = this.makeid(8)
        // // $('.user-join-name').text( name + " Đã tham gia" );
        // var data = event.data;
        // if(data.length > 0) {
        // data = data[0];
        // $('.user-chat').append('<div class="chat-block"><span class="user-name">' + data.from + ': </span><span class="chat-text">' + data.payload.text  + '</span></div>')
        // }
        
        console.log("m receive: ", event)
    };
    onMessageReceived()
//   tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
}

function groupUpdated() {
    let onGroupUpdated = function(event) {
        // event.data - An array that stores Message objects - [Message]
        // var name = this.makeid(8)
        // // $('.user-join-name').text( name + " Đã tham gia" );
        var data = event.data;
        if(data.length > 0) {
            data = data[0];
            var num = data.lastMessage.payload.text
            $('.number-view').text(num)
            // $('.user-chat').append('<div class="chat-block"><span class="user-name">' + data.from + ': </span><span class="chat-text">' + data.payload.text  + '</span></div>')
        }
        
        console.log("m updated: ", event.data)
    };
    tim.on(TIM.EVENT.GROUP_LIST_UPDATED, onGroupUpdated)
    receiveMessage()
}
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function genTestUserSig(options) {
    const { SDKAppID, secretKey, userID } = options;
    const generator = new LibGenerateTestUserSig(SDKAppID, secretKey, 604800);
    const userSig = generator.genTestUserSig(userID);
    return {
      SDKAppID,
      userSig,
    };
  }
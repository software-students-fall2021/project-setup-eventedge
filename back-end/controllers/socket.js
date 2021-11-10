let msgs = {};

const joinRoom = (username, chatId, socket) => {
    console.log(username + ' joined');
    socket.join(chatId);
}

const retrieveMsgs = (chatId, io) => {
    io.to(chatId).emit('retrieveMsgs', msgs[chatId]);
}

const sendMsg = (msgObj, chatId, io) => {
    if (msgs[chatId]) {
        msgObj.id = msgs[chatId].length;
        msgs[chatId].push(msgObj);
    } else {
        msgs[chatId] = [msgObj];
    }
    io.to(chatId).emit('sendMsg', msgObj);
}

module.exports = {
    joinRoom,
    retrieveMsgs,
    sendMsg,
}
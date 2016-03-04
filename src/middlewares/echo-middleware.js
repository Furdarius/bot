module.exports = EchoMiddleware;

function EchoMiddleware(TelegramBotInstance) {
    this.TelegramBotInstance = TelegramBotInstance;
};

EchoMiddleware.prototype.handle = function(Message) {
    var fromId = Message.from.id;
    this.TelegramBotInstance.sendMessage(fromId, 'Echo sended');

    return true;
};
export class DToolsIPC {
    window;
    channel;
    port1;
    eventMap;
    constructor(window) {
        this.window = window;
        this.channel = new MessageChannel();
        this.port1 = this.channel.port1;
        this.eventMap = new Map();
    }
    /**
     *  发送初始化消息，建立连接。
     */
    init() {
        this.window.postMessage("create connection", "*", [this.channel.port2]);
        this.port1.onmessage = (event) => {
            const fn = this.eventMap.get(event.data.messageId);
            if (null != fn) {
                fn(event);
            }
        };
    }
    send(message) {
        const messageId = DToolsIPC.messageId();
        message.messageId = messageId;
        this.port1.postMessage(message);
        return messageId;
    }
    callback(fn, messageId) {
        this.eventMap.set(messageId, fn);
    }
    static messageId() {
        var temp_url = URL.createObjectURL(new Blob());
        var uuid = temp_url.toString();
        URL.revokeObjectURL(temp_url);
        return uuid.substring(uuid.lastIndexOf("/") + 1);
    }
}
export class DToolsRequest {
    api;
    fn;
    messageId = "";
    params;
    constructor(api, fn, params) {
        this.api = api;
        this.fn = fn;
        this.params = params;
    }
}
export class DToolsResponse {
    success;
    message;
    messageId;
    data;
    constructor(messageId, message, success, data) {
        this.message = message;
        this.success = success;
        this.data = data;
        this.messageId = messageId;
    }
}
class DToolsPluginInfo {
    pluginId;
    constructor(pluginId) {
        this.pluginId = pluginId;
    }
}

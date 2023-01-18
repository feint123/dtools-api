export class DToolsIPC {
    window;
    channel;
    port1;
    constructor(window) {
        this.window = window;
        this.channel = new MessageChannel();
        this.port1 = this.channel.port1;
    }
    /**
     *  发送初始化消息，建立连接。
     */
    init() {
        this.window.postMessage("create connection", "*", [this.channel.port2]);
    }
    send(message) {
        this.port1.postMessage({
            message: message,
            // 发送插件信息，用于之后的权限控制
            plugin: window.__DTOOLS_PLUGIN_INFO__
        });
    }
    callback(fn) {
        this.port1.onmessage = (event) => {
            fn(event);
        };
    }
}
export class DToolsRequest {
    api;
    fn;
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
    data;
    constructor(message, success, data) {
        this.message = message;
        this.success = success;
        this.data = data;
    }
}
class DToolsPluginInfo {
    pluginId;
    constructor(pluginId) {
        this.pluginId = pluginId;
    }
}

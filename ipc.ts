export class DToolsIPC {
    window: Window;
    channel: MessageChannel;
    port1: MessagePort;
    constructor(window: Window) {
        this.window = window;
        this.channel = new MessageChannel();
        this.port1 = this.channel.port1;
    }
    /**
     *  发送初始化消息，建立连接。
     */
    init(): void {
        this.window.postMessage("create connection", "*", [this.channel.port2]);
    }

    send(message: any):void {
        this.port1.postMessage({
            message: message,
            // 发送插件信息，用于之后的权限控制
            plugin: window.__DTOOLS_PLUGIN_INFO__
        })
    }

    callback(fn: (event: MessageEvent)=>void) {
        this.port1.onmessage = (event: MessageEvent) => {
            fn(event)
        }
    }
}

export class DToolsRequest<T> {
    api: string;
    fn: string;
    params: T;

    constructor(api: string, fn: string, params: T) {
        this.api = api;
        this.fn = fn;
        this.params = params;
    }
}

export class DToolsResponse<T> {
    success: boolean;
    message: string;
    data: T;

    constructor(message: string, success: boolean, data: T) {
        this.message = message;
        this.success = success;
        this.data = data;
    }
}

class DToolsPluginInfo {
    pluginId: string;

    constructor(pluginId: string) {
        this.pluginId = pluginId;
    }
}

declare global {
    interface Window {
        __DTOOLS_IPC__: DToolsIPC;
        __DTOOLS_PLUGIN_INFO__: DToolsPluginInfo;
    }
}
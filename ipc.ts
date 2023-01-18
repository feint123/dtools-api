export class DToolsIPC {
    window: Window;
    channel: MessageChannel;
    port1: MessagePort;
    eventMap: Map<string, Function>;
    constructor(window: Window) {
        this.window = window;
        this.channel = new MessageChannel();
        this.port1 = this.channel.port1;
        this.eventMap = new Map<string, (event: MessageEvent)=>void>();
    }
    /**
     *  发送初始化消息，建立连接。
     */
    init(): void {
        this.window.postMessage("create connection", "*", [this.channel.port2]);
        this.port1.onmessage = (event: MessageEvent<DToolsResponse<any>>) => {
            const fn = this.eventMap.get(event.data.messageId);
            if(null != fn) {
                fn(event);
            }
        }
    }

    send(message: DToolsRequest<any>):string {
        const messageId = DToolsIPC.messageId();
        message.messageId = messageId;
        this.port1.postMessage(message)
        return messageId;
    }

    callback(fn: (event: MessageEvent)=>void, messageId: string) {
        this.eventMap.set(messageId, fn);
    }

    static messageId(): string {
        var temp_url = URL.createObjectURL(new Blob());
        var uuid = temp_url.toString();
        URL.revokeObjectURL(temp_url);
        return uuid.substring(uuid.lastIndexOf("/") + 1);
    }
}

export class DToolsRequest<T> {
    api: string;
    fn: string;
    messageId: string = "";
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
    messageId: string;
    data: T;

    constructor(messageId: string,message: string, success: boolean, data: T) {
        this.message = message;
        this.success = success;
        this.data = data;
        this.messageId = messageId;
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
export declare class DToolsIPC {
    window: Window;
    channel: MessageChannel;
    port1: MessagePort;
    constructor(window: Window);
    /**
     *  发送初始化消息，建立连接。
     */
    init(): void;
    send(message: any): void;
    callback(fn: (event: MessageEvent) => void): void;
}
export declare class DToolsRequest<T> {
    api: string;
    fn: string;
    params: T;
    constructor(api: string, fn: string, params: T);
}
export declare class DToolsResponse<T> {
    success: boolean;
    message: string;
    data: T;
    constructor(message: string, success: boolean, data: T);
}
declare class DToolsPluginInfo {
    pluginId: string;
    constructor(pluginId: string);
}
declare global {
    interface Window {
        __DTOOLS_IPC__: DToolsIPC;
        __DTOOLS_PLUGIN_INFO__: DToolsPluginInfo;
    }
}
export {};

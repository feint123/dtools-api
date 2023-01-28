export declare class DToolsIPC {
    window: Window;
    channel: MessageChannel;
    port1: MessagePort;
    eventMap: Map<string, Function>;
    constructor(window: Window);
    /**
     *  发送初始化消息，建立连接。
     */
    init(): void;
    send(message: DToolsRequest<any>): string;
    callback(fn: (event: MessageEvent) => void, messageId: string): void;
    static messageId(): string;
}
export declare class DToolsRequest<T> {
    api: string;
    fn: string;
    messageId: string;
    params: T;
    constructor(api: string, fn: string, params: T);
}
export declare class DToolsResponse<T> {
    success: boolean;
    message: string;
    messageId: string;
    data: T;
    constructor(messageId: string, message: string, success: boolean, data: T);
}
export declare function convertFileSrc(filePath: string, protocol?: string): string;
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

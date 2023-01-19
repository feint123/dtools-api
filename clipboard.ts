import { DToolsRequest, DToolsResponse } from './ipc';
const API_CLIP = "invoke";

export function readClipboard(): Promise<ClipboardData> {
    return new Promise<ClipboardData>((resolve, reject) => {
        const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_CLIP, "read_clipboard", {}))
        window.__DTOOLS_IPC__.callback((event: MessageEvent<DToolsResponse<ClipboardData>>) => {
            if (event.data.success) {
                resolve(event.data.data);
            } else {
                reject(event.data.message);
            }
        }, messageId)
    });
}

export function writeClipboard(clipType: ClipType, content: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_CLIP, "write_clipboard",
            new ClipboardWriteRequest(clipType, content)));
        window.__DTOOLS_IPC__.callback((event: MessageEvent<DToolsResponse<void>>) => {
            if (event.data.success) {
                resolve(event.data.data);
            } else {
                reject(event.data.message);
            }
        }, messageId)
    });
}



enum ClipType {
    Text = 1,
    Image
}

class ClipboardData {
    clipType: ClipType;
    textContent: string;
    filePath: string;
    contentMd5: string;

    constructor(clipType: ClipType, textContent: string, filePath: string, contentMd5: string) {
        this.clipType = clipType;
        this.textContent = textContent;
        this.filePath = filePath;
        this.contentMd5 = contentMd5;
    }
}

export class ClipboardWriteRequest {
    content: string;
    clipType: ClipType;

    constructor(clipType: ClipType, content: string) {
        this.clipType = clipType;
        this.content = content;
    }
}
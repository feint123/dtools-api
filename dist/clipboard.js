import { DToolsRequest } from './ipc';
const API_CLIP = "invoke";
export function readClipboard() {
    return new Promise((resolve, reject) => {
        const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_CLIP, "read_clipboard", {}));
        window.__DTOOLS_IPC__.callback((event) => {
            if (event.data.success) {
                resolve(event.data.data);
            }
            else {
                reject(event.data.message);
            }
        }, messageId);
    });
}
export function writeClipboard(clipType, content) {
    return new Promise((resolve, reject) => {
        const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_CLIP, "write_clipboard", new ClipboardWriteRequest(clipType, content)));
        window.__DTOOLS_IPC__.callback((event) => {
            if (event.data.success) {
                resolve(event.data.data);
            }
            else {
                reject(event.data.message);
            }
        }, messageId);
    });
}
var ClipType;
(function (ClipType) {
    ClipType[ClipType["Text"] = 1] = "Text";
    ClipType[ClipType["Image"] = 2] = "Image";
})(ClipType || (ClipType = {}));
class ClipboardData {
    clipType;
    textContent;
    filePath;
    contentMd5;
    constructor(clipType, textContent, filePath, contentMd5) {
        this.clipType = clipType;
        this.textContent = textContent;
        this.filePath = filePath;
        this.contentMd5 = contentMd5;
    }
}
export class ClipboardWriteRequest {
    content;
    clipType;
    constructor(clipType, content) {
        this.clipType = clipType;
        this.content = content;
    }
}

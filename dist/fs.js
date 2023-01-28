import { DToolsRequest } from './ipc';
const API_FS = "fs";
/**
 * 文件是否存在
 * @param path
 * @param options
 * @returns
 */
export function exists(path, options) {
    return new Promise((resolve, reject) => {
        const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_FS, "exists", new FsExistsRequest(path, options)));
        window.__DTOOLS_IPC__.callback((event) => {
            if (event.data.success) {
                if (event.data.data) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }
            else {
                reject(event.data.message);
            }
        }, messageId);
    });
}
export class FsExistsRequest {
    path;
    options;
    constructor(path, options) {
        this.path = path;
        this.options = options;
    }
}
var BaseDirectory;
(function (BaseDirectory) {
    BaseDirectory[BaseDirectory["Audio"] = 1] = "Audio";
    BaseDirectory[BaseDirectory["Cache"] = 2] = "Cache";
    BaseDirectory[BaseDirectory["Config"] = 3] = "Config";
    BaseDirectory[BaseDirectory["Data"] = 4] = "Data";
    BaseDirectory[BaseDirectory["LocalData"] = 5] = "LocalData";
    BaseDirectory[BaseDirectory["Desktop"] = 6] = "Desktop";
    BaseDirectory[BaseDirectory["Document"] = 7] = "Document";
    BaseDirectory[BaseDirectory["Download"] = 8] = "Download";
    BaseDirectory[BaseDirectory["Executable"] = 9] = "Executable";
    BaseDirectory[BaseDirectory["Font"] = 10] = "Font";
    BaseDirectory[BaseDirectory["Home"] = 11] = "Home";
    BaseDirectory[BaseDirectory["Picture"] = 12] = "Picture";
    BaseDirectory[BaseDirectory["Public"] = 13] = "Public";
    BaseDirectory[BaseDirectory["Runtime"] = 14] = "Runtime";
    BaseDirectory[BaseDirectory["Template"] = 15] = "Template";
    BaseDirectory[BaseDirectory["Video"] = 16] = "Video";
    BaseDirectory[BaseDirectory["Resource"] = 17] = "Resource";
    BaseDirectory[BaseDirectory["App"] = 18] = "App";
    BaseDirectory[BaseDirectory["Log"] = 19] = "Log";
    BaseDirectory[BaseDirectory["Temp"] = 20] = "Temp";
    BaseDirectory[BaseDirectory["AppConfig"] = 21] = "AppConfig";
    BaseDirectory[BaseDirectory["AppData"] = 22] = "AppData";
    BaseDirectory[BaseDirectory["AppLocalData"] = 23] = "AppLocalData";
    BaseDirectory[BaseDirectory["AppCache"] = 24] = "AppCache";
    BaseDirectory[BaseDirectory["AppLog"] = 25] = "AppLog";
})(BaseDirectory || (BaseDirectory = {}));

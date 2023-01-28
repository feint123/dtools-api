import { DToolsRequest, DToolsResponse } from './ipc';

const API_FS = "fs";
/**
 * 文件是否存在
 * @param path 
 * @param options 
 * @returns 
 */
export function exists(path: string, options?: FsOptions): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        const messageId = window.__DTOOLS_IPC__.send(new DToolsRequest(API_FS, "exists",
            new FsExistsRequest(path, options)));
        window.__DTOOLS_IPC__.callback((event: MessageEvent<DToolsResponse<boolean>>) => {
            if (event.data.success) {
                if (event.data.data) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } else {
                reject(event.data.message);
            }
        }, messageId);
    });
}

export class FsExistsRequest {
    path: string;
    options?: FsOptions;

    constructor(path: string, options?: FsOptions) {
        this.path = path;
        this.options = options;
    }
}

/**
 * @since 1.0.0
 */
interface FsOptions {
    dir?: BaseDirectory;
}

enum BaseDirectory {
    Audio = 1,
    Cache = 2,
    Config = 3,
    Data = 4,
    LocalData = 5,
    Desktop = 6,
    Document = 7,
    Download = 8,
    Executable = 9,
    Font = 10,
    Home = 11,
    Picture = 12,
    Public = 13,
    Runtime = 14,
    Template = 15,
    Video = 16,
    Resource = 17,
    App = 18,
    Log = 19,
    Temp = 20,
    AppConfig = 21,
    AppData = 22,
    AppLocalData = 23,
    AppCache = 24,
    AppLog = 25
}
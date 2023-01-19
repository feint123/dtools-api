export declare function readClipboard(): Promise<ClipboardData>;
export declare function writeClipboard(clipType: ClipType, content: string): Promise<void>;
declare enum ClipType {
    Text = 1,
    Image = 2
}
declare class ClipboardData {
    clipType: ClipType;
    textContent: string;
    filePath: string;
    contentMd5: string;
    constructor(clipType: ClipType, textContent: string, filePath: string, contentMd5: string);
}
export declare class ClipboardWriteRequest {
    content: string;
    clipType: ClipType;
    constructor(clipType: ClipType, content: string);
}
export {};

interface ReadDirectoryOptions {
    ignore?: string[];
    type?: 'file' | 'folder';
    includeRoot?: boolean;
}
export declare function readDirectoryRecursive(root: string, options?: ReadDirectoryOptions): string[];
export {};
//# sourceMappingURL=fileSystem.d.ts.map
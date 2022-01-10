import fs = require("fs");
import path = require("path");

/**
 * Inspired by `fsutil` from bdsx.
 * In fact, just turned to Sync
 */
export namespace fsmgmt {
    export function mkdirSync(path: string) {
        try {
            fs.mkdirSync(path);
        } catch (err) {}
    }
    export function mkdirRecursiveSync(dirpath: string, dirhas?: Set<string>) {
        if (dirhas != null && dirhas.has(dirpath)) return;
        if (dirpath === path.dirname(dirpath)) return;
        mkdirRecursiveSync(path.dirname(dirpath), dirhas);
        mkdirSync(dirpath);
    }
}

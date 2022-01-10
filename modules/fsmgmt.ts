import fs = require("fs");
import path = require("path");

export namespace fsmgmt {
    export function mkdirSync(path: string) {
        try {
            fs.mkdirSync(path);
        } catch (err) {
            throw err;
        }
    }
    export function mkdirRecursiveSync(dirpath: string, dirhas?: Set<string>) {
        if (dirhas != null && dirhas.has(dirpath)) return;
        if (dirpath === path.dirname(dirpath)) return;
        mkdirRecursiveSync(path.dirname(dirpath), dirhas);
        mkdirSync(dirpath);
    }
}

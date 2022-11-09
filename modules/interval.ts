import { events } from "bdsx/event";

export class IntervalUtil {
    private static readonly entries: IntervalUtil[] = [];
    static clearAll() {
        //.clear에서 entries.splice하기 때문에 뒤에서부터 해야함
        for (let i = this.entries.length - 1; i >= 0; --i) {
            this.entries[i].clear();
        }
    }
    static New(func: () => void, delayMS: number, count = 0): IntervalUtil {
        return new this(func, delayMS, count);
    }

    private readonly timeout: NodeJS.Timeout;
    private set: boolean = false;

    protected constructor(func: () => void, delayMS: number, private count = 0) {
        this.set = true;
        this.timeout = setInterval(() => {
            if (this.count-- > 0) {
                func();
            }
        }, delayMS);
        IntervalUtil.entries.push(this);
    }

    clear() {
        this.set = false;
        const idx = IntervalUtil.entries.indexOf(this);
        IntervalUtil.entries.splice(idx, 1);
        clearInterval(this.timeout);
    }

    isCleared() {
        return !this.set;
    }
}

events.serverLeave.on(() => {
    IntervalUtil.clearAll();
});

import { Actor } from "bdsx/bds/actor";
import {
    ActorCommandSelector,
    ActorWildcardCommandSelector,
    CommandPermissionLevel,
} from "bdsx/bds/command";
import { command } from "bdsx/command";
import { Event } from "bdsx/eventtarget";
import { CxxString } from "bdsx/nativetype";
import { MCCmd } from "./command";
import { IntervalUtil } from "./interval";

export const FETCH_COMMAND = "fetchentities";
export class EntitiesDetectedEvent {
    static Entries: Record</**identifier */ string, /**selectors */ string> =
        {};
    static register(identifier: string, selectors: string) {
        this.Entries[identifier] = selectors;
    }
    /*
     * Example: fetch("findingAdmins", "@a[tag=admin]")
     */
    static fetch(identifier: string, selector: string) {
        MCCmd.run(`${FETCH_COMMAND} ${identifier} ${selector}`);
    }
    constructor(public identifier: string, public entities: Actor[]) {}
}
IntervalUtil.New(() => {
    for (const id of Object.keys(EntitiesDetectedEvent.Entries)) {
        const selector = EntitiesDetectedEvent.Entries[id];
        MCCmd.run(`${FETCH_COMMAND} ${id} ${selector}`);
    }
}, 200);
export const onEntitiesDetected = new Event<
    (event: EntitiesDetectedEvent) => void
>();
command
    .register(FETCH_COMMAND, FETCH_COMMAND, CommandPermissionLevel.Host)
    .overload(
        (p, o, op) => {
            const entities = p.entities.newResults(o);
            if (entities.length === 0) return;
            onEntitiesDetected.fire(
                new EntitiesDetectedEvent(p.identifier, entities)
            );
        },
        {
            identifier: CxxString,
            entities: ActorWildcardCommandSelector,
        }
    );

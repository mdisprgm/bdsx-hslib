import { events } from "bdsx/event";
import { Event } from "bdsx/eventtarget";
import { bedrockServer } from "bdsx/launcher";

/** maybe not useful for third-parties  */
export const careful = new Event<() => void>();

if (!bedrockServer.isLaunched()) {
    events.serverOpen.on(() => {
        careful.fire();
    });
} else {
    careful.fire();
}

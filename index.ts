import { events } from "bdsx/event";
import { bedrockServer } from "bdsx/launcher";
import { MCCmd } from "./modules/command";
import { MCEntity } from "./modules/entity";
import { fsmgmt } from "./modules/fsmgmt";
import { IntervalUtil } from "./modules/interval";
import { MCScore } from "./modules/scoreboard";
import { Sleep } from "./modules/sleep";

export { MCCmd, MCEntity, fsmgmt, IntervalUtil, MCScore, Sleep };

import careful = require("./careful");
if (!bedrockServer.isLaunched()) {
    events.serverOpen.on(() => {
        careful.careful.fire();
    });
} else {
    careful.careful.fire();
}

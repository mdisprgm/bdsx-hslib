import { Actor } from "bdsx/bds/actor";
import { CommandOrigin } from "bdsx/bds/commandorigin";
import { Player } from "bdsx/bds/player";
import { bedrockServer } from "bdsx/launcher";
import { red } from "colors";
export namespace MCCmd {
    export const run = bedrockServer.executeCommand;
    export const runOnConsole = bedrockServer.executeCommandOnConsole;

    export function getPlayerByEntity(actor: Actor): Player | undefined {
        return actor.isPlayer() ? actor : undefined;
    }

    export function Feedback(str: string, target: Player | undefined) {
        if (target)
            run(`tellraw ${target!.getName()} {"rawtext":[{"text":"${str}"}]}`);
    }

    /**
     * @param origin CommandOrigin
     * @param message string to outputs
     */
    export function dynamicOutputSuccess(
        origin: CommandOrigin,
        message: string
    ): void {
        const actor = origin.getEntity();

        if (actor?.isPlayer()) {
            actor.sendMessage(message);
        } else {
            console.log(message);
        }
    }

    /**
     * @param origin CommandOrigin
     * @param message string to outputs
     */
    export function dynamicOutputError(
        origin: CommandOrigin,
        message: string
    ): void {
        const actor = origin.getEntity();

        if (actor?.isPlayer()) {
            actor.sendMessage("§c" + message);
        } else {
            console.log(red(message));
        }
    }

    export function Log(str: string, prefix = "Feedback") {
        console.log(`[${prefix}]`, str.replace(/§\w{1}/g, ""));
    }
}

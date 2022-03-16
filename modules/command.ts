import { Actor, ActorDamageCause } from "bdsx/bds/actor";
import { CommandEnum, CommandPermissionLevel } from "bdsx/bds/command";
import { CommandOrigin } from "bdsx/bds/commandorigin";
import { Player, PlayerPermission, ServerPlayer } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { bedrockServer } from "bdsx/launcher";
import { red } from "colors";
import { careful } from "../careful";

export namespace MCCmd {
    export const run = bedrockServer.executeCommand;
    export const runOnConsole = bedrockServer.executeCommandOnConsole;

    export function Feedback(target: Player, message: string) {
        if (target && target instanceof ServerPlayer) target.sendMessage(message);
    }

    /**
     * @param origin CommandOrigin
     * @param message string to outputs
     */
    export function dynamicOutputSuccess(origin: CommandOrigin, message: string): void {
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
    export function dynamicOutputError(origin: CommandOrigin, message: string): void {
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

    /**
     *  `연산자`(왕관) 권한을 가졌는가
     * @param player 대상
     * @returns 연산자인지 반환
     */
    export function isOperator(player: Player) {
        return player.getPermissionLevel() === PlayerPermission.OPERATOR;
    }

    const HighCmdPermissions = [CommandPermissionLevel.Operator, CommandPermissionLevel.Admin, CommandPermissionLevel.Host];
    /**
     * 연산자 명령어 권한을 가진 `사용자 지정`일 때도 포함인듯?
     * @param entity 대상
     * @returns 연산자 명령어 사용 권한이 있는지 반환
     */
    export function hasOperatorPermission(entity: Actor) {
        return HighCmdPermissions.includes(entity.getCommandPermissionLevel());
    }

    export namespace enums {
        export let damageCause: CommandEnum<ActorDamageCause>;
    }
}
careful.on(() => {
    MCCmd.enums.damageCause = command.enum("hslib.actor.damage_cause", ActorDamageCause);
});

import { Actor } from "bdsx/bds/actor";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Player } from "bdsx/bds/player";
import { bedrockServer } from "bdsx/launcher";
import { MCCmd } from "./command";

const mc_level = bedrockServer.level;
const mc_scoreboard = mc_level.getScoreboard();

export namespace MCScore {
    export function addObjective(objective: string, trigger: "dummy", displayName?: string) {
        MCCmd.run(`scoreboard objectives add "${objective}" "${trigger}" "${displayName ?? objective}"`);
    }
    export function removeObjective(objective: string) {
        MCCmd.run(`scoreboard objectives remove "${objective}"`);
    }

    export function addScore(entity: Actor, objective: string, amount: number) {
        //점수 추가
        entity.runCommand(`scoreboard players @s add "${objective}" ${amount | 0}`);
    }
    export function removeScore(entity: Actor, objective: string, amount: number) {
        //점수 제거
        entity.runCommand(`scoreboard players @s remove "${objective}" ${amount | 0}`);
    }
    export function setScore(entity: Actor, objective: string, amount: number) {
        //점수 설정
        entity.runCommand(`scoreboard players @s set "${objective}" ${amount | 0}`);
    }
    export function resetScore(entity: Actor, objective: string) {
        //점수 재설정
        entity.runCommand(`scoreboard players @s reset "${objective}"`);
    }

    export function getScoreByNetworkIdSync(targetNetId: NetworkIdentifier, objective: string): number | null {
        const target = targetNetId.getActor();
        if (!target) return null;

        const obj = mc_scoreboard.getObjective(objective);
        if (!obj) return null; //

        const scoreId = mc_scoreboard.getPlayerScoreboardId(target);
        return obj.getPlayerScore(scoreId).value;
    }

    /**
     * @param target target
     * @param objective name of the objective
     * @returns score value of the target
     */
    export function getPlayerScoreSync(target: Player, objective: string): null | number {
        const obj = mc_scoreboard.getObjective(objective);
        if (obj === null) return null;

        const id = mc_scoreboard.getPlayerScoreboardId(target);
        return obj.getPlayerScore(id).value;
    }

    /**
     * @param target target
     * @param objective name of the objective
     * @returns score value of the target
     */
    export function getEntityScoreSync(target: Actor, objective: string): null | number {
        const obj = mc_scoreboard.getObjective(objective);
        if (obj === null) return null;

        const id = mc_scoreboard.getActorScoreboardId(target);
        return obj.getPlayerScore(id).value;
    }

    /**
     * @param target target
     * @param objective name of the objective
     * @returns score value of the target
     */
    export function getFakePlayerScoreSync(target: string, objective: string): null | number {
        const obj = mc_scoreboard.getObjective(objective);
        if (obj === null) return null;

        const id = mc_scoreboard.getFakePlayerScoreboardId(target);
        return obj.getPlayerScore(id).value;
    }
}

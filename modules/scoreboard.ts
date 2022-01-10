import { Actor } from "bdsx/bds/actor";
import { serverInstance } from "bdsx/bds/server";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { ScoreboardId } from "bdsx/bds/scoreboard";
import { MCCmd } from "./command";
import { Player } from "bdsx/bds/player";

const level = serverInstance.minecraft.getLevel();
const scoreboard = level.getScoreboard();

export namespace MCScore {
    export function addScore(
        objective: string,
        player: Player,
        amount: number
    ) {
        //점수 추가
        MCCmd.run(
            `scoreboard players add "${player.getName()}" ${objective} ${amount}`
        );
    }
    export function removeScore(
        objective: string,
        player: Player,
        amount: number
    ) {
        //점수 제거
        MCCmd.run(
            `scoreboard players remove "${player.getName()}" ${objective} ${amount}`
        );
    }
    export function setScore(
        objective: string,
        player: Player,
        amount: number
    ) {
        //점수 설정
        MCCmd.run(
            `scoreboard players set "${player.getName()}" ${objective} ${amount}`
        );
    }
    export function resetScore(objective: string, player: Player) {
        //점수 재설정
        MCCmd.run(
            `scoreboard players set "${player.getName()}" ${objective} 0`
        );
    }

    export function getScoreByActorSync(
        target: Actor,
        objective: string
    ): number | null {
        const obj = scoreboard.getObjective(objective);
        if (!obj) return null;

        let scoreId: ScoreboardId;

        if (target.isPlayer()) {
            scoreId = scoreboard.getPlayerScoreboardId(target);
        } else {
            scoreId = scoreboard.getActorScoreboardId(target);
        }
        return obj.getPlayerScore(scoreId).value;
    }

    export function getScoreByNetworkIdSync(
        targetNetId: NetworkIdentifier,
        objective: string
    ): number | null {
        const target = targetNetId.getActor();
        if (!target) return null;

        const obj = scoreboard.getObjective(objective);
        if (!obj) return null; //

        const scoreId = scoreboard.getPlayerScoreboardId(target);
        return obj.getPlayerScore(scoreId).value;
    }
}

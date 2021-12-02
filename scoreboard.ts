import { Actor } from "bdsx/bds/actor";
import { serverInstance } from "bdsx/bds/server";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { ScoreboardId } from "bdsx/bds/scoreboard";

const level = serverInstance.minecraft.getLevel();
const scoreboard = level.getScoreboard();

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

import { Actor } from "bdsx/bds/actor";
import { serverInstance } from "bdsx/bds/server";
import { Player } from "bdsx/bds/player";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";

export function getScoreByActor(
    target: Actor,
    objective: string
): null | number {
    const level = serverInstance.minecraft.getLevel();
    const score = level.getScoreboard();
    const obj = score.getObjective(objective);
    if (!obj) return null;

    const id = score.getPlayerScoreboardId(target as Player);
    return obj.getPlayerScore(id).value;
}

export function getScoreByNetworkId(
    targetNetworkID: NetworkIdentifier,
    objective: string
): null | number {
    const target = targetNetworkID.getActor();

    const level = serverInstance.minecraft.getLevel();
    const score = level.getScoreboard();
    const obj = score.getObjective(objective);
    if (!obj) return null; //

    const id = score.getPlayerScoreboardId(target as Player);
    return obj.getPlayerScore(id).value;
}
/*
const level = serverInstance.minecraft.getLevel()!;
const players = level.players!;
const countOfPlayers = level.getActivePlayerCount()!;

const interval = setInterval(() => {
  for (let i = 0; i < countOfPlayers; i++) {
    if (getScoreByActor(players.get(i), "test__") == 1) {
      let level = serverInstance.minecraft.getLevel();
      let score = level.getScoreboard();
      let id = score.getPlayerScoreboardId(players.get(i));
      //get Id

      let info = new ScorePacketInfo();
      info.objectiveName = "test__";
      info.scoreboardId = id;
      info.score = 0;
      info.type = ScorePacketInfo.Type.PLAYER;

      const pkt = SetScorePacket.create();
      pkt.entries.push(info);
      pkt.type = SetScorePacket.Type.CHANGE;
      pkt.sendTo(players.get(i).getNetworkIdentifier());
      pkt.dispose();
    }
  }
}, 100);
events.serverStop.on(() =>{
  clearInterval(interval);
});
*/

//if player's nametag is changed, command requires changed nametag (not xbox gamertag)
//but this matches player's nametag to real gamertag
import { serverInstance } from "bdsx/bds/server";
import { events } from "bdsx/event";
import { MinecraftPacketIds } from "bdsx/bds/packetids";

events.packetBefore(MinecraftPacketIds.CommandRequest).on((pkt) => {
    const players = serverInstance.getPlayers();
    for (const t of players) {
        const identity = t.getCertificate().getId();
        const name = t.getName();
        if (identity === name) return;
        while (pkt.command.includes(identity)) {
            pkt.command = pkt.command.replace(identity, name);
        }
    }
});

export function matchTargetsName(command: string): string {
    const players = serverInstance.getPlayers();
    for (const t of players) {
        const identity = t.getCertificate().getId();
        const name = t.getName();
        if (identity !== name) {
            while (command.includes(identity)) {
                command = command.replace(identity, name);
            }
        }
    }
    return command;
}

import { Actor, ActorDefinitionIdentifier, ActorType } from "bdsx/bds/actor";
import { BlockSource } from "bdsx/bds/block";
import { Vec3 } from "bdsx/bds/blockpos";
import { ListTag, StringTag } from "bdsx/bds/nbt";
import { procHacker } from "bdsx/bds/proc";
import { AllocatedPointer, StaticPointer, VoidPointer } from "bdsx/core";

export const spawnEntityAt = procHacker.js(
    "CommandUtils::spawnEntityAt",
    Actor,
    null,
    BlockSource,
    Vec3,
    ActorDefinitionIdentifier,
    StaticPointer,
    VoidPointer
);

export namespace MCEntity {
    export function getTags<T extends Actor>(entity: T): string[] {
        const fullTag = entity.allocateAndSave();
        const listTag = fullTag.get<ListTag<StringTag>>("Tags");
        const list = listTag?.data.toArray().map((v) => v.data);
        fullTag.dispose();
        return list ?? [];
    }
    export function getUniqueIdTag<T extends Actor>(entity: T): string {
        return `uniqueId${entity.getUniqueIdHigh()}-${entity.getUniqueIdLow()}`;
    }
    export function spawnAt(
        region: BlockSource,
        pos: Vec3,
        entityIdentifier: EntityId | string,
        summoner?: Actor
    ): Actor {
        if (!entityIdentifier.includes(":"))
            entityIdentifier = "minecraft:" + entityIdentifier;
        const type = ActorDefinitionIdentifier.constructWith(ActorType.Mob);

        type.fullName = entityIdentifier;

        const splitted = entityIdentifier.split(":");
        type.namespace = splitted[0];
        type.identifier = splitted[1];

        type.canonicalName.str = entityIdentifier;
        type.canonicalName.recentCompared = null;

        const id = Math.floor(Math.random() * 0xffffffff) + 1;
        const ptr = new AllocatedPointer(8);
        ptr.setUint64WithFloat(id);
        return spawnEntityAt(
            region,
            pos,
            type,
            ptr,
            summoner ?? new VoidPointer()
        );
    }
}

import { Actor, ActorDefinitionIdentifier } from "bdsx/bds/actor";
import { BlockSource } from "bdsx/bds/block";
import { Vec3 } from "bdsx/bds/blockpos";
import { Spawner } from "bdsx/bds/level";
import { ListTag, StringTag } from "bdsx/bds/nbt";
import { procHacker } from "bdsx/bds/proc";
import { serverInstance } from "bdsx/bds/server";
import { AllocatedPointer, VoidPointer } from "bdsx/core";
import { bool_t } from "bdsx/nativetype";

const Spawner$spawnMob = procHacker.js(
    "Spawner::spawnMob",
    Actor,
    null,
    Spawner,
    BlockSource,
    ActorDefinitionIdentifier,
    VoidPointer,
    Vec3,
    bool_t,
    bool_t,
    bool_t
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
        naturalSpawn = false,
        surface = true,
        fromSpawner = false
    ): Actor | null {
        if (!entityIdentifier.includes(":"))
            entityIdentifier = "minecraft:" + entityIdentifier;
        const defId = ActorDefinitionIdentifier.constructWith(entityIdentifier);

        const uniqueId = Math.floor(Math.random() * 0xffffffff) + 1;

        const ptr = new AllocatedPointer(8);
        ptr.setUint64WithFloat(uniqueId);
        const entity = spawnMob(
            region,
            defId,
            pos,
            naturalSpawn,
            surface,
            fromSpawner
        );
        defId.destruct();
        return entity;
    }

    export function spawnMob(
        region: BlockSource,
        id: ActorDefinitionIdentifier,
        pos: Vec3,
        naturalSpawn = false,
        surface = true,
        fromSpawner = false
    ): Actor | null {
        return Spawner$spawnMob(
            serverInstance.minecraft.getLevel().getSpawner(),
            region,
            id,
            new VoidPointer(),
            pos,
            naturalSpawn,
            surface,
            fromSpawner
        );
    }
}

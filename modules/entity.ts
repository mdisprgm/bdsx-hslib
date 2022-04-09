import { Actor, ActorDefinitionIdentifier } from "bdsx/bds/actor";
import { BlockSource } from "bdsx/bds/block";
import { Vec3 } from "bdsx/bds/blockpos";
import { Spawner } from "bdsx/bds/level";
import { procHacker } from "bdsx/bds/proc";
import { VoidPointer } from "bdsx/core";
import { bedrockServer } from "bdsx/launcher";
import { bool_t } from "bdsx/nativetype";

const Spawner$spawnMob = procHacker.js("Spawner::spawnMob", Actor, null, Spawner, BlockSource, ActorDefinitionIdentifier, VoidPointer, Vec3, bool_t, bool_t, bool_t);

export namespace MCEntity {
    /**
     * @deprecated Use {@link Actor.getTags} directly
     */
    export function getTags<T extends Actor>(entity: T): string[] {
        return entity.getTags();
    }
    export function getUniqueIdTag<T extends Actor>(entity: T): string {
        return `uniqueId${entity.getUniqueIdHigh()}-${entity.getUniqueIdLow()}`;
    }

    export function spawnMob(region: BlockSource, entityIdentifier: EntityId, summoner:Actor|null, pos: Vec3, naturalSpawn?: boolean, surface?: boolean, fromSpawner?: boolean): Actor | null;
    export function spawnMob(region: BlockSource, entityIdentifier: string, summoner:Actor|null, pos: Vec3, naturalSpawn?: boolean, surface?: boolean, fromSpawner?: boolean): Actor | null;
    export function spawnMob(region: BlockSource, entityIdentifier: ActorDefinitionIdentifier, summoner:Actor|null, pos: Vec3, naturalSpawn?: boolean, surface?: boolean, fromSpawner?: boolean): Actor | null;
    export function spawnMob(region: BlockSource, entityIdentifier: string | ActorDefinitionIdentifier, summoner:Actor|null, pos: Vec3, naturalSpawn = false, surface = true, fromSpawner = false): Actor | null {
        const isDefinitionId = entityIdentifier instanceof ActorDefinitionIdentifier;
        const defId = isDefinitionId ? entityIdentifier : ActorDefinitionIdentifier.constructWith(entityIdentifier);

        const entity = _spawnMob(region, defId, summoner, pos, naturalSpawn, surface, fromSpawner);
        if (!isDefinitionId) defId.destruct();
        return entity;
    }

    function _spawnMob(region: BlockSource, id: ActorDefinitionIdentifier, summoner: Actor|null, pos: Vec3, naturalSpawn = false, surface = true, fromSpawner = false): Actor | null {
        return Spawner$spawnMob(bedrockServer.level.getSpawner(), region, id, summoner, pos, naturalSpawn, surface, fromSpawner);
    }
}

import { UNDNAME_NAME_ONLY } from "bdsx/dbghelp";
import { procHacker } from "bdsx/bds/proc";
import { ProcHacker } from "bdsx/prochacker";
import { bool_t, void_t, int32_t } from "bdsx/nativetype";
import { Actor } from "bdsx/bds/actor";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Event } from "bdsx/eventtarget";
import { Player } from "bdsx/bds/player";

const hacker = ProcHacker.load(
    "hacker.ini",
    ["Actor::calculateAttackDamage", "Mob::swing"],
    UNDNAME_NAME_ONLY
);

const onSneakingSwitched = new Event<
    (actor: Actor, sneaking: boolean) => void
>();

const oldSneaks = new Map<NetworkIdentifier, boolean>();

const setSneaking = procHacker.hooking(
    "Actor::setSneaking",
    void_t,
    null,
    Actor,
    bool_t
)((self, sneaking) => {
    setSneaking(self, sneaking);
    const ni = self.getNetworkIdentifier();
    const old = oldSneaks.get(ni);
    if (old === undefined) return;
    if (old !== sneaking) {
        onSneakingSwitched.fire(self, sneaking);
        oldSneaks.set(ni, sneaking);
    }
});

const Actor$calculateAttackDamage = hacker.hooking(
    "Actor::calculateAttackDamage",
    int32_t,
    null,
    Actor,
    Actor
)((self, target) => {
    const damage = Actor$calculateAttackDamage(self, target);
    entityAttackWithDamage.fire(
        new EntityAttackWithDamageEvent(self, target, damage)
    );
    return damage;
});
class EntityAttackWithDamageEvent {
    constructor(
        public attacker: Actor,
        public victim: Actor,
        public damage: number
    ) {}
}
export const entityAttackWithDamage = new Event<
    (event: EntityAttackWithDamageEvent) => void
    >();


import { Actor } from "bdsx/bds/actor";
import { Event } from "bdsx/eventtarget";
import { int32_t } from "bdsx/nativetype";
import { procHacker } from "bdsx/prochacker";

const Actor$calculateAttackDamage = procHacker.hooking(
    "?calculateAttackDamage@Actor@@QEAAMAEAV1@@Z",
    int32_t,
    null,
    Actor,
    Actor,
)((self, target) => {
    const damage = Actor$calculateAttackDamage(self, target);
    entityAttackWithDamage.fire(new EntityAttackWithDamageEvent(self, target, damage));
    return damage;
});
class EntityAttackWithDamageEvent {
    constructor(public attacker: Actor, public victim: Actor, public damage: number) {}
}
export const entityAttackWithDamage = new Event<(event: EntityAttackWithDamageEvent) => void>();

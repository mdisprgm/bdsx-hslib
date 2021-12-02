import { procHacker } from "bdsx/bds/proc";
import { bool_t, void_t } from "bdsx/nativetype";
import { Actor } from "bdsx/bds/actor";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { Event } from "bdsx/eventtarget";

const onSneakingToggled = new Event<
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
        oldSneaks.set(ni, sneaking);
        console.log("Toggled:", self.getName());
    }
});

export const admin: string = "§l§eAdmin§r";
export const mdisprgm: string = "mdisprgm";

export function isHost(name: string) {
    return name === mdisprgm || name === admin;
}
export function isNotHost(name: string) {
    return name !== mdisprgm && name !== admin;
}

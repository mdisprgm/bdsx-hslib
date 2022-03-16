import { Event } from "bdsx/eventtarget";

/** maybe not useful for third-parties  */
export const careful = new Event<() => void>();

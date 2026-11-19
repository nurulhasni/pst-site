import { useSyncExternalStore } from "react";

// False on the server and while React is still attaching to server-rendered
// HTML; true afterwards. Admin forms keep their dropdowns and Save button
// disabled until then, because React resets a <select> to its default when it
// attaches, silently undoing a choice made on a slow first load.
const subscribe = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

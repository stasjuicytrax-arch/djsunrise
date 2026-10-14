// One video with sound at a time: whoever starts sound announces itself,
// everyone else with sound on mutes (and goes back to its silent loop).
const EVENT = "sunrise:sound";

export function announceSound(id: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: id }));
}

export function onOtherSound(myId: string, handler: () => void) {
  const fn = (e: Event) => {
    if ((e as CustomEvent<string>).detail !== myId) handler();
  };
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}

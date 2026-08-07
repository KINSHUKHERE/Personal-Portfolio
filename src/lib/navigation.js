/**
 * Client-side navigation for the hand-rolled router in App.jsx.
 *
 * Lives outside App so components deep in the tree can navigate without
 * importing App (which imports them - a cycle).
 */
export function navigate(path) {
  if (window.location.pathname === path) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

/** Use on an <a> so it stays a real link (middle-click, open-in-new-tab) but
 *  navigates client-side on a plain left click. */
export function linkHandler(path) {
  return (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(path);
  };
}

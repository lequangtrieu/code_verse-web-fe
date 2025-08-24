import { useEffect } from "react";
import { useBeforeUnload, useBlocker } from "react-router-dom";

export function useUnsavedChanges( hasUnsaved ) {

  useBeforeUnload(
    hasUnsaved
      ? (e) => {
          e.preventDefault();
          e.returnValue = "";
        }
      : null
  );

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsaved && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave this page?"
      );
      if (confirmLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);
}

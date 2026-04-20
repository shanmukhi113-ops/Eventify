import { useContext } from "react";
import { EventContext } from "../context/EventContext";

export function useEvents() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvents must be inside EventProvider");
  return ctx;
}
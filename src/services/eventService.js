import {
  collection, addDoc, getDocs, getDoc,
  doc, updateDoc, deleteDoc, query,
  where, orderBy, arrayUnion, arrayRemove,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const eventsRef = collection(db, "events");

// CREATE
export const createEvent = async (data, userId) => {
  const docRef = await addDoc(eventsRef, {
    ...data,
    createdBy: userId,
    createdAt: serverTimestamp(),
    attendees: [],
    attendeeCount: 0,
  });
  return docRef.id;
};

// READ ALL (with optional category filter)
export const getEvents = async (category = null) => {
  let q = category
    ? query(eventsRef, where("category", "==", category), orderBy("date"))
    : query(eventsRef, orderBy("date"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// READ ONE
export const getEvent = async (id) => {
  const snap = await getDoc(doc(db, "events", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// UPDATE
export const updateEvent = async (id, data) =>
  updateDoc(doc(db, "events", id), data);

// DELETE
export const deleteEvent = async (id) =>
  deleteDoc(doc(db, "events", id));

// RSVP toggle
export const toggleRSVP = async (eventId, userId, isAttending) => {
  const ref = doc(db, "events", eventId);
  await updateDoc(ref, {
    attendees: isAttending ? arrayRemove(userId) : arrayUnion(userId),
    attendeeCount: isAttending ? increment(-1) : increment(1),
  });
};

// Get events by user
export const getUserEvents = async (userId) => {
  const q = query(eventsRef, where("createdBy", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
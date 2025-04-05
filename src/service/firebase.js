// src/firebaseNotes.js
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// Helper to get user-specific notes collection
const getUserNotesCollection = (userId) =>
  collection(db, "notes", userId, "userNotes");

// Add a note for a specific user
export const addNote = async (note, userId) => {
  const userNotesRef = getUserNotesCollection(userId);
  const docRef = await addDoc(userNotesRef, note);
  return docRef.id;
};

// Get all notes for a specific user
export const getAllNotes = async (userId) => {
  const userNotesRef = getUserNotesCollection(userId);
  const q = query(userNotesRef, orderBy("timestamp", "desc")); // newest first
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Delete a note for a specific user
export const deleteNote = async (userId, noteId) => {
  const noteRef = doc(db, "notes", userId, "userNotes", noteId);
  await deleteDoc(noteRef);
};

// Update a note for a specific user
export const updateNote = async (userId, noteId, updatedNote) => {
  const noteRef = doc(db, "notes", userId, "userNotes", noteId);
  await updateDoc(noteRef, updatedNote);
};

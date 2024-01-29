import db from "./config";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";

export async function getListName(
  id: string,
  setListName: (name: string) => void
) {
  const docRef = doc(db, "lists", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setListName(docSnap.data().name);
  } else {
    console.log("No such document!");
  }
}

export async function subscribeToListItems(
  id: string,
  setListItems: (
    lists: { id: string; text: string; completed: boolean }[]
  ) => void
) {
  const docRefLists = collection(db, `lists/${id}/tasks`);
  const unsubscribe = onSnapshot(docRefLists, (querySnapshot) => {
    const listItems = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,
        completed: data.completed,
      };
    });
    setListItems(listItems);
  });
  return () => {
    unsubscribe();
  };
}

export async function subscribeToCollections(
  setLists: (lists: { name: string; id: string }[]) => void
) {
  const docRefLists = collection(db, `lists`);
  const unsubscribe = onSnapshot(docRefLists, (querySnapshot) => {
    const lists = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        name: data.name,
        id: doc.id,
      };
    });
    setLists(lists);
  });
  return () => {
    unsubscribe();
  };
}

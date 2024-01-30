import db from "./config";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  query,
  getDocs,
} from "firebase/firestore";

export async function getFirstListID() {
  const q = query(collection(db, "lists"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs[0].id;
}

export async function addTaskToList(listID: string, text: string) {
  await addDoc(collection(db, `lists/${listID}/tasks`), {
    text: text,
    completed: false,
  });
}

export async function deleteTaskFromList(listID: string, itemID: string) {
  await deleteDoc(doc(db, `lists/${listID}/tasks/${itemID}`));
}

export async function getListName(
  listID: string,
  setListName: (name: string) => void
) {
  const docRef = doc(db, "lists", listID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setListName(docSnap.data().name);
  } else {
    console.log("No such document!");
  }
}

export async function toggleListItem(listID: string, itemID: string) {
  const docRefListItem = doc(db, `lists/${listID}/tasks/${itemID}`);
  const docSnap = await getDoc(docRefListItem);

  if (docSnap.exists()) {
    await updateDoc(docRefListItem, {
      completed: !docSnap.data().completed,
    });
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

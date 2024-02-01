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
  serverTimestamp,
  Timestamp,
  orderBy,
} from "firebase/firestore";

export async function deleteCollection(listID: string) {
  const querySnapshot = await getDocs(collection(db, `lists/${listID}/tasks`));
  querySnapshot.forEach(async (item) => {
    await deleteDoc(doc(db, `lists/${listID}/tasks/${item.id}`));
  });
  await deleteDoc(doc(db, `lists/${listID}`));
}

export async function addCollection(inputName: string) {
  const ref = await addDoc(collection(db, `lists`), {
    name: inputName,
    sort: serverTimestamp(),
  });
  return ref.id;
}

export async function getFirstListID() {
  const q = query(collection(db, "lists"), orderBy("sort"));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length < 1) {
    return undefined;
  }
  return querySnapshot.docs[0].id;
}

export async function addTaskToList(listID: string, text: string) {
  const ref = await addDoc(collection(db, `lists/${listID}/tasks`), {
    text: text,
    completed: false,
    sort: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteTaskFromList(listID: string, itemID: string) {
  await deleteDoc(doc(db, `lists/${listID}/tasks/${itemID}`));
}

export async function getListName(
  listID: string,
  setListName: (name: string) => void,
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
    lists: { id: string; text: string; completed: boolean }[],
  ) => void,
) {
  const docRefLists = query(
    collection(db, `lists/${id}/tasks`),
    orderBy("sort"),
  );
  const unsubscribe = onSnapshot(docRefLists, (querySnapshot) => {
    const listItems = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,
        completed: data.completed,
        sort: data.sort,
      };
    });
    setListItems(listItems);
  });
  return () => {
    unsubscribe();
  };
}

export async function subscribeToCollections(
  setLists: (lists: { id: string; name: string; sort: Timestamp }[]) => void,
) {
  const docRefLists = query(collection(db, `lists`), orderBy("sort"));
  const unsubscribe = onSnapshot(docRefLists, (querySnapshot) => {
    const lists = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        sort: data.sort,
      };
    });
    setLists(lists);
  });
  return () => {
    unsubscribe();
  };
}

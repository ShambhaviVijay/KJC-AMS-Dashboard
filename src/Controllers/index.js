import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, getDocs, updateDoc, doc, deleteDoc , getDoc , writeBatch, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDiGHXxdZmxp_XgcZhGK6H4dqtzpzFIXYk",
    authDomain: "attendance-app-729e7.firebaseapp.com",
    projectId: "attendance-app-729e7",
    storageBucket: "attendance-app-729e7.appspot.com",
    messagingSenderId: "199120866837",
    appId: "1:199120866837:web:7156ccaeafa706e0e4481c",
    measurementId: "G-MN5K0H92P6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function createDocument(name,payload) {
    try {
        const newDocRef = await addDoc(collection(db, name), payload);
        return newDocRef
    } catch (error) {
        console.error('Error creating document:', error);
    }
}

async function createDocumentWithCustomId(name, documentId, data) {
    try {
      const docRef = doc(db, name, documentId);
      await setDoc(docRef, data);
    } catch (error) {
      console.error("Error adding document:", error);
    }
}

async function searchDocuments(collectionName, searchItem, searchData){
    try {
        const searchQuery = query(collection(db, collectionName), where(searchItem, "==", searchData));
        const searchResult = await getDocs(searchQuery)
        return searchResult;
    } catch (error) {
        console.error('Error reading documents:', error);
        return [];
    }
}

async function readDocuments(name) {
    try {
        const querySnapshot = await getDocs(collection(db, name));
        const dataArray = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return dataArray;
    } catch (error) {
        console.error('Error reading documents:', error);
        return [];
    }
}

async function readSingleDocument({collectionName, documentId, subCollectionName, subDocumentId}) {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            data.id = docSnapshot.id;

            if (subCollectionName) {
                const subCollectionRef = collection(docRef, subCollectionName);
                const subCollectionSnapshot = await getDocs(subCollectionRef);
                if(subDocumentId){
                    const subData = await getDoc(doc(subCollectionSnapshot, subDocumentId))
                    return subData
                }
                const subCollectionDataArray = [];
                subCollectionSnapshot.forEach((subDoc) => {
                    const subData = subDoc.data();
                    subData.id = subDoc.id;
                    subCollectionDataArray.push(subData);
                });
                data[subCollectionName] = subCollectionDataArray;
            }

            return data;
        } else {
            console.error(`Document ${documentId} does not exist in ${collectionName} collection`);
            return null;
        }
    } catch (error) {
        console.error(`Error reading document ${documentId} from ${collectionName} collection:`, error);
        return null;
    }
}

const getDocRef = async (collectionName, documentId, subCollectionName, subDocId) => {
    try {
      let docRef = doc(db, collectionName, documentId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()){
        if (subCollectionName){
            const subCollectionRef = collection(docRef, subCollectionName);
            docRef = doc(subCollectionRef, subDocId);
        }
        return docRef
      }else {
        console.error(`Document ${documentId} does not exist in ${collectionName} collection`);
        return null;
        }
    } catch (error) {
        console.error(`Error reading document ${documentId} from ${collectionName} collection:`, error);
        return null;
    }
}


async function updateDocument(name, docId, data) {
    try {
        const docRef = doc(db, name, docId);
        await updateDoc(docRef, data);
        console.log("Document updated successfully");
    } catch (error) {
        console.error('Error updating document:', error);
    }
}

async function updateDocumentAndSubCollection(docId, name, subCollection, subDataArray) {
    try {
        const docRef = doc(db, name, docId);
        const subCollectionRef = collection(docRef, subCollection);
        const subDocsSnapshot = await getDocs(subCollectionRef);
        const batch = writeBatch(db);
        subDocsSnapshot.forEach((subDoc) => {
            batch.delete(subDoc.ref);
        });
        subDataArray.forEach((subData) => {
            const subDocRef = doc(subCollectionRef);
            batch.set(subDocRef, subData);
        });
        await batch.commit();
        return 'Document and sub-collection updated successfully';
    } catch (error) {
        console.error('Error updating document and sub-collection:', error);
    }
}


async function deleteDocument(docId,collection) {
    try {
        const docRef = doc(db, collection, docId);
        await deleteDoc(docRef);
        return 'Document deleted successfully'
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}

async function uploadFile(file, path) {
    try {
      const fileRef = ref(storage, path + '/' + file.name);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

export {
    createDocument,
    readDocuments,
    searchDocuments,
    updateDocument,
    deleteDocument,
    uploadFile,
    readSingleDocument,
    updateDocumentAndSubCollection,
    getDocRef,
    createDocumentWithCustomId
}

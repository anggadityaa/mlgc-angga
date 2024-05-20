const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore();

const getHistoriesFromFirestore = async () => {
    try {
        const historiesSnapshot = await firestore.collection('predictions').get();
        const histories = [];
        historiesSnapshot.forEach(doc => {
            histories.push({ id: doc.id, ...doc.data() });
        });
        return histories;
    } catch (error) {
        console.error('Error fetching prediction histories:', error);
        throw error;
    }
};


async function storeData(id, data) {
  const db = new Firestore();

  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
}

module.exports = {getHistoriesFromFirestore, storeData};


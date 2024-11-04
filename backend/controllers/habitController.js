const { db } = require("../config/firebase");

exports.createHabit = async (req, res) => {
  try {
    console.log(req.body.habits);
    const habitData = req.body.habits;
    const userID = req.body.id;
    const habitRef = await db.collection("users").doc(`${userID}`);
    const doc = await habitRef.get();
    if (doc.exists) {
      let data = doc.data();
      let mergeData = { ...data, habits: [...data.habits, ...habitData] };
      habitRef.set(mergeData);
      const updatedDoc = await habitRef.get();
      res.status(201).send({ habits: updatedDoc.data().habits });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getHabits = async (req, res) => {
  try {
    const userID = req.params.email;
    const habitRef = await db.collection("users").doc(`${userID}`);
    const doc = await habitRef.get();
    if (doc.exists) {
      let data = doc.data();
      res.status(201).send({ habits: data.habits });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

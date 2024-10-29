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
      let mergeData = { ...data, habits: [...habitData] };
      habitRef.set(mergeData);
    }
    res.status(201).send({ id: habitRef.id });
  } catch (error) {
    res.status(500).send(error);
  }
};

const { db } = require("../config/firebase");

exports.createHabit = async (req, res) => {
  try {
    const habitData = req.body.habit;
    const habitRef = await db.collection("users").doc(`${habitData.email}`);
    const doc = await habitRef.get();
    !doc.exists && (await habitRef.set(userData));
    res.status(201).send({ id: habitRef.id });
  } catch (error) {
    res.status(500).send(error);
  }
};

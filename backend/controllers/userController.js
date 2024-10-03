const { db } = require("../config/firebase");

exports.createUser = async (req, res) => {
  try {
    const userData = req.body.user;
    const userRef = await db.collection("users").doc(`${userData.email}`);
    const doc = await userRef.get();
    !doc.exists && (await userRef.set(userData));
    res.status(201).send({ id: userRef.id });
  } catch (error) {
    res.status(500).send(error);
  }
};

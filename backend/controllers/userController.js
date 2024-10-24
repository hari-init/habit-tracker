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
exports.getUser = async (req, res) => {
  try {
    const email = req.params.email;

    const userRef = db.collection("users").doc(email);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404).send({ message: "User not found" });
    }
    const userData = doc.data();
    res.status(200).send({ user: userData });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving user", error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { user } = req.body;
    const userRef = db.collection("users").doc(email);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404).send({ message: "User not found" });
    }
    // Update the user document with the new data
    await userRef.update(user);
    const updatedDoc = await userRef.get();
    const updatedUserData = updatedDoc.data();
    res
      .status(200)
      .send({ message: "User updated successfully", user: updatedUserData });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating user", error: error.message });
  }
};

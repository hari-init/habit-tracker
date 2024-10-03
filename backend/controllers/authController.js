const { admin } = require("../config/firebase");

exports.authCheck = async (req, res) => {
  const idToken = req?.headers?.authorization;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    res.status(200).json({ message: "Node:Authentication successful", uid });
  } catch (error) {
    console.error("Node:Error verifying token:", error);
    res.status(401).json({ message: "Node:Unauthorized" });
  }
};

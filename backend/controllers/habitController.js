const { db } = require("../config/firebase");

exports.createHabit = async (req, res) => {
  try {
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

exports.updateHabit = async (req, res) => {
  try {
    const { userID, habitIndex, rewardPoints = 5 } = req.body; 
    const userRef = db.collection("users").doc(userID);
    const doc = await userRef.get();

    if (doc.exists) {
      const userData = doc.data();
      const habits = userData.habits || [];
      if (habitIndex >= 0 && habitIndex < habits.length) {
        const currentHabit = habits[habitIndex];
        if (!Array.isArray(currentHabit.checkIns)) {
          currentHabit.checkIns = [];
        }
        const today = new Date();
        currentHabit.checkIns.push({
          date: today.toISOString(),
          value: true,
        });
        currentHabit.checkIns.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        let streak = 1; 
        for (let i = currentHabit.checkIns.length - 1; i > 0; i--) {
          const currentDate = new Date(currentHabit.checkIns[i].date);
          const previousDate = new Date(currentHabit.checkIns[i - 1].date);

          // Calculate the difference in days between consecutive check-ins
          const diffInTime = currentDate - previousDate;
          const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

          // Check if the current check-in is exactly one day after the previous
          if (diffInDays === 1 && currentHabit.checkIns[i - 1].value) {
            streak++;
          } else {
            break; 
          }
        }
        // Update streak and mark habit as completed for today
        currentHabit.streak = streak;
        currentHabit.isCompleted = true;

        // Update user's reward points
        const updatedPoints = (userData.points || 0) + rewardPoints;

        // Save the updated habits and points back to Firestore
        await userRef.update({
          habits,
          points: updatedPoints,
        });

        res.status(200).send({
          message: "Habit check-in updated successfully",
          habits,
          points: updatedPoints,
        });
      } else {
        res.status(400).send({ message: "Invalid habit index" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

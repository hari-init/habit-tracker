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
        // Ensure `checkIns` is initialized as an array
        if (!Array.isArray(currentHabit.checkIns)) {
          currentHabit.checkIns = [];
        }
        const today = new Date();
        const todayISO = today.toISOString();
        // Check-in logic
        currentHabit.checkIns.push({ date: todayISO, value: true });
        currentHabit.checkIns.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        // Calculate streak
        let streak = 1; // Start with the most recent check-in
        for (let i = currentHabit.checkIns.length - 1; i > 0; i--) {
          const currentDate = new Date(currentHabit.checkIns[i].date);
          const previousDate = new Date(currentHabit.checkIns[i - 1].date);

          // Difference in days between consecutive check-ins
          const diffInDays =
            (currentDate - previousDate) / (1000 * 60 * 60 * 24);

          if (diffInDays === 1 && currentHabit.checkIns[i - 1].value) {
            streak++;
          } else {
            break; // Streak is interrupted
          }
        }
        const habitStartDate = new Date(currentHabit.checkIns[0].date);
        const totalDays = Math.max(
          Math.ceil((today - habitStartDate) / (1000 * 60 * 60 * 24)),
          1 // Ensure at least 1 day is counted
        );
        const totalCheckIns = currentHabit.checkIns.filter(
          (checkIn) => checkIn.value
        ).length;
        const consistency = Math.round((totalCheckIns / totalDays) * 100);
        currentHabit.streak = streak;
        currentHabit.consistency = consistency;

        // Update user's reward points
        const updatedPoints = (userData.points || 0) + rewardPoints;

        // Save updated habits and points to Firestore
        await userRef.update({
          habits,
          points: updatedPoints,
        });

        res.status(200).send({
          message: "Habit updated successfully",
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
    res.status(500).send({ error: error.message });
  }
};
exports.updateHabitPoints = async (req, res) => {
  try {
    const { userID, points } = req.body;
    const userRef = db.collection("users").doc(userID);
    const doc = await userRef.get();

    if (doc.exists) {
      const userData = doc.data();
      const currentPoints = userData.points || 0;
      const updatedPoints = Math.max(currentPoints - points, 0); // Subtract points for reduction

      await userRef.update({ points: updatedPoints });

      res.status(200).send({ points: updatedPoints });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

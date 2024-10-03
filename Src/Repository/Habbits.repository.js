import { habbitmodel } from "../Schemas/habbits.schema.js";

// Repository class for managing habit data operations
export class habbitRepositroy {
  // Method to get the last 7 days with a default status of false
  getLast7Days() {
    const today = new Date();
    const weekStatus = [];

    // Loop through the last 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i); // Subtracting 'i' days from today
      weekStatus.push({ date, status: false }); // Adding each day with a default status
    }
    return weekStatus.reverse(); // Reverse to keep the most recent date first
  }

  // Method to create a new habit
  async CreateHabbit(habitName, habitDescription) {
    try {
      // Create a new habit document with provided name and description
      const habbits = new habbitmodel({
        Title: habitName,
        descprition: habitDescription,
        createdOn: new Date(),
        weekStatus: this.getLast7Days().map((day) => ({
          date: day.date, // Date of the habit
          status: false,   // Default status for the week
        })),
      });
      // Save the habit to the database
      await habbits.save();
      return habbits; // Return the saved habit
    } catch (err) {
      // Log a descriptive error message
      console.error("Error saving habit:", err);
      throw new Error("Failed to create habit."); // Throw an error to indicate failure
    }
  }

  // Method to delete a habit by ID
  async deleteHabbit(id) {
    try {
      // Attempt to delete the habit from the database
      const isDeleted = await habbitmodel.deleteOne({ _id: id });
      if (isDeleted) {
        return isDeleted; // Return deletion result
      } else {
        return null; // Return null if deletion was not successful
      }
    } catch (err) {
      // Log any errors that occur during deletion
      console.log(err);
    }
  }

  // Method to retrieve all habits from the database
  async DisplayHabbits() {
    try {
      const habbits = await habbitmodel.find(); // Fetch all habits
      return habbits; // Return the list of habits
    } catch (err) {
      // Log any errors that occur during fetching
      console.log(err);
    }
  }

  // Method to update an existing habit by ID
  async modifyhabbit(id, UpdatedTitle, updateddecprition) {
    try {
      // Update the habit's title and description
      const isUpdated = await habbitmodel.updateMany(
        { _id: id },
        { $set: { Title: UpdatedTitle, descprition: updateddecprition } }
      );

      if (isUpdated) {
        return isUpdated; // Return update result
      } else {
        return null; // Return null if update was not successful
      }
    } catch (err) {
      // Log any errors that occur during updating
      console.log(err);
    }
  }

  // Method to find a specific habit by ID
  async findTheHabbit(id) {
    try {
      // Attempt to find the habit by its ID
      const Habit = await habbitmodel.findById(id);
      if (Habit) {
        return Habit; // Return the found habit
      } else {
        return null; // Return null if no habit was found
      }
    } catch (err) {
      // Log any errors that occur during the search
      console.log(err);
    }
  }
}

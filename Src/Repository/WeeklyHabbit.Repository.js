import { habbitmodel } from "../Schemas/habbits.schema.js";

// Repository class for managing weekly habit data operations
export class WeeklyHabbitRepositroy {
  // Method to get the status of habits for the last seven days
  async getSevenDaysStatus() {
    try {
      const today = new Date();
      const previousDates = [];

      // Get the previous 7 days' dates
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i); // Subtracting 'i' days from today
        date.setHours(0, 0, 0, 0); // Reset time for accurate comparison

        // Push formatted date information into previousDates array
        previousDates.push({
          date: date.getDate(), // Day of the month
          month: date.getMonth() + 1, // Month (1-indexed)
          dayOfWeek: date.toLocaleDateString("en-US", { weekday: "short" }), // Short format for the day of the week
        });
      }

      // Fetch all habits from the database
      const habits = await habbitmodel.find();

      // Map through each habit and format weekStatus for the last 7 days
      const filteredHabits = habits.map((habit) => {
        const recentStatus = previousDates.map((dateObj) => {
          // Find the status for each date in the habit's weekStatus
          const matchingDay = habit.weekStatus.find((day) => {
            const dayDate = new Date(day.date); // Ensure day.date is correctly formatted in the DB
            dayDate.setHours(0, 0, 0, 0); // Reset time for accurate comparison

            // Compare date and month
            return (
              dayDate.getDate() === dateObj.date &&
              dayDate.getMonth() + 1 === dateObj.month
            );
          });

          // Return formatted status information
          return {
            date: `${dateObj.dayOfWeek} - ${dateObj.date}/${dateObj.month}`, // Formatted date string
            status: matchingDay ? matchingDay.status : null, // null if no status for that day
            statusId: matchingDay ? matchingDay._id : null, // Include the status._id
          };
        });

        // Return habit data with formatted weekStatus
        return {
          ...habit.toObject(), // Convert Mongoose document to plain JS object
          weekStatus: recentStatus, // Include the formatted weekStatus
        };
      });

      return { filteredHabits, previousDates }; // Return both filtered habits and previous dates
    } catch (err) {
      // Log any errors that occur during fetching
      console.error("Error fetching seven days status:", err);
      throw err; // Rethrow the error for handling upstream
    }
  }

  // Method to toggle the status of a specific habit
  async toggleStatus(habitId, statusId) {
    try {
      // Find the habit by its ID
      const habit = await habbitmodel.findById(habitId);
      if (!habit) throw new Error("Habit not found"); // Handle case where habit is not found

      // Find the specific status by its _id within the habit's weekStatus
      const status = habit.weekStatus.id(statusId);
      if (!status) throw new Error("Status not found"); // Handle case where status is not found

      // Toggle the status value (true/false)
      status.status = !status.status;

      return await habit.save(); // Save the updated habit document
      // Note: Redirection or further action should be handled at the controller level
    } catch (err) {
      // Log any errors that occur during toggling
      console.error("Error toggling status:", err);
      next(err); // Pass error to the next middleware for handling
    }
  }
}

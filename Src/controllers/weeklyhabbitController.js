import { WeeklyHabbitRepositroy } from "../Repository/WeeklyHabbit.Repository.js";

// Controller class for managing weekly habits
export class WeeklyHabbitController {
  constructor() {
    // Instantiate the repository to handle weekly habit operations
    this.Repository = new WeeklyHabbitRepositroy();
  }

  // Method to list all habits along with their status for the previous 7 days
  async ListAllHabbits(req, res, next) {
    try {
      // Fetch all habits and the previous 7 days' status
      const { filteredHabits, previousDates } =
        await this.Repository.getSevenDaysStatus();

      // Render the weekly habits page with the fetched data
      res
        .status(200)
        .render("weeklyhabbit", { habits: filteredHabits, previousDates });
    } catch (err) {
      // Log the error for debugging purposes
      console.error("Error fetching habits:", err);
      // Send a server error response if fetching fails
      res.status(500).send("An error occurred while fetching habits.");
    }
  }

  // Method to toggle the status of a habit
  async ToggleStatus(req, res, next) {
    try {
      // Extract habitId and statusId from request parameters
      const { habitId, statusId } = req.params;

      // Check if habitId is valid
      if (!habitId) {
        return res.status(400).send("Invalid ID"); // Send error if ID is invalid
      } else {
        // Call the repository method to toggle the status of the habit
        await this.Repository.toggleStatus(habitId, statusId);
        // Redirect to the weekly habits page after toggling
        res.redirect("/api/weekly");
      }
    } catch (err) {
      // Log the error for debugging purposes
      console.error("Error toggling status:", err);
      // Send a server error response if toggling fails
      res.status(500).send("An error occurred while toggling status.");
    }
  }
}

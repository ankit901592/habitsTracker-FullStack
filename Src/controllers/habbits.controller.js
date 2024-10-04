import { habbitRepositroy } from "../Repository/Habbits.repository.js";

// Controller class for managing habits
export class habbitsController {
  constructor() {
    // Instantiate the repository to handle database operations
    this.Repository = new habbitRepositroy();
  }

  // Method to create a new habit
  async CreateHabbit(req, res, next) {
    try {
      // Destructure Title and description from request body
      const { Title, description } = req.body;

      // Call the repository method to save the habit
      const saved = await this.Repository.CreateHabbit(Title, description);
      if (saved) {
        // Redirect to the API endpoint on success
        res.redirect("http://localhost:3000/api/");
      } else {
        // Send an error response if saving failed
        res.status(200).send("something went wrong");
      }
    } catch (err) {
      // Log any errors that occur during the process
      console.log(err);
    }
  }

  // Method to delete a habit by ID
  async deleteHabbit(req, res, next) {
    try {
      // Extract ID from request parameters
      const id = req.params.id;

      // Call the repository method to delete the habit
      const isDeleted = await this.Repository.deleteHabbit(id);
      if (isDeleted) {
        // Redirect to the API endpoint on success
        res.redirect("http://localhost:3000/api/");
      } else {
        // Send an error response if deletion failed
        res.status(404).send("something is wrong");
      }
    } catch (err) {
      // Log any errors that occur during the process
      console.log(err);
    }
  }

  // Method to display the habits page
  async DisplayHabbitsPage(req, res, next) {
    try {
      // Retrieve all habits from the repository
      const habbits = await this.Repository.DisplayHabbits();
      // Render the Home page with the list of habits
      res.status(200).render("Home", { habbits, UpdateHabbit: null });
    } catch (err) {
      // Log any errors that occur during the process
      console.log(err);
    }
  }

  // Method to update an existing habit
  async UpdateHabbit(req, res, next) {
    try {
      // Destructure Title and description from request body
      const { Title, description } = req.body;
      // Extract ID from request parameters
      const id = req.params.id;

      // Call the repository method to update the habit
      const isUpdated = await this.Repository.modifyhabbit(id, Title, description);
      if (isUpdated) {
        // Redirect to the API endpoint on success
        res.status(200).redirect("http://localhost:3000/api/");
      } else {
        // Send an error response if updating failed
        res.status(404).send("Something went wrong");
      }
    } catch (err) {
      // Log any errors that occur during the process
      console.log(err);
    }
  }

  // Method to find a habit for updating
  async findTheUpdateHabit(req, res, next) {
    try {
      // Extract ID from request parameters
      const id = req.params.id;
      // Retrieve the habit to update from the repository
      const UpdateHabbit = await this.Repository.findTheHabbit(id);
      if (UpdateHabbit) {
        // If found, retrieve all habits for rendering
        const habbits = await this.Repository.DisplayHabbits();
        // Render the Home page with the habit to update
        res.status(200).render("Home", { habbits, UpdateHabbit: UpdateHabbit });
      } else {
        // Send an error response if the habit was not found
        res.status(400).send("something is wrong");
      }
    } catch (err) {
      // Log any errors that occur during the process
      console.log(err);
    }
  }
}

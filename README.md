# Habit Tracker API

This API allows users to create, manage, and track habits, including weekly habit tracking. It is built using Express and MongoDB with controllers to handle habit operations.

## Features

- **Create Habits**: Users can create new habits.
- **View Habits**: Users can view all habits on the homepage.
- **Update Habits**: Users can update specific habits.
- **Delete Habits**: Users can delete specific habits.
- **Toggle Habit Status**: Users can mark habits as completed or not.
- **Weekly Habit Tracking**: Users can toggle the status of habits on a weekly basis.

## Getting Started
 http://localhost:3000/api/

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone 

API Endpoints
Habit Management Endpoints
POST /api/createHabit

Description: Create a new habit.
Request Body: Habit data.
Response: Redirects to the homepage after successful creation.
GET /api/

Description: Displays the homepage with a list of all habits.
Response: Renders the habit list page.
GET /api/delete/:id

Description: Deletes a habit by its ID.
Response: Redirects to the homepage upon successful deletion.
GET /api/update/:id

Description: Finds and displays a specific habit for updating by its ID.
Response: Renders the update page with the habit details.
POST /api/updateHabbit:id

Description: Updates a habit with new data based on its ID.
Request Body: Updated habit data.
Response: Redirects to the homepage after successful update.
GET /api/Togglehabbits/:id

Description: Toggles the status of a habit (completed/not completed) by its ID.
Response: Redirects to the homepage after toggling the status.
Weekly Habit Tracking Endpoints
GET /api/weekly

Description: Lists all habits with weekly tracking information.
Response: Renders the page with weekly habit tracking data.
GET /api/weekly/Toogle/:habitId/:statusId

Description: Toggles the completion status of a habit for a specific day in the weekly tracker.
Response: Redirects after successfully toggling the weekly status.
Usage
To use the API, send requests to the respective endpoints. For habit creation and updates, ensure you send the necessary data in the request body.


# Airbnb Clone

Welcome to my Airbnb clone project! This is a full-stack web application that replicates the core functionalities of Airbnb, allowing users to browse, create, and review property listings.

## Features

*   **User Authentication:** Secure signup and login functionality using `passport.js`.
*   **Property Listings:** Users can view detailed property listings. Authenticated users can create, edit, and delete their own listings.
*   **Image Uploads:** Seamless image uploading for listings, powered by `Cloudinary`.
*   **Interactive Maps:** Visualizing property locations using `Mapbox`.
*   **Bookings:** Users can book properties for specific dates and view their reservations.
*   **Reviews & Ratings:** Users can leave reviews and ratings for listings they've visited.
*   **Responsive Design:** A user-friendly interface that looks great on all devices, built using EJS templating.

## Tech Stack

This project is built using the following technologies:

*   **Frontend:** HTML, CSS, JavaScript, EJS (Embedded JavaScript templating)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose
*   **Authentication:** Passport.js
*   **Cloud Storage:** Cloudinary (for listing images)
*   **Maps:** Mapbox SDK
*   **Validation:** Joi

## Getting Started

Follow these steps to get a copy of the project up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) installed on your machine.
*   [MongoDB](https://www.mongodb.com/) installed and running locally, or a MongoDB Atlas URI.
*   [Cloudinary](https://cloudinary.com/) account for image storage.
*   [Mapbox](https://www.mapbox.com/) account for map rendering.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Hare-Ram-Yadav/AirBNB-project-copy.git
    cd AirBNB-project-copy
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUD_API_KEY=your_cloudinary_api_key
    CLOUD_API_SECRET=your_cloudinary_api_secret
    MAPBOX_TOKEN=your_mapbox_token
    ATLASDB_URL=your_mongodb_connection_string
    SECRET=your_session_secret
    ```

4.  **Run the application:**
    ```bash
    npm start
    # or for development mode:
    # npm run dev
    ```

5.  **Access the application:**
    Open your browser and navigate to `http://localhost:8080` (or the port specified in your code) to explore the application!

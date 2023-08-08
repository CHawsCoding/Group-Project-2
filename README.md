# Song Scope

A platform for music enthusiasts to share reviews on their favorite songs. Users can rate songs, write reviews, and engage with a community of fellow music lovers.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Deployed](#deployed)
6. [Contributing](#contributing)
7. [License](#license)
8. [Sources](#sources)


## Features

- **User Authentication:** Register, log in, and maintain user sessions.
- **Review Songs:** Add new reviews for songs, including title, artist, content, and a 1-10 rating.
- **Dashboard:** View all reviews and manage personal reviews in the user dashboard.

## Technologies Used

- **Node.js:** Backend server.
- **Express.js:** Web application framework.
- **Sequelize:** Database ORM.
- **Handlebars:** Templating engine for dynamic views.
- **Bootstrap:** Styling the user interface.
- **Passport:** User Authentication
- **Mysql2** MySQL client for Node.js, providing fast database connections.

## Installation

1. **Clone the Repository:**

   \```bash
   git clone https://github.com/CHawsCoding/Song-Scope
   \```

2. **Navigate to the Directory:**

   \```bash
   cd song-scope
   \```

3. **Install Dependencies:**

   \```bash
   npm install
   \```

4. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory.
   - Add your database and other configuration variables.

5. **Run the Application:**

   \```bash
   npm start
   \```

   The application should now be running at [http://localhost:3001](http://localhost:3001).

## Usage

1. **Register or Log In:** Start by registering or logging in to access the full features.
2. **Add a New Review:** Navigate to the "Add a New Review" page and enter the song title, artist, rating, and your review.
3. **Manage Reviews:** Visit the dashboard to view and manage your reviews.

## Deployed

You can visit our deployed version of the application here:

![screenshot](./Public/assets/Screen%20Shot%202023-08-07%20at%205.28.01%20PM.png)

## Contributing

Not considering outside contributions to the project at this time. Will update this section with guidelines if that changes. 

## License

**None.**

## Sources

Thank you to all contributers to this project: 

@CHawsCoding
@Aleenabrink93
@DanielDiazLo
@jacobhargraves

Other Sources:

Passport documentation was used to help set up authentication. We used the documentation for the local strategy to help set up our parameters - that documentation can be found here: https://github.com/jaredhanson/passport-local



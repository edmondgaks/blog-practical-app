# Blog Practical App

This is a blog application built with React.js and Node.js. It allows users to register, log in, and perform CRUD operations on posts and comments. Authentication is required for creating, updating, and deleting posts and comments.

## Technologies Used

- **React.js**: Frontend framework for building the user interface
- **Node.js**: Server-side runtime environment
- **Express**: Web framework for Node.js
- **MySQL**: Relational database management system
- **SASS**: CSS preprocessor for styling

## Database Schema

### User Table
```sql
CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  img VARCHAR(255)
);

### Posts table Table
```sql
CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  `desc` VARCHAR(12000) NOT NULL,
  img VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  uid INT NOT NULL,
  FOREIGN KEY (uid) REFERENCES user(id)
);

### Comments table Table
```sql
CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  content VARCHAR(5000) NOT NULL,
  authorId INT NOT NULL,
  postId INT NULL,
  FOREIGN KEY (authorId) REFERENCES user(id),
  FOREIGN KEY (postId) REFERENCES posts(id)
);


## API Endpoints

### Authentication Routes (`/api/auth`)
```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout


### Post Routes (`/api/auth`)
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

### Comment Routes (`/api/auth`)

GET /api/comments/:post_id     // Get comments for a specific post
POST /api/comments/           // Add a new comment
PUT /api/comments/:id         // Update a comment by ID
DELETE /api/comments/:id      // Delete a comment by ID



## Getting Started

### Prerequisites
```text
- Node.js
- MySQL
- (Optional) SASS for styling


## Acess the application
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)
## EdTech REST API (Node.js + Express + MySQL)

### Features implemented:
 - User registration & login (bcrypt + JWT)
 - Role-based endpoints (admin vs student)
 - Course creation (admin)
 - Enroll in course (student)
 - Course listing with pagination

### Environment variables (.env):
```
  PORT=3000
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=edtech
  ACCESS_TOKEN_SECRET=yoursecret
  REFRESH_TOKEN_SECRET=yoursecret
```

### SQL schema (MySQL):
```
CREATE DATABASE edtech;
USE edtech;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student','admin') NOT NULL DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_course (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
```

### To run:
- Create .env with values
- Run the SQL schema above in your MySQL
- npm install dependencies --> ```npm i```
- Run the server locally --> ```npm run dev```

### Test Endpoints
- Base url --> ```http://localhost:3000/api```
- Register user --> ```/auth/register```
```
Request body 
{ name, email, role: (student/admin), password}
```
- Login user --> ```/auth/login```
```
Request body 
{  email, password}
```
- Create Course --> ```/course/create```
```
Request body 
{ title, description}
```
- Enroll Course--> ```/enroll/create```
```
Request body 
{ courseId }
```

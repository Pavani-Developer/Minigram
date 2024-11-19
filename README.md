# Minigram

Minigram is a lightweight web application inspired by Instagram. Built using **React.js**, **Django**, and **MySQL**, it allows users to create and manage their profiles, view posts, and interact with a clean, responsive interface.

---

## Features

- **User Profile**
  - Responsive design for seamless experience across devices.
  - Clean and minimalistic interface.
  - Profile view optimized for mobile users.

- **Authentication**
  - User registration and login.
  - Secure password storage using Django's built-in authentication system.

- **Edit Profile**
  - Update profile information, including bio and profile picture.

- **Database Management**
  - User and post data stored securely in a MySQL database.

- **Logout**
  - Simple and secure logout functionality.

- **Responsive Design**
  - Ensures proper layout and usability on mobile, tablet, and desktop devices.

---

## Technologies Used

- **Frontend:** React.js
- **Backend:** Django
- **Database:** MySQL
- **Styling:** CSS/Bootstrap

---

## Installation

### Prerequisites
Ensure you have the following installed:
- Python 3.8+
- Node.js 14+ and npm
- MySQL Server
- Django

### Steps to Set Up the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/minigram.git
   cd minigram
Set Up the Backend

Navigate to the backend directory:

cd backend
Create a virtual environment and activate it:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install dependencies:

pip install -r requirements.txt
Set up the MySQL database:
Create a database named minigram in MySQL.
Update settings.py with your MySQL database credentials.
Run migrations:

python manage.py migrate
Start the development server:

python manage.py runserver
Set Up the Frontend

Navigate to the frontend directory:

cd ../frontend
Install dependencies:

npm install
Start the React development server:

npm start
Access the Application

Backend API: http://localhost:8000
Frontend: http://localhost:3000
Future Enhancements
Add functionality for posting and sharing photos.
Implement a like and comment system.
Build a recommendation engine for suggested posts.
Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

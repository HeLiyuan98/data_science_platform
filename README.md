# Panda Metadata Management System

The Panda Metadata Management System is a web application for displaying and managing metadata information about pandas. It uses a Flask backend with a SQLite database, and a front-end built with HTML, CSS, and JavaScript.

## Project Structure

- `app.py`: The Flask server and API endpoints.
- `pandas.db`: SQLite database containing panda metadata.
- `requirements.txt`: A list of Python dependencies for the project.
- `static/`: Directory containing static files like stylesheets, JS scripts, and images.
- `templates/`: Directory containing HTML templates for the Flask application.
- `venv/`: Directory for Python virtual environment (not tracked in version control).

## Setup and Installation

1. Ensure you have Python 3.x installed on your system.
2. Clone the repository to your local machine.
3. Navigate to the project directory and set up a Python virtual environment:
   ```
   python -m venv venv
   ```
4. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On MacOS/Linux:
     ```
     source venv/bin/activate
     ```
5. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
6. Run the Flask application:
   ```
   python app.py
   ```

## Usage

Once the application is running, navigate to `127.0.0.1:500

## Setup Instructions

1. **Clone the Repository**: `git clone https://github.com/muradyanvano1995/iguan-test-task.git`
2. **Install backend Dependencies**: `composer install`
3. **Install frontend Dependencies**: `npm install`
4. **Set Up the Environment**:
    - Copy the `.env.example` to `.env` and configure your database settings.
5. **Run Sail (if you want to run the application via docker)**:
    - Run command `./vendor/bin/sail up -d` to start the docker container.
    - Run command `./vendor/bin/sail artisan migrate --seed` to migrate database and seed the demo data.
    - Run command `npm run dev` to start the npm development server.
6. **In browser**:
    - Open `http://127.0.0.1/` to see the project.
    - Open `http://127.0.0.1:8025/` to see the mail server GUI.
    - Use `admin@mail.test` email and `password` password to login as administrator.

7. **Note**:
    - Only `admin` user can log in or reset the password.

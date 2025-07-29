# ATC Hugo App

## Software

Our documentation is available here: **[link](https://sites.google.com/view/beaver-works-assistive-tech/create-challenge/2025-projects-section/422-tj-team-5?authuser=0)**

This project was uploaded locally to Hugo's computer. Here's how you can run it too!

### How to Run This Code

#### 1. Clone the Repository

a) Go to the bright green button that says "Code" and then clone!

b) ![Clone Repository](https://github.com/user-attachments/assets/fef0ee6c-c088-4685-b92d-c34d628fc777)

#### 2. Project Structure

The file structure is relatively simple. It's divided into two parts: frontend and backend. The frontend is located in the folder called "frontend" while the backend is everything else.

![Project Structure](https://github.com/user-attachments/assets/999a3616-b099-4658-b932-c226e4a11878)

#### 3. Running the Frontend

The frontend can run independently of the backend. However, it only lets the user access the login, signup, and logout pages. Here's how you would run it:

a) First and foremost, you must download Node.js. This project uses npm to download all the add-ons, so it uses Node. You can download from this site: https://nodejs.org/en

b) After that is done, change into the "frontend" folder/directory by typing the following into your terminal:
```bash
cd ./frontend
```

c) Now type the following command to download the node modules needed for this project:
```bash
npm run build
```

d) Finally, run the development server:
```bash
npm run dev
```
This should show a link to the site that looks like: `http://localhost:5173/`. You should instead go to `http://localhost:5173/auth/login` to create your account.

#### 4. Running the Backend

The user, the workouts, the exercises — everything depends on this. This was written in Django.

a) If you're in the "frontend" folder, change the directory into the main folder again:
```bash
cd ..
```

b) First, you must have data inside your database. This is achieved by running:
```bash
python manage.py load_exercies
```

c) Then, run the following commands to set up all your classes:
```bash
python manage.py makemigrations
python manage.py migrate
```

d) Finally, to run the server:
```bash
python manage.py runserver
```
Now your database should start working!

#### 5. How It Works

As a brief overview, the backend runs on a separate route from the frontend. The frontend accesses the data provided by the backend by making API calls. Thus comes the appropriately named folder "api" within the "frontend" folder. With this communication, the frontend displays the data on the site.

#### 6. Prerequisites

Setting this up may be difficult without experience with React and Django, but if both languages are known, the code should be easy to follow.

---

## Hardware

If someone wanted to recreate this physical component, they would need to follow the following steps:

### Assembly Instructions

1. Place the Arduino Uno in the middle of the breadboard and connect its 5V and GND to the positive and negative terminals of the breadboard, respectively.

2. Then, connect the IMU VIN and GND pins to the positive and negative terminals of the breadboard, respectively.

3. After that, connect the SDA pin on the IMU to the A4 pin on the Arduino, and connect the SCL pin on the IMU to the A5 pin on the Arduino.

4. Connect the servo by connecting the positive pin to the positive terminal of the breadboard, the negative pin to the negative terminal of the breadboard, and the data pin to pin 2 of the Arduino.

5. Connect the positive pins of the LEDs into pins 12 and 13 on the Arduino. Connect the negative pins of the LEDs into the negative terminal of the breadboard through a 330 Ω resistor for each.

6. Then, connect the 9-volt battery to the Arduino by plugging the 9-volt battery connector into the Arduino.

7. Finally, tape the loose parts and wrap the whole thing in the sports wrap to make it secure.

### Functionality

The code simply takes the data from the IMU and turns on the LEDs and servo when the IMU senses movement.

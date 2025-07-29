#Software
Our documentation is available here: **https://github.com/minjoon0308/ATC_Hugo_App**. 

This project was uploaded locally to Hugo's computer. Here's how you can run it too!

Here is how you would run this code: 
1) Clone the repository
  a) Go to the bright green button that says “Code” and then clone!
  b) <img width="512" height="416" alt="image" src="https://github.com/user-attachments/assets/fef0ee6c-c088-4685-b92d-c34d628fc777" />

2) The file structure is relatively simple. It’s divided into two parts: frontend and backend. The front end is located in the folder called “frontend” while the back end is everything else
  a) <img width="512" height="261" alt="image" src="https://github.com/user-attachments/assets/999a3616-b099-4658-b932-c226e4a11878" />

3) The front end can run independently of the back end. Except, it only lets the user access the login, signup, and logout pages. Here’s how you would run it: 
  a) First and foremost, you must download Node.js. This project uses npm to download all the add-ons, so it uses Node. You can download from this site https://nodejs.org/en 
  b) After that is done, change into the “frontend” folder/directory by typing “cd ./frontend” into your terminal 
  c) Now type “npm run build”; this should download the node modules needed for this project
  d) Finally, type “npm run dev” and it should show a link to the site that looks like: “http://localhost:5173/”, you should instead go to “http://localhost:5173/auth/login” to create your account 

4) Moving onto the backend. The user, the workouts, the exercises — everything depends on this. This was written in Django.
  a) If you’re in the “frontend” folder, change the directory into the main folder again by doing “cd ..”	
  b) First, you must have data inside your database. This is achieved by writing “python manage.py load_exercies” into your terminal. 
  c) Then, type and run “python manage.py makemigrations” and “python manage.py migrate”; this will set up all your classes. 
  d) Finally, in order to run the server, you have to write the command “python manage.py runserver,” and now your database should start working! 

5) Just as a brief overview, how this works is essentially the backend is running on a separate route from the frontend. The front end accesses the data given by the back end by making API calls. Thus comes the appropriately named folder “api” within the “frontend” folder. With this communication, the front end displays the data on the site. 
6) Setting this up this may be difficult without experience with React and Django, but if both languages are known, the code should be easy to follow.

#Hardware
If someone wanted to recreate this physical component, they would need to follow the following steps:
1) Place the Arduino Uno in the middle of the breadboard and connect its 5v and GND to the positive and negative terminals of the breadboard, respectively.

2) Then, connect the IMU VIN and GND pins to the positive and negative terminals of the breadboard, respectively.

3) After that, connect the SDA pin on the IMU to the A4 pin on the Arduino, and connect the SCL pin on the IMU to the A5 pin on the Arduino.

4) Connect the servo by connecting the positive pin to the positive terminal of the breadboard, the negative pin to the negative terminal of the breadboard, and the data pin to pin 2 of the Arduino.

5) Connect the positive pins of the LEDs into pins 12 and 13 on the Arduino. Connect the negative pins of the LEDs into the negative terminal of the breadboard through a 330 Ω resistor for each.

6) Then, connect the 9-volt battery to the Arduino by plugging the 9-volt battery connector into the Arduino.

7) Finally, tape the loose parts and wrap the whole thing in the sports wrap to make it secure.

8) The code simply takes the data from the IMU and turns on the LEDs and servo when the IMU senses movement.

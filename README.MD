hello! welcome to my project here called “mango messenger”

i have created an example of a messaging application that has account creation, account login, and messaging capabilities. Currently only works locally, as it is not hosted on a cloud server. Please feel free to mess around with anything! 

*Please make sure that you install all of the necessary dependencies, and that they are all up to date!* 

I used npm install pg-promise cor, and then used node to launch server.js. The command is node server.js. You must launch it within the directory. 


Client-Side: 

Account Creation

The provided code appears to be an HTML document that creates a form for account creation in a messaging application called Mango Messenger. Here's a breakdown of the different sections and their functionalities:
* The code includes the Bootstrap CSS framework from a CDN (Content Delivery Network) to style the elements of the form.
* The <style> section contains some custom CSS styles for the document.
* Inside the <body> section, there's a container with two columns (col-8 and col-4) using the Bootstrap grid system.
* The left column contains a form for account creation. It includes input fields for full name, username, password, and confirm password. The form has an ID of "accountCreationForm."
* The right column contains a gradient-card section with an image and a text description, promoting the features of Mango Messenger.
    * At the bottom of the document, there's a <script> section that includes client-side JavaScript code using the Fetch API.
    * The JavaScript code adds a submit event listener to the form with the ID "accountCreationForm."
    * When the form is submitted, the event listener prevents the default form submission behavior.
    * It retrieves the values entered in the form fields (full name, username, password, and confirm password).
    * It validates that the password and confirm password fields match, showing an alert message if they don't.
    * If the passwords match, it creates a formData object containing the user's information.
    * It performs a POST request to a URL (http://localhost:3000/create-account) with the form data in JSON format.
    * Depending on the response from the server, it shows an alert indicating whether the account creation was successful or not.

Login

The provided code is an HTML document for a login page in the Mango Messenger application. Here's an overview of its structure and functionality:
* The code includes the Bootstrap CSS framework from a CDN to style the elements of the page.
* Custom styles are defined in the <style> section, modifying the appearance of the card and adding hover effects to the login button.
* Inside the <body> section, there's a container with a flex layout to center the content vertically.
* The Mango Messenger logo is displayed at the top, followed by the page title.
* A card element is used to contain the login form.
* The form has an ID of "loginForm" and includes input fields for the username and password.
* The form also contains a submit button with the text "Login" and a custom class of "custom" to apply specific styling.
    * The JavaScript code is included in a <script> tag at the bottom of the page.
    * It selects the form element with the ID "loginForm" and attaches a submit event listener to it.
    * When the form is submitted, the event listener prevents the default form submission behavior.
    * It retrieves the values entered in the username and password fields.
    * It creates a formData object containing the user's credentials.
    * The code updates the form's HTML to display a loading animation and a "Connecting..." message.
    * It performs a POST request to a URL (http://localhost:3000/login) with the form data in JSON format.
    * Depending on the response from the server, it shows an alert indicating whether the login was successful or not.
    * If the login is successful, it stores the user's username in the browser's localStorage and redirects to the content page.

Sending Messages/Viewing Messages 

The provided code is an HTML document for the content page of the Mango Messenger application. It includes features for sending and displaying messages, as well as a sign-out button. Here's an overview of its structure and functionality:
* The code includes the Bootstrap CSS framework and a Google Fonts link for the Material Symbols Outlined font.
* Custom styles are defined in the <style> section, including a flex layout for the header and some additional styling.
* Inside the <body> section, there's a container for the content.
* The header section includes the Mango Messenger logo and the application name.
* Below the header, there are two card elements: one for sending messages and another for displaying the user's messages.
* The "Send Message" card contains a form with input fields for the sender's username, recipient's username, and message text. It also includes a submit button to send the message.
* The "Your Messages" card has an empty <div> with the ID "userMessages" where the messages will be dynamically inserted.
* After the two cards, there's a sign-out button.
    * The JavaScript code is included in a <script> tag at the bottom of the page.
    * It selects the necessary elements from the DOM, including the form, the message display area, and the sender's username input field.
    * The username is retrieved from the browser's localStorage and autofilled in the sender's username input field.
    * An event listener is attached to the form's submit event.
    * When the form is submitted, the event listener prevents the default form submission behavior.
    * It retrieves the values entered in the form's input fields.
    * It creates a formData object containing the message details.
    * It performs a POST request to a URL (http://localhost:3000/send-message) with the form data in JSON format.
    * Depending on the response from the server, it shows an alert indicating whether the message was sent successfully or not.
    * After sending a message, it resets the form and calls the loadMessages function to reload the messages.
    * The formatTimestamp function is defined to format the timestamp of messages.
    * The loadMessages function retrieves the user's username from localStorage and makes a GET request to a URL (http://localhost:3000/get-messages) to fetch the messages for the user.
    * The received data is processed and dynamically inserted into the userMessages element.
    * The function includes a formatTimestamp function to format the timestamps of the messages.
    * The loadMessages function is called initially to load the messages when the page loads.
    * The sign-out button has an event listener attached to handle the sign-out functionality. It simulates a sign-out delay and then redirects the user to the login page (login.html).
    * The code also includes functionality to disable the back button navigation by using the history API.

Server-Side: 

The code you provided is a Node.js server implementation using Express.js and PostgreSQL for a messaging application called "Mango Messenger." Here's a breakdown of the code:
1. 		Required dependencies:
    * express: A web framework for Node.js used to handle routing and middleware.
    * cors: Middleware to enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins.
    * body-parser: Middleware for parsing JSON and URL-encoded data from request bodies.
    * pg and Pool: Libraries for interacting with PostgreSQL database.
2. 		Creating an Express application:
    * The code initializes an Express application by calling express() and assigns it to the app variable.
3. 		Middleware setup:
    * body-parser middleware is configured to parse URL-encoded and JSON data from request bodies.
    * cors middleware is used to enable CORS.
4. 		PostgreSQL connection pool:
    * A PostgreSQL connection pool is created using the pg.Pool class, providing the database connection details.
5. 		Route for creating an account:
    * app.post('/create-account', ...) defines a route for creating a user account. It expects a POST request with the user's full name, username, and password. It inserts the user data into the users table in the PostgreSQL database.
6. 		Route for login:
    * app.post('/login', ...) defines a route for user login. It expects a POST request with the username and password. It queries the users table in the PostgreSQL database to check if the provided credentials match.
7. 		Route for sending a message:
    * app.post('/send-message', ...) defines a route for sending a message. It expects a POST request with the sender's username, recipient's username, and message text. It performs a check to ensure that the recipient's username exists in the users table, and if so, inserts the message data into the messages table along with a timestamp.
8. 		Route for fetching user messages:
    * app.get('/get-messages', ...) defines a route for fetching user messages. It expects a GET request with the recipient's username as a query parameter. It queries the messages table in the PostgreSQL database to retrieve all messages for the given recipient.
9. 		Starting the server:
    * app.listen(3000, ...) starts the server and listens on port 3000.

Overall, this server-side code sets up a server with endpoints for creating accounts, logging in, sending messages, and retrieving messages using a PostgreSQL database. It utilizes Express.js for routing and middleware management.

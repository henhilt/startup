# Finance Dashboard

[My Notes](notes.md)

This application serves as a centralized dashboard for key financial metrics of interest to the user. Users can select from different options such as the price of a stock, the current federal funds rate, and the rate of inflation. Users will login, be able to customize which key indicators they would like to display, save their preferences, and receive notifications when another user logs in.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Ever made a goal to become more financially literate and more aware of how the economy is doing every day, but you end up quitting three days in because there's too much to keep track of? Look no further than this Finance Dashboard that enables you to centralize all of your favorite key indicators in one place and see updates in real time. Say goodbye to having to search each on individually and losing an entire morning every day—customize your very own dashboard today and impress your dad next time he calls with your always-in-the-know grasp on the economy!

### Design

![Design image](Startup-Design-Login.jpg)
![Design image](Startup-Design-Dashboard.jpg)
![Design image](Startup-Design-Community.jpg)

### Key features

- Users can select which financial metrics they want to add to their dashboard
- Users can see other users that have also created an account
- Financial data will update in real time every few minutes (for metrics that vary within one day)
- User selections will be stored for next login

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Three HTML pages: login, dashboard, and community of users (may change to just two and exclude the community page as needed). Hyperlink to GitHub.
- **CSS** - Styling that looks professional and does not distract from conveying key information, including good color choices and clear delineations between financial metrics.
- **React** - Offers login for users, displays possible selections for financial metrics, displays metrics.
- **Service** - Backend service with endpoints for login, retrieving selections for APIs.
- **DB/Login** - Store users, store user selections in their dashboard, register and login users. Can't select dashboard items without authentication.
- **WebSocket** - As each user creates an account, other users are notified who made a new account.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I added three pages: index.html, dashboard.html, and community.html
- [x] **Proper HTML element usage** - Used various html tags such as header,footer, nav on each page, as well as body and main on each page. 
- [x] **Links** - I put links to each of my pages in the header of each page
- [x] **Text** - I added text to help welcome users and prompt them to login, to label the buttons they will be able to toggle on the dashboard page, and placeholder text for the database/Websocket connections on my community page
- [x] **3rd party API placeholder** - I put a placeholder for my 3rd party API placeholder on my dashboard page (where i'll connect with charts from other sites), I put a picture there for now.
- [x] **Images** - I added an image to my community page (line 26)
- [x] **Login placeholder** - in my index.html, I have the placeholder for my login (lines 29-40)
- [x] **DB data placeholder** - I put a database table placeholder for storing users and when they last logged on (community.html lines 39-60)
- [x] **WebSocket placeholder** - I added placeholder text for where I will put notifications for what metrics other users are choosing to track (displaying in their dashboard page). This is in community.html lines 25-36.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I customized my header, footer, and main content in order to fit my design. I didn't use much beyond the main.css since I want a consistent look for each page and want it to be very simple and plain to make sure actual financial users would be undistracted. However, I added some styles for different types of event notifications on my 'Community' page.
- [x] **Navigation elements** - I customized my nav bar and made it consistent across all of my pages. I made it active to show bolded text for the page you're currently viewing
- [x] **Responsive to window resizing** - I used flex in my display in order to handle window resizing
- [x] **Application elements** - I used various elements throughout to style my webpage.
- [x] **Application text content** - I added a custom font for my main and body text. I kept most of the same text elements but edited some of it to make more sense to the user.
- [x] **Application images** - I maintained the same images as previously

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I followed the process from the module to bundle my code using Vite.
- [x] **Components** - Transferred my content from HTML and CSS files to function with react components (also updated some CSS for the navbar as recommended).
- [x] **Router** - Configured the router to function properly.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - I fully implemented everything and mocked out WebSocket data (in my Community Watchlist is the best example)
- [x] **Hooks** - I used useState and useEffect throughout most of my jsx files. In my Dashboard.jsx, I used them to store the checkbox/watchlist selections for users and to sync the watchlist in localstorage. In my Community.jsx, I used useEffect to trigger my setInterval mock WebSocket.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - I used Node.JS/Express HTTP
- [x] **Static middleware for frontend** - I used this in my index.js file.
- [x] **Calls to third party endpoints** - I did this in my Dashboard.jsx/index.js to get real time data and charts from third party endpoints on my backend.
- [x] **Backend service endpoints** - I created different endpoints in my index.js file for creating accounts and logging in, as well as my third party APIs.
- [x] **Frontend calls service endpoints** - In my Dashboard.jsx I used fetch API to call my backend endpoints to get real time data, such as the MANU stock price.
- [x] **Supports registration, login, logout, and restricted endpoint** - I have a logout function, login functions, used bcrypt to hash passwords, and used a restricted endpoint.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Stores data in MongoDB** - updated my community watchlist and each user watchlist data to be stored in database and not locally.
- [x] **Stores credentials in MongoDB** - updated login data to be stored in database in Mongo and not locally, making it permanent.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Backend listens for WebSocket connection** - peerProxy.js file to set up WebSocket service and manage connections with HTTP
- [x] **Frontend makes WebSocket connection** - dashNotifier.js that handles WS connection and links with Community page
- [x] **Data sent over WebSocket connection** - updates personal watchlist, updates logins, with broadcasts for each
- [x] **WebSocket data displayed** - Community page watchlist and login tables update live as other users make changes/login, get notifications about other user picks on Dashboard page
- [x] **Application is fully functional** - No more placeholders and kept all previous functionality.

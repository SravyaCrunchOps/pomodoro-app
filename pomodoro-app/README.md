# Project Documentation - Pomodoro Frontend
This application is divided into 3 folders 
1. Assets
2. Components
3. Pages
4. App.js (Main)
5. Dashboard (AI)

### 1. Assets Folder:
------------------------------------------------------------------
Contains two audio file for clicking the mouse and clock alarm

### 2. Components Folder:
-----------------------------------------------------------------
  -> Header
  -> Footer 

  Header
  -----------
  title -> Pomodoro
  user ? display icon : Login - Signup buttons
  user => dropdown menu
          |
          -> displayname , email
          -> Dashboard
          -> Settings
          -> Logout

  Footer
  ------------
  Footer From => input label
  Footer Links => menu links
                  |
                  -> Home
                  -> Login
                  -> Signup
                  -> About Us
                  -> Privacy Policy
                  -> Disclaimer
  Footer social Media => linkedin, github, facebook icons...


### 3. Pages:
----------------------------------------------------------------
a. Home Page
b. Login Page
c. Signup Page
d. Settings Page (for user settings)
e. Timer Page
f. Dashboard Page (AI)


#### a. Home Page:
--------------------------
- component render => '`Timer`'
- KPI - 
      | 
      -> App load time and 
      -> error_count when loading the home page
- API used - 
      |
      -> Metrics API for app load time
      -> POST - http://localhost:7000/metrics

#### b. Logn Page
-------------------------
- status message - success or error
- submit form -> email, password
- if not existing user, there's '`signup`' button
- Login via Google
- API used - 
      |
      1. POST - http://localhost:7000/user/login
                |
                2. POST - http://localhost:7000/user/verifyUser

      3. GET - http://localhost:7000/auth/google

#### c. Signup Page
--------------------------
- status message - success or error
- submit form -> display name, email, password
- if not existing user, there's '`signup`' button
- Login via Google
- API used - 
      |
      1. POST - http://localhost:7000/user/signup

      2. GET - http://localhost:7000/auth/google


#### d. settings Page 
-----------------------------------
- User can edit
              |
              -> Profile name, email, password
              -> Customize Timer for timer, long break and short break 
- API used - 
      |
      1. POST - http://localhost:7000/user/updateUser?email=


#### e. Timer Page
--------------------------------------------
1. Timer.js
   |
   -> `TNavbar` component - timer, long break, short break
   -> `TaskUI` component - 
   -> `TimerUI` component -
   -> `TimerContent` component - contains text and information about pomodoro 

2. TaskUI folder
   |
   -> TaskUI.js
              |
              -> TaskList - 
                      |
                      -> task name, 
                      -> {edit, delete} buttons, 
                      -> check form, 
                      -> description and 
                      -> title
              -> TaskForm - 
                      |
                      -> title (task name) - input form text
                      -> Act - input form number
                      -> `TaskButtons` component
                                      |
                                      -> description
                                      -> title

    -> API used -
              |
              -> POST - http://localhost:7000/checkTodayTasks

3. Timer UI folder
  |
  -> message
  -> `TimerNav` component - contains 'Navbar pills' like timer, long break, short break. Depending on the timer..background color and time will change in UI
  -> `TimerButtons` component - contains 'PAUSE', 'START' and 'STOP' buttons
  -> API used
            |
            -> POST - http://localhost:7000/createTask     
            -> POST - http://localhost:7000/metrics 


4. TimerNavbar folder
  |
  -> `TNavbar.js` - contains 'Task List' and 'Task Resport'
                |
                -> `TList` component - Tabular list contains - date, title, focus time, project, description
                -> `TReport` component - Visualization of user tasks in bar graph based on week and month.
  -> API used - 
            |
            -> POST - http://localhost:7000/reportService
            -> POST - http://localhost:7000/metrics
                    - Report to check if file is downloaded or not.


### 4. App.js
----------------------------
- All compoents are rendered in this file
- Home page,
- Settings page
- Dashboard page
- Login page
- Signup page
- Error Page
- API used - 
        |
        -> GET - http://localhost:7000/auth/login/success


### 5. Dashboard Page (AI) 
-------------------------------
- Tasks => `DashboardList` component 
- Analytics => `DashboardChart` component
- API used
        |
        -> POST - http://localhost:7010/dashboard
                - Gets data list, df (dataframe), topic_labels from ML backend 



### config file
----------------------------------
1. apiUrl: process.env.REACT_APP_API_URL,
2. reportsUrl: process.env.REACT_APP_REPORTS_API_URL,
3. metrics_url: process.env.REACT_APP_METRICS_URL,
4. jaeger_trace_url: process.env.REACT_APP_JAEGER_TRACE_URL

### .env file
----------------------------------
REACT_APP_API_URL = http://localhost:7000

REACT_APP_REPORTS_API_URL = http://localhost:7070

REACT_APP_METRICS_URL = http://localhost:7000/metrics


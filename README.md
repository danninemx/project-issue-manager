# Software Issue Manager

## Plans

- [Overview](#overview)
- [Instructions](#instructions)
- [Technologies](#technologies)
- [Future Development](#future)
- [Developer](#team)

---

## Overview <a name="overview"></a>

This is a development project for a software issue management application. ("bug tracker")

It will be a full-stack MERN application with MVC design.

---

### Objectives and Target Consumer

This product seeks to fill the market void of freemium issue tracker of the variety, primarily seeking to serve:

- Independent/non-professional software developers
- SMB (Small and Medium Size Businesses) Managers
- Bootstrap entrepreneurs

---

### UI Mockup

- Interactive Mockup: [Figma link](https://www.figma.com/file/W5G1KDq5mUv39uNlqwC3bC/Untitled?node-id=0%3A1)

#### 1. Dashboard

   <p align="center"><img src="https://github.com/danninemx/project-issue-manager/blob/master/client/public/Desktop - 1.png/" alt="mockup 1" height="450"></p>

#### 2. Submit Issue

   <p align="center"><img src="https://github.com/danninemx/project-issue-manager/blob/master/client/public/Desktop - 2.png/" alt="mockup 2" height="450"></p>

#### 3. Track Issue

   <p align="center">
      <img src="https://github.com/danninemx/project-issue-manager/blob/master/client/public/Desktop - 3.png/" alt="mockup 3" height="450">
   </p>

---

### Project Scope

#### In Scope Functionality

- Creating login account for user
- Providing different capabilities for reporters and developer
- Using API to route user to appropriate view
- Providing issue submission form that feeds issues into a tracker a la kanban board
- Adding, updating, and deleting reported issues to/from a database
- Tracking historical changes in an issue's status, reporter, assignment, etc.
- Generating and sending of emails related to issues
- Querying the database for issues

#### Out of Scope Functionality

- Using OAuth for user signup and login
- Incorporate broader project management contexts
- Implement realtime bi-directional communication between reporter and developer

---

### Development

The current development plans are as follows:

#### Sprint 1 (11/8 - 11/12)

- ~~Project description (-11/9)~~
- ~~Plan formulation (-11/9)~~
- ~~UI mockup creation (-11/9)~~
- ~~Frontend(React components, CSS) setup (-11/12)~~
- ~~Determine dataflow (-11/12)~~

#### Sprint 2 (11/13 - 11/19)

- ~~Core features development (-11/19)~~
- ~~Deployment (-11/19)~~
- **Produce and deploy working MVP (11/19)**

#### Sprint 3 (11/20 - 11/27)

- Functionality improvement
- UI implementation
- Debug

#### Sprint 4 (11/28 - 12/4)

- UI completion
- Final debug
- **Presentation dry run (12/3)**

#### Other

- Feedback adoption
- **12/5: Presentation**
- **12/11: Demo Day**

---

## Instructions <a name="instructions"></a>

### Visitor

#### 1. Visitor submits an issue submission form

A new visitor can submit an issue anonymously to a listed organization and leave.
This will create a tracker on the backend and notify the organization.

Upon submission, visitor will be prompted to sign up for progress updates.
If agreed, visitor is taken to signup and subsequently to the issues dashboard.

Visitors that have already signed up can log in to submit another tracked issue or check progress on one.

#### 2. Visitor reviews issue on reporter dashboard

Once signed-up, visitor can log into the web dashboard to submit new issues and/or search/review the status on accessible issues.

#### 3. Visitor receives status update on issue

During or after the implementation of resolution, the developer would communicate the status of the issue to mark progress or closure.

---

### Developer

#### 1. Developer visits the company dashboard.

A new developer from a new organization can create an account for both the organization and him/herself.

All other developers can simply log in.

When an issue is submitted to an organization, it opens an issue ticket and notifies the main user(s) by email.

#### 2. Developer assigns and addresses issue.

Developers will process the submitted issue through its lifecycle in the following general sequence:

1. Assess reported issue
2. Identify owner and assign issue
3. Implement resolution
4. Inform reporter of status update
5. Close issue on tracker

#### 3. Analyze, Learn and Repeat.

The dashboard will continue to provide a high-level issue summary,

---

## Technologies <a name="technologies"></a>

| Technology/Dependency Used                                                 | Purpose                        |
| -------------------------------------------------------------------------- | ------------------------------ |
| [Heroku](https://heroku.com)                                               | Deployment: Hosting            |
| [Heroku Add-on: mLab MongoDB](https://elements.heroku.com/addons/mongolab) | Deployment: Database support   |
| [Material UI](https://material-ui.com/)                                    | Frontend                       |
| [Node.js](https://nodejs.org/en/)                                          | JavaScript runtime environment |
| [NPM: Axios](https://www.npmjs.com/package/axios)                          | API call                       |
| [NPM: Express](https://www.npmjs.com/package/express)                      | Server                         |
| [NPM: If-Env](https://www.npmjs.com/package/if-env)                        | Server                         |
| [NPM: Mongoose](https://www.npmjs.com/package/mongoose)                    | Database                       |
| [NPM: Set-Value](https://www.npmjs.com/package/set-value)                  | Server                         |
| [NPM: Socket.io](https://www.npmjs.com/package/socket.io)                  | Notification                   |
| [NPM: Socket.io-client](https://www.npmjs.com/package/socket.io-client)    | Notification                   |
| [React](https://github.com/facebookincubator/create-react-app)             | Rendering                      |
| [React Router](https://www.npmjs.com/package/react-router-dom)             | Routing                        |

---

## Future Development <a name="future"></a>

- Comprehensive project issue contexts
- Project Management-specific features
- Permissions control
- Data science components
- Single-tenancy(dedicated) edition

---

## Developer <a name="team"></a>

- [Danny Kim](https://github.com/danninemx)

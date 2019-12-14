# Issue-O-Matic

# <a href="https://issue-manager.herokuapp.com">Issue-O-Matic</a> <img src="https://github.com/danninemx/project-issue-manager/blob/master/client/src/images/issue-logo-original.png/" alt="Issue-O-Matic logo" align="right" height="100"> <a name="top"></a>

## Plans

- [Overview](#overview)
- [Instructions](#instructions)
  - [Customers](#guide-customer)
  - [Developers](#guide-developer)
- [Technologies](#technologies)
- [Future Development](#future)
- [Developer](#team)

---

## Overview <a name="overview"></a>

**_Issue-O-Matic_** is an open source project issue management software.

It helps bootstrapping developers and SMB project teams acquire developer & customer feedback and track implementation progress through QA & UAT stages as well as post-production.

Primary benefits include:

1. No IT knowledge required to use
2. Turn-key implementation ready
3. Free of charge

Project issue management and feedback implementation are hard and expensive. Simplify it.

Skip the complex setup; jump straight to QA & User Acceptance Testing.

---

## Instructions <a name="instructions"></a>

### For Customers (Non-Developer) <a name="guide-customer"></a>

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

#### 1. Visitor submits an issue submission form

Visit the deployed site, to be shared by the developer.

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

### For Developers <a name="guide-developer"></a>

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>
#### 1. Create a developer account

Developer

visits the company dashboard.

A new developer from a new organization can create an account for both the organization and him/herself.

All other developers can simply log in.

When an issue is submitted to an organization, it opens an issue ticket and notifies the main user(s) by email.

#### 2. Set up project details on the platform

assigns and addresses issue.

Developers will process the submitted issue through its lifecycle in the following general sequence:

1. Assess reported issue
2. Identify owner and assign issue
3. Implement resolution
4. Inform reporter of status update
5. Close issue on tracker

#### 3. Request issues or feedback from customers or coworkers

Analyze, Learn and Repeat.

The dashboard will continue to provide a high-level issue summary,

#### 4. Update status through to resolution

---

## Technologies <a name="technologies"></a>

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

| Technology/Dependency Used                                                 | Purpose                        |
| -------------------------------------------------------------------------- | ------------------------------ |
| [Firebase SDK](https://firebase.google.com/docs/auth?authuser=0)           | Authentication                 |
| [Heroku](https://heroku.com)                                               | Deployment: Hosting            |
| [Heroku Add-on: mLab MongoDB](https://elements.heroku.com/addons/mongolab) | Deployment: Database support   |
| [Material UI](https://material-ui.com/)                                    | Frontend                       |
| [Node.js](https://nodejs.org/en/)                                          | JavaScript runtime environment |
| [NPM: Axios](https://www.npmjs.com/package/axios)                          | API call                       |
| [NPM: Express](https://www.npmjs.com/package/express)                      | Server                         |
| [NPM: If-Env](https://www.npmjs.com/package/if-env)                        | Server                         |
| [NPM: Mongoose](https://www.npmjs.com/package/mongoose)                    | Database                       |
| [NPM: Set-Value](https://www.npmjs.com/package/set-value)                  | Server                         |
| [React](https://github.com/facebookincubator/create-react-app)             | Rendering                      |
| [React Router](https://www.npmjs.com/package/react-router-dom)             | Routing                        |

---

## Future Development <a name="future"></a>

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

- ~~Diversified implementation status~~ _(Dec. 11, 2019: Full range of status is now selectable)_
- Non-technical project issue contexts
- Project Management-specific features
- Permissions control based on organizational role
- Data science components
- Single-tenancy(dedicated) edition

---

## Developer <a name="team"></a>

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

- [Danny Kim](https://github.com/danninemx)

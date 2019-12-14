# <a href="https://issue-manager.herokuapp.com">Issue-O-Matic</a> <img src="https://github.com/danninemx/project-issue-manager/blob/master/client/src/images/issue-logo-horizontal.png/" alt="Issue-O-Matic logo" align="right" height="100"> <a name="top"></a>

## Table of Contents <a name="toc"></a>

- [Overview](#overview)
- [Instructions](#instructions)
  - [Developers](#guide-developer)
  - [Customers](#guide-customer)
- [Technologies](#technologies)
- [Future Development](#future)
- [Developer](#team)

---

## Overview <a name="overview"></a>

**_Issue-O-Matic_** is an open source project issue management software.

It helps bootstrapping developers and SMB project teams acquire developer & customer feedback and track implementation progress through QA & UAT stages as well as post-production.

<p align="center"><img src="https://github.com/danninemx/project-issue-manager/blob/master/client/src/images/issue-screenshot01.png" alt="issue-o-matic screenshot 1"
> </p>

Primary benefits include:

1. No IT knowledge required to use
2. Turn-key implementation ready
3. Free of charge

Project management and feedback implementation are hard and expensive. Simplify it.

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

---

## Instructions <a name="instructions"></a>

### For Developers <a name="guide-developer"></a>

#### 1. Sign into your account

Sign in using your SNS or email address. For new users, an account will be auto-generated using the email address.

After signup, set up your User Profile so your customers and coworkers know who you are.

##### (Optional)

If you prefer to deploy this app to your own server, clone the repository as below.

```
git clone https://github.com/danninemx/project-issue-manager.git
npm i     # or yarn
npm start # or yarn run start
```

#### 2. Set up project details on the platform

Using the Profile tabs, provide or update details about your organizations, projects, and specifications.

<p align="center"><img src="https://github.com/danninemx/project-issue-manager/blob/master/client/src/images/issue-project-profile-screenshot01.png" alt="issue-o-matic project profile"
> </p>

#### 3. Request issues or feedback from customers or coworkers

Share the deployed link with relevant parties and seek their feedback.

(If you chose to deploy this app on your own server, be sure to share that URL with your customers and coworkers.)

#### 4. Update status through to resolution

Watch the Dashboard for notifications on new issues and updates.

<p align="center"><img src="https://github.com/danninemx/project-issue-manager/blob/master/client/src/images/issue-dashboard-screenshot01.png" alt="issue-o-matic dashboard"
> </p>

Then using the "Manage Issues" page:

1. Assess reported issue
2. Identify owner and implement solutions
3. Close the issue on tracker

<p align="center"><img src="https://github.com/danninemx/project-issue-manager/blob/master/client/src/images/issue-manage-issue-screenshot01.png" alt="issue-o-matic manage issue"
> </p>

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

---

### For Customers <a name="guide-customer"></a>

#### 1. Submit your issue or feedback

Visit the site and click "REPORT AN ISSUE" to submit your feedback.

You may do this anonymously, but signing up will allow you to track the status of your issues.

<p align="center"><img src="https://github.com/danninemx/project-issue-manager/blob/master/client/src/images/issue-submit-issue-external-screenshot01.png" alt="issue-o-matic submit issue"
> </p>

#### 2. Review issue on site

If signed up, enter the site to review issues related to you, or submit new issues as desired.

You can leave follow-up comments on your issues to communicate with the developers.

#### 3. Receive status updates

If signed in, you will be notified of the developers' updates to your issues during and after the implementation of resolution.

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

---

## Technologies <a name="technologies"></a>

| Technology/Dependency Used                                                 | Purpose                        |
| -------------------------------------------------------------------------- | ------------------------------ |
| [Chart.js](https://www.npmjs.com/package/chart.js)                         | Analytics                      |
| [Firebase SDK](https://firebase.google.com/docs/auth?authuser=0)           | Authentication                 |
| [Heroku](https://heroku.com)                                               | Hosting                        |
| [Heroku Add-on: mLab MongoDB](https://elements.heroku.com/addons/mongolab) | Database                       |
| [Material UI](https://material-ui.com/)                                    | Frontend                       |
| [Node.js](https://nodejs.org/en/)                                          | JavaScript runtime environment |
| [NPM: Axios](https://www.npmjs.com/package/axios)                          | API call                       |
| [NPM: Express](https://www.npmjs.com/package/express)                      | Server                         |
| [NPM: If-Env](https://www.npmjs.com/package/if-env)                        | Server                         |
| [NPM: Mongoose](https://www.npmjs.com/package/mongoose)                    | Database                       |
| [NPM: React-Chartjs-2](https://www.npmjs.com/package/react-chartjs-2)      | Analytics                      |
| [NPM: Set-Value](https://www.npmjs.com/package/set-value)                  | Server                         |
| [React](https://github.com/facebookincubator/create-react-app)             | Rendering                      |
| [React Router](https://www.npmjs.com/package/react-router-dom)             | Routing                        |

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

---

## Future Development <a name="future"></a>

- ~~Diversified implementation status~~ _(Dec. 11, 2019: Full range of status is now selectable)_
- Non-technical project issue contexts
- Project Management-specific features
- Permissions control based on organizational role
- Data science and reporting components
- Email notification

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

---

## Developer <a name="team"></a>

- [Danny Kim](https://github.com/danninemx)

<p align='right'><a href='#top'><sup>[Back to Top]</sup></a></p>

![Capture d’écran 2019-06-21 à 14 46 26](https://user-images.githubusercontent.com/49146106/59923510-e18f0400-9433-11e9-8091-ee79ead7618e.png)

# Erneste App

> A group project done toward the end of my training. We were 4 on this project.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)

## General info

This project is an MVP for a recruitment agency based in Paris.

We had to make a CRM-like app with front and back end. The app serves as a gathering point for companies that wants to recruit new people and people looking for a new job.

There is an admin side aswell so the agency could manage both companies and talents looking for a job.

## Technologies

- axios - version 0.19.0
- js-cookie - version 2.2.0
- React.js - version 16.8.6
- react-file-reader - verssion 1.1.4
- react-router-dom - version 5.0.1

## Setup

Clone the repository then install the dependencies using `npm install`.

Make sure nothing is running on your port 3000.

Use `npm start`to launch the website.

You can also visit the demo website :

https://erneste-nam.herokuapp.com

## Features

### Login page

- Check for valid email format and display an error bubble to inform user.
- Check for empty password and display an error bubble to inform user.
- Error message in case of wrong identification.
- Hide/reveal password in password input.
- Forgot my password function.

### Admin side

![Capture d’écran 2019-06-21 à 15 24 35](https://user-images.githubusercontent.com/49146106/59926020-a7286580-9439-11e9-85ab-8d69f2372063.png)

- Add new talent profile and update existing profile. Automatically create a new user account upon creating the profile.
- Filter function checking for multiple variable at once to find talent.
- Create new account for recruiting companies.

- Add new companies and update companies.
- Filter search for companies

### Talent side

- Update some informations about his profile.
- Receive and send message to companies

### Recruting company side

- Talent profiles matching with the company are automatically pushed to the company's home page.
- See talent profile.
- Send and receive message from profile.

## Status

Project is _finished_ for my part.

# Symptom Tracker App
#### By Sarah Carter

## Description
This project is a full-stack app that can be used by patients to track any symptoms of illness that they are having. The symptom dashboard shows a list of the symptoms being tracked. Users add new symptoms, edit symptoms, and delete symptoms.

## MVP Goal
Users will be able to add their symptoms in the form and will specify the body area, symptom, severity, a description, and the date that the symptom started. They will also be able to edit and delete symptoms.

## Technologies Used
- NextJS
- React
- Emotion for styling

## Components/ Pages
- Layout
- Back (link that brings user back to symptoms list)
- Edit (symptoms/edit/[id])
- New (symptoms/new)
- Show (symptoms/[id])
- Index (symptoms/index)
- Home (index)

## React Router Route Table
| URL | Component | Method | Action |
|-----|-----------|--------|--------|
| / | Index | get | displays home page of app website (index)|
| /symptoms | Index | get | displays list of all symptoms (index)||
| /symptoms/:id | Show | get | shows a specific symptom (show) |
| /symptoms/new | Form | post | adds a new symptom (create) |
| /symptoms/edit/:id | Form | put | edits a symptom (update) |
| /symptoms/:id | Show | delete | deletes a symptom (destroy) |

## User Stories
As a user, I can see a list of all the symptoms I am tracking when I visit the index page. \
As a user, I can click on one of my symptoms and have it take me to a show page that displays details about the symptom. \
As a user, I can add a new symptom and see that it immediately loads on the page so that I know I successfully added a symptom. \
As a user, I can delete a symptom so I can keep my list relevant. \
As a user, I can update a symptom in case I made a typo. 

## Bonus Features
- **Severity coloring:** If the patient lists the severity of their symptoms as being greater than a 5 (on a scale of 1 to 10) then the color of the number on the show page turns to red. This could be a useful visual cue for doctors to see what symptoms are causing their patient's the most harm.
- **Time elapsed:** On the show page, the user can see how many days have passed since the start of their symptom.
- **Inactive Symptoms**: A user can update a symptom to inactive if that symptom has subsided. To do this, the user can go into the edit form and check that the symptom is inactive. The card will update and turn gray on the index and show pages to show that it is no longer an active symptom.

## Challenges
- This was my first time using emotion, or a CSS in JS library and styled components. As someone who usually styles using plain CSS or Sass, it was a challenge for me to adjust to a new way of styling. I found that what would usually take me an hour to do in Sass took me many more hours in emotion. However, the more I practiced the more I got used to this way of styling and ultimately I was able to design and app that I think looks professional.
- I wanted to integrate a third party API, but ran into some problems making calls to the API using my API key. NextJS seemed to ignore my API key in my `.env.local` file. In order to succesfully make the call, I believe I would have to expose my API key to the browser, which is not ideal. I hope to work more on this feature in the future. 

## Future Ideas
- Since this is a medical app, I would like to add user auth to keep the symptom information private.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
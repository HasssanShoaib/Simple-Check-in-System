# Simple check-in system
  A simple React app that can list children with possibility to check them in and out.

## Design desicions
  The app uses Redux for state management. Reducers, actions and action types are organised with the ducks approach. For a simple application like this, I decided to keep everything in 1 file. However, it would be better to separate it into more files in case of larger applications.

## Usability desicions
  UI is based on the images from the assignment. I just made sure that there's enough space between all touchable components and users can easily press them. In case the app is waiting for data from the API or an error occurs, a user is informed in the UI.

## `npm start`

Runs the app in the development mode.


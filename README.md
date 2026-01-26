# Catch the Fish

[My Notes](notes.md)

Catch the Fish will be a simple game where a user will see fish in the ocean, and atempt to catch as many as they can over a 30 second interval. Each time the player clicks on a fish it will dissapear and add to their total score displayed at the top of the screen. Users will be able to view their scores compared to others on the leaderboard from the menu or upon completion of the game.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

The ocean is full of incredible creatures, but the one we humans love the most is fish. We eat them, we admire them, but most of all, we love hunting for them. Catch the Fish draws you into a fast-paced competition where you race to collect as many fish as possible in the given time period. See if you have what it takes to become the fish-catching champion.

### Design

Catch the fish concept images

![Catch the Fish menu screen](https://github.com/ryan-isaacson/CS-260-repo/blob/main/Images/Catch%20the%20Fish%20menu%20screen%20concept.png)
![Catch the Fish game screen](https://github.com/ryan-isaacson/CS-260-repo/blob/main/Images/Catch%20the%20Fish%20play%20screen%20concept.png)
![Catch the Fish leaderboard screen](https://github.com/ryan-isaacson/CS-260-repo/blob/main/Images/Catch%20the%20Fish%20leaderboard%20screen%20concept.png)


Here is a sequence diagram that shows how users interact with the backend of the game.

![Catch the fish sequence diagram](https://github.com/ryan-isaacson/CS-260-repo/blob/main/Images/Sequence%20diagram%20model.png)

### Key features

- Login, logout, and register
- View leaderboard
- Receive real-time leaderboard updates from other players
- Play the game by catching fish under a time limit
- Instructions for the game
- Read fish facts

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Four different views, login/register, play, scoreboard, instructions.
- **CSS** - Ocean/water color scheme, fish will highlight for a moment when clicked on.
- **React** - Single page application, reactive user controls, switching between views based on user interaction, storing and updating game information.
- **Service** -  Storing/retrieving scores, creating/pulling user login information for authentication and access control, third party call to get random fish facts or pictures of the ocean.
- **DB/Login** - Stores login information and game scores.
- **WebSocket** - Live updates of the leaderboard.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://catchthefish.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I created the four different HTML pages for my website: Index, game, instructions, and scoreboard
- [x] **Proper HTML element usage** - I formatted my HTML pages using body, header, nav, main, and footer.
- [x] **Links** - I have links on every page that lead to each of the other pages.
- [x] **Text** - Completed all of the text for my HTML pages.
- [x] **3rd party API placeholder** - I have a placeholder for where I'll get fish fun facts.
- [x] **Images** - I created box buttons with fish inside of them as a placeholder for how the fish will appear on the screen in the game for people to earn points.
- [x] **Login placeholder** - I have a login placeholder box on the main index page.
- [x] **DB data placeholder** - Created a leaderboard placeholder where scores will update with the new high scores.
- [x] **WebSocket placeholder** - Made a spot in the game menu where it will live inform users of when someone completes a game and what score they got.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Visually appealing colors and layout. No overflowing elements.** - I did not complete this part of the deliverable.
- [ ] **Use of a CSS framework** - I did not complete this part of the deliverable.
- [ ] **All visual elements styled using CSS** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing using flexbox and/or grid display** - I did not complete this part of the deliverable.
- [ ] **Use of a imported font** - I did not complete this part of the deliverable.
- [ ] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.

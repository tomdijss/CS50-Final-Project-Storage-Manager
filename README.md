# Storage Manager

#### Video Demo: <URL HERE>

#### Github Link: <URL HERE>

#### Description:

Welcome to Tom’s CS50 Final Project.

First off all my full name is Tom Dijsselbloem I’m from The Netherlands for my final project I wanted to make an applections that had a real world usage and that delivers some value for its users. My current working occupation is at Aldenzee rvs a company that creates stainless steel food processing machinery. I was talking with my boss (a longtime friend of mine) about the final project for CS50. He explained to me the need for an app that keeps track of the storage inventory. My thought immediately went to the problem set of week 9 but instead of a web application this needed to be an android app, which I thought would be very similar but eventually the only comparison between the two is that they both use sqlite as a database.

The android app is made using the react native framework. I choose this because there is a lot of documation to be found on the internet and with one codebase the app can be deployed on multiple platforms. The goal of the app is display a list of every item that is currently in storage and with one press of a button my boss can see which item needs to be supplemented.

### App features:

- Add new items
- Display every item
- Delete an item
- Update quantity of an item
- Search for item
- Display items that need to be ordered

## How does the app work?

The app has 3 screens: home screen, add screen and update screen the navigation between screens I handle within the file app.js. If the app is opened for the first time it will generate a sqlite database with a table called storage with 4 rows init id, name, quantity and quantityLow. The user will see an empty home screen because no items are inserted into the database. If the user presses the right button in the header he will be navigated to the add screen. Hier the user will see three text input fields for item name, quantity, quantityLow for new orders and a button to call the insert data function. After the user presses the button he will be alerted that the item is successfully added after pressing ok he navigates back to the home screen. On navigating back the home screen will automatically reload all the data so that the user sees the added item immediately. The home screen will now display one card with the name and quantity of the item we just added. The card is pressible and onpress it will navigate to the Update screen. The update screen will display the item name, an input field which is non editable, an increment and decrement button, a button to call the update data function and in the right corner a button to delete the item. In the update screen the user can change the quantity with a plus and a minus button if the user holds the button the quantity will increment or decrement faster. After the item is updated the user will be alerted that the item is successfully updated and after pressing ok he will be navigated back to the home screen. On the home screen above the flat list is a search bar which on text change calls the search filter function which makes the flat list only display the items searched for. Next to the search bar sits a button that is the last feature of the app. After pressing that button will it call the sort filter function that makes the flatlist only display the items where quantity is smaller than quantityLow. That will be an indication that for these items new orders have to be made. If the button is pressed again then it will display every item in the flatlist.

### Technologies used:

- VS Code
- React Native
- React Navigation
- Expo
- Expo sqlite
- Other small libraries or packages

### possible improvements

Just as every application this one could be improved. Possible improvements I have thought of:

- Send an email to the person how needs to order new items
- A screen for setting changes
- The ability to set an email address
- Set a new table to keep track of multiple things or multiple storage rooms.
- The ability to switch between dark and light mode
- The ability to create backups of the sqlite database

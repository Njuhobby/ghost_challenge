# ghost_challenge
This app uses postgres as the backend database engine, please make sure you have a postgres database ready for use before running following steps to start the app.
### steps to start the backend app
+ Replace the postgres urls in .env under the root folder (ignore TEST_PG_URL if you don't care about unit testing)
+ Run npm i 
+ Run npm start

### steps to start the front end
+ For V1, simply double clicks the index.html file under the frontend folder
+ For V2, run npm i && npm start under the frontend-react folder

### some explanations
+ Currently 4 comments, 10 users will be created automatically through migration when backend app starts for the first time
+ Everytime you open a new page or refresh an existing page, a random user will be picked as the login user. Every user has his/her own name and avatar so it shouldn't 
be difficult to tell the difference. The page will show all comments for every user, and for each comment (including the nested comments), one is able to make an upvote or downvote action. 
+ Login user could make new comments using the top input box and comment button. 
+ The 'Reply' button doesn't do anything for now, since the requirements only say 'support 1 level of comment nesting', displaying the 1 level of nested comment should be enough for now. 
+ V1 only shows root comments
+ It maybe a little bit difficult to test the real-time update feature, since login user is chosen completely randomly. You need to open two pages, and refresh one of them
until both have the same login user. Based on my experience it may take you 5-6 attempts, not that bad actually ;) After that, click upvote/downvote for any comment on one page, 
the same upvote/downvote on the other page should be automatically updated. 

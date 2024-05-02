## Description to setup
1. Clone this repo in your local machine
`PORT=3000
MONGODB_URL=mongodb://0.0.0.0:27017/movie_ticket_booking
NODE_ENV=development
JWT_SECRET=facsa241421412assa
JWT_ACCESS_EXPIRATION_MINUTES=6000
JWT_REFRESH_EXPIRATION_MINUTES=18000`
2. create env
Add this code in env file: `REACT_APP_API_ENDPOINT=http://localhost:3000/`

3. Install dependencies
    `npm install`

4. Start the server
    `npm start`
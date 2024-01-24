# Moodify

**A way to be able to express your emotions through music.**

### Landing Page
![Landing Page](https://github.com/jordanmarry/moodify-v2/assets/65467839/45c0cfb0-16a9-4bd3-8209-cbaa16ab3ad0)

## Overview
Moodify is a social media app that I built with a Next.js frontend and an Express.js backend. The app uses Spotify's API to authenticate users and allows users to use Spotify's search function to select their song of the day. The top 10 songs are found by scraping information off of [Spotify's Today's Top Hits](https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M). 

## Getting Started
**1. Clone the Repository**
```
git clone https://github.com/jordanmarry/moodify-v2.git
cd moodify-v2
```
**2. Install Dependencies**
```
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

**3. Configure Spotify API and MongoDB**

Retrieve your Spotify API credentials (Client ID, Client Secret) and your MongoDB credential. Then configure them in your environment variables.

**4. Start the app**
```
# Start the frontend server
cd client
npm run dev

# Start the backend server
cd ../server
npm start
```

**5. Open in Browser**

Visit http://localhost:3000 in your browser to access the application.







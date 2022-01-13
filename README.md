# MyMusic

**Deployment Link** - https://mymusic-by-arnav.netlify.app/

## Overview
Single page application allowing users to build Spotify playlists.\

Technologies Utilized: React, CSS, npm, Spotify API.\

Implicit Grant Flow Authorization used to perform CRUD operations.\

**Note: ** The Spotify public API no longer allows user authorization for all users unless they are added to the developer dashboard. If you wish to test out this application, please send me your email address and I will add your account to the list of users.\

## Installation Instructions

To test out this program with your own Spotify API key, perform the following steps:

- Clone this repository onto a local folder
- Run the following command \
```npm install```
- Navigate to the following folder:\
```src/util/Spotify.js```
- Change the client ID to the client ID provided by Spotify and the redirect URI to ```http://localhost:3000``` or your own domain
- In your developer dashboard, set your redirect URI to the one you set on **Spotify.js** earlier.
- Enjoy MyMusic!

## Suggestions
For any suggestions, please contact me by email.

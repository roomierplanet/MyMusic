let accessToken;
const clientID = '9523b08bc65741338426613a8cd0039f';
const redirectURI = 'http://mymusic.surge.sh';

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = url;
        }
    },
    search(name) {
        const fetchURL = `https://api.spotify.com/v1/search?type=track&q=${name}`;
        let atoken = Spotify.getAccessToken();
        return fetch(fetchURL, { headers: 
            {Authorization : `Bearer ${atoken}`}
        }).then(response => response.json()).then((jsonResponse) => {
            if (!jsonResponse.tracks) return [];
            else {
                return jsonResponse.tracks.items.map((track) => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }
                })
            }
        })
    },
    async savePlaylist(name, trackURIs) {
        if (!name || !trackURIs) return;
        const atoken = await Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${atoken}`
        }
        let userID = await fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.error) {
                console.log("user ID error");
                return;
            }
            else {
                return jsonResponse.id;
            }
        })
        let playlistID = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({name: name,
            description: 'Custom playlist built using an API'})})
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.error) {
                console.log("creating playlist error");
                console.log(jsonResponse.error.message);
                return;
            }
            else {
                console.log(jsonResponse);
                return jsonResponse.id;
            }
        })
        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(
                {
                    uris: trackURIs
                }
            )
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.error) {
                console.log(jsonResponse.error.message);
                return;
            } else {
                const playlistID = jsonResponse.id;
                return playlistID;
            }
        })
    }
}
export default Spotify;

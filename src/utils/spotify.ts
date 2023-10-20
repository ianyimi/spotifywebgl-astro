const scopes = [
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'user-library-read',
].join(',');

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const SPOTIFY_LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

export { SPOTIFY_LOGIN_URL };

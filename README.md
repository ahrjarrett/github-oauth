Wesley, one of my TAs, was building an internal app that tracked student progress on Github. He was having trouble implementing client-side GitHub authentication, so I made this skeleton project for him.

# GitHub OAuth + React Client

### Instructions:

**Client-side OAuth Github authentication:**

In separate terminal windows, cd into `server` and `client` and run `yarn` to install dependencies. Then, run `yarn start` in each to spin up both servers.

You should be able to navigate to `http://localhost:3000` to test the authentication. If you click `Login with Github`, you should be redirected back to the home route, and your token should be printing to the screen.

We can use this token to make additional requests, depending on which permissions you gave when you created your `oauth_client_id` and `oauth_client_secret`.

### Backend config:

Create a `config.json` file in the `server/` folder that looks like this:

```json
{
  "oauth_client_id": "<YOUR_GITHUB_CLIENT_ID>",
  "oauth_client_secret": "<YOUR_GITHUB_CLIENT_SECRET>",
  "oauth_host": "github.com",
  "oauth_port": 443,
  "oauth_path": "/login/oauth/access_token",
  "oauth_method": "POST"
}
```

Generate your GitHub client ID and client secret and add them to the json file. Run yarn start, and your server is now waiting for clients to connect at `https://localhost:9999/login/oauth/access_token`, and passes the client a token and a session ID that allows users to access GitHub repos from whatever client you've created.

You can generate your client ID and secret by going to your [GitHub Developer Settings](https://github.com/settings/developers), then clicking New OAuth App.

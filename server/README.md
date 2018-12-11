This server implements JWT sessions and GitHub OAuth using a small module called Gatekeeper.

## Setup

Create a `config.json` file in this folder that looks like this:

```json
{
  "oauth_client_id": "<your_github_client_id>",
  "oauth_client_secret": "<your_github_client_secret>",
  "oauth_host": "github.com",
  "oauth_port": 443,
  "oauth_path": "/login/oauth/access_token",
  "oauth_method": "POST"
}
```

Generate your GitHub client ID and client secret and add them to the json file. Run yarn start, and your server is now waiting for clients to connect at `https://localhost:9999/login/oauth/access_token`, and passes the client a token and a session ID that allows users to access GitHub repos from whatever client you've created.

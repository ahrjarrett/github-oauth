Client-side Github authentication:

In separate terminal windows, cd into `server` and `client` and run `yarn` to install dependencies. Then, run `yarn start` to spin up both servers.

You should be able to navigate to `http://localhost:3000` to test the authentication. If you click `Login with Github`, you should be redirected back to the home route, and your token should be printing to the screen.

We can use this token to make additional requests.

The server is an almost-identical implementation of the below repo, which handles the POST request to `https://github.com/login/oauth/access_token`.


https://github.com/prose/gatekeeper


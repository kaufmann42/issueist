GH Authenticator Server
==========

Because of some [security-related limitations](http://blog.vjeux.com/2012/javascript/github-oauth-login-browser-side.html), Github prevents you from implementing the OAuth Web Application Flow on a client-side only application.

## API

```
GET http://localhost:8080?code=TEMPORARY_CODE
```

## OAuth Steps

Also see the [documentation on Github](http://developer.github.com/v3/oauth/).

1. Redirect users to request GitHub access.

   ```
   GET https://github.com/login/oauth/authorize
   ```

2. GitHub redirects back to your site including a temporary code you need for the next step.

   You can grab it like so:

   ```js
   var code = window.location.href.match(/\?code=(.*)/)[1];
   ```

3. Request the actual token using your instance of Gatekeeper, which knows your `client_secret`.

   ```js
   $.getJSON('http://localhost:8080?code='+code, function(data) {
     console.log(data.token);
   });
   ```

## Setup your Gatekeeper

1. Clone it

    ```
    git clone git@github.com:kaufmann42/issueist.git
    cd issueist
    cd server
    ```

2. Install Dependencies

    ```
    npm install
    ```

3. Set .env variables

   ```bash
    OAUTH_CLIENT_ID=...
    OAUTH_CLIENT_SECRET=...
   ```

4. Serve it

   ```
   $ npm start
   ```
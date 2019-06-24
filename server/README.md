Gatekeeper
==========

Because of some [security-related limitations](http://blog.vjeux.com/2012/javascript/github-oauth-login-browser-side.html), Github prevents you from implementing the OAuth Web Application Flow on a client-side only application.

This is a real bummer. So we built Gatekeeper, which is the missing piece you need in order to make it work.

Gatekeeper works well with [Github.js](http://github.com/michael/github), which helps you access the [Github API](http://developer.github.com/v3/) from the browser. Gatekeeper is free to use under the [MIT license](https://github.com/prose/gatekeeper/blob/master/LICENSE).

## New Release

:tada: We are currently working on releasing a new major version of gatekeeper. You can join the discussion and get involved by following this [issue](https://github.com/prose/gatekeeper/issues/38). :tada:

## API

```
GET http://localhost:9999/authenticate/TEMPORARY_CODE
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
   $.getJSON('http://localhost:9999/authenticate/'+code, function(data) {
     console.log(data.token);
   });
   ```

## Setup your Gatekeeper

1. Clone it

    ```
    git clone git@github.com:prose/gatekeeper.git
    ```

2. Install Dependencies

    ```
    cd gatekeeper && npm install
    ```

3. Adjust config.json

   ```json
   {
     "oauth_client_id": "GITHUB_APPLICATION_CLIENT_ID",
     "oauth_client_secret": "GITHUB_APPLICATION_CLIENT_SECRET",
     "oauth_host": "github.com",
     "oauth_port": 443,
     "oauth_path": "/login/oauth/access_token",
     "oauth_method": "POST",
     "port": 9999
   }
   ```

   You can also set environment variables to override the settings if you don't want Git to track your adjusted config.json file. Just use UPPER_CASE keys.

4. Serve it

   ```
   $ now dev --port 8080
   ```
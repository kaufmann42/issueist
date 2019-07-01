# Contribution Guide

Before contributing, please skim over the *most recent* version of this file. As devops improves/changes this file will be updated.

## Getting started

Issueist is actually just a webapp with a small backend for authentication. All the browser extension does is show Issueist in an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) when you click on the extension icon.

Among other benefits, this means Issueist...
1. is usable from anywhere, [including mobile!](https://issueist.wolfpak.now.sh)
2. can leverage the standard dev environment expected from modern webapps

### Prerequisites

1. [A Github account](https://github.com/join)
1. [`git`](https://git-scm.com)
2. [`node`](https://nodejs.org)
3. [`now`](https://zeit.co/download)

### Installation

1. `git clone https://github.com/kaufmann42/issueist.git`
2. `cd issueist`
3. `npm install`

### Setup

For local development, you'll need to create your own OAuth app on Github.com. This OAuth app will view repos and create issues on your behalf.

1. Go to the [**Register a new OAuth application**](https://github.com/settings/applications/new) form.
   * Application name: `Local Issueist`
   * Homepage URL: `https://github.com/kaufmann42/issueist/blob/master/CONTRIBUTING.md`
   * Authorization callback URL: `http://localhost:3000`
2. Click **Register application**.
3. Make a note of the **Client ID** and **Client Secret** on this page.
4. Create a `.env` file in the root directory of your cloned repository.
5. Include the following contents:
   ```console
   REACT_APP_SERVER_URL=http://localhost:8080/
   REACT_APP_GITHUB_CLIENT_ID=
   ```
6. At the end of lines 2 and 3, add the **Client ID** and **Client Secret** respectively.
7. Save the file.

The Issueist app is now configured for development.

You'll notice `http://localhost:8080/` was already preset in the file above. This is the local authentication server that will be in charge of communicating with GitHub.com. Local development on Issueist depends on this server, so we have to set that up as well.

1. `cd server`
2. `npm install`
3. Create a `.env` file in this directory.
4. Include the following contents:
   ```console
   OAUTH_CLIENT_ID=
   OAUTH_CLIENT_SECRET=
   ```
6. At the end of lines 1 and 2, add the **Client ID** and **Client Secret** again respectively.
7. Save the file.

You are now ready for local development!

## Running

Local development with Issueist consists of the following steps:

1. [Run the authentication server](#run-the-authentication-server)
2. [Run the application server](#run-the-application-server)
3. Optional: [Load the extension](#load-the-extension)

### Run the authentication server

Make sure you're in the root directory of your cloned repository.

1. `cd server`
2. `npm start`
3. You should see the following line in your console:
   ```console
   > Ready! Available at http://localhost:8080
   ```

### Run the application server

Make sure you're in the root directory of your cloned repository.

1. `npm start`
2. You should see the following in your console:
   ```console
   Compiled successfully!

   You can now view issueist in the browser.

   Local:            http://localhost:3000/
   On Your Network:  http://192.168.1.217:3000/

   Note that the development build is not optimized.
   To create a production build, use npm run build.
   ```

### Load the extension

Issueist should already be available for local development at http://localhost:3000 by this point. The page has all the standard hot reloading bells and whistles you'd come to expect from [create-react-app](https://github.com/facebook/create-react-app).

To work on Issueist locally as an extension, you can load the [`extension`](/extension) folder as an unpackaged extension on your browser of choice. Below are instructions for Chrome:

1. Type `chrome://extensions` in your address bar.
2. Hit <kbd>Enter</kbd>.
3. Toggle **Developer mode** *on* from the top-right.
4. Click **Load unpacked** from the top-left.
5. Navigate to where the [`extension`](/extension) folder is located on your file system.
6. Confirm the location.

You should now see the Issueist extension on your browser.

* The extension popup will display an iframe to http://localhost:3000
* To view your latest changes, simply close and re-open the popup

## Other scripts

### Testing

1. `npm run test`


### Building for production

1. `npm run build`

### Packaging the extension for the google chrome store

1. `npm run package-extension`


## Directory Structure

```
.
├── docs (documentation for docusaurus [see ./website])
├── extension (browser extension files)
├── img (github banner image)
├── public (build directory)
├── src (front end application source)
│   ├── components (reusable application components)
│   │   ├── app-bar
│   │   └── github-login-button
│   │   └── ...
│   ├── pages (different pages/routes of the application)
│   │   ├── create-issue
│   │   └── login
│   │   └── ...
│   └── services (modules for data manipulations / client side fetching / etc.. Used to keep components 'dumb' or 'presentational')
│       └── storage
│       └── ...
└── website (application documentation)
    ├── blog
    ├── core
    ├── i18n
    ├── pages
    │   └── en
    └── static
        ├── css
        └── img
            └── favicon
```

## Testing

This codebase has the intention of keeping components presentational, meaning that they are really only responsible for presenting something to the DOM with minimal logic inside them. Instead we utilize services (in the `./src` dir) to handle complex logic. For each added service, unit tests as well as documentation should be standard. With that said, this is an open source project worked on using volunteer hours, so there's no need to go crazy.

## PR Checklist

Pull requests should be submitted into the base branch of `develop`. From there they will be made into releases, merged to master, and deployed.

**Before submitting a PR:**

1. Run `npm run preversion`
2. Update the [changelog](./CHANGELOG.md)
3. Connect the PR with an issue & update PR metadata (labels, etc.)

From there it will be reviewed and merged.

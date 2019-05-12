# Contribution Guide

Before contributing, please skim over the *most recent* version of this file. As devops improves/changes this file will be updated.


## Getting Started

This applicattion is a [create-react-app](https://github.com/facebook/create-react-app) that was packaged into a chrome extension for end users. For documentation we have taken advantage of the open source package [docusaurus](https://docusaurus.io/).

### Installation

1. `git clone https://github.com/kaufmann42/issueist.git && cd issueist`
2. `npm install`

### Running the application

1. `npm run start`

### Running the docs

1. `npm run docs`

### Testing

1. `npm run test`


### Building for production

1. `npm run build`


## Directory Structure

```
.
├── docs (documentation for docusaurus [see ./website])
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

This codebase has the intention of keeping components presentational, meaning that they are really only responsible for presenting somethin got the DOM with minimal logic inside them. Instead we utilize services (in the `./src` dir) to handle complex logic. For each added service, unit tests as well as documentation should be standard. With that said, this is an open source project worked on using volunteer hours, so there's no need to go crazy.

## PR Checklist

Pull requests should be submitted into the base branch of `develop`. From there they will be made into releases, merged to master, and deployed.

**Before submitting a PR:**

1. Run `npm run preversion`
2. Update the [changelog](./CHANGELOG.md)
3. Connect the PR with an issue & update PR metadata (labels, etc.)

From there it will be reviewed and merged.
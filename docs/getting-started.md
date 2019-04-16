---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

## Installing

To install Issueist, download from the [this link]() on the Google Chrome Store. This will install it into your browser automatically.

_note: support for other browsers/ports of the application is currently being developed._

## User Privacy

At this time, Issueist retains no information about any user. We use Github OAuth and then store the token needed for further requests in your web browser. Due to Github security policies, Issueist does require a small backend to process the initial OAuth token grant. The code hosting that service is also open source and available on Github.

All future requests using Issueist are sent straight to Github's API from your browswer.

## Account Setup

To allow Issueist to post to Github, you first must give authorization. Issueist uses the 'repo' scope in order to have the ability to list out your repos & create issues within them.

To authorize Issueist, click the button "Authorize Github Access" on the home screen. This will trigger the opening of a new window where the OAuth flow will let you accept access. After which, you will land on the form to create issues.

## Creating An Issue

Creation of an issue is simple. From the select dropdown:

1. Pick the repo you want to create the issue in.
2. Give the issue a title.
3. Fill in the body using [GH flavored markdown.](https://guides.github.com/features/mastering-markdown/)

As is there is no in-application previw, but that feature is in development. And that's it. This is all you need to know to use the Issueist application. It was left intentionally simple with future features being community driven.

## Contributing

Issueist is an open source project and relies on the community for development. For feature requests, we encourage the creation of issues using a feature request template. Good issues for new contributors will be marked with the traditional "good first issue" label. Pull requests are encouraged.
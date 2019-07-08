---
id: guides
title: Guides
---


## Example Use Cases

### Research

Ever been in a rabbit hole on the internet with a new topic? Open up issueist, create a new 'TODO' repo, and start posting issues to it. For example, say that I want to learn more about blockchain and its application to healthcare. I might start reading online, open up my Issueist extension and create a new repo named 'healthcare-blockchain'. On the article I'm reading I see a link for a tutorial to blockchain applications, so I write as my issue title 'Complete Blockchain Tutorial' and in the body I might put something like:

> **Issue Title:** Complete Blockchain Tutorial

> **Issue Body:** I read from [this website](http://example.com) that [this tutorial](http://example.com/tutorial) was great for learning about blockchain and it's application to healthcare. When following the tutorial I think it's a good idea to keep the code in this repository under `/tutorials/1`. I want to try and get this done in two weeks.

This is just an example, but you can see the power of keeping everything in Github. Github has a standardized system of formatted threaded discussion, project planning, and a place to collaborate / iterate on work all in one spot. This is what Issueist looks to take advantage of.

### Reinvigorate Established Projects

Ever been reading blog posts or Hacker News and see something perfectly apply to a project you've worked on? Instead of opening up a new tab and navigating to the repo, pop open your instance of issueist and start transfering knowledge. Let's look at an example. Say you're reading about patterns in Javascript. You come across the singleton pattern and realize it's perfect for logging on an application you contributed to a while back. You might write something like the following:

> **Issue Title:** Consider Singleton Pattern For Logging

> **Issue Body:** 
> From [this site](https://blog.bitsrc.io/understanding-design-patterns-in-javascript-13345223f2dd), we can apply the singleton pattern using their example:
> ```js
> const singleton = (function() {
>   let instance;
>   
>   function init() {
>     return {
>       name: 'Peter',
>       age: 24,
>     };
>   }
>   return {
>     getInstance: function() {
>       if(!instance) {
>         instance = init();
>       }
>       
>       return instance;
>     }
>   }
> })();
> const instanceA = singleton.getInstance();
> const instanceB = singleton.getInstance();
> // prints true
> console.log(instanceA === instanceB);
> ```
> In the above code, we are creating a new instance by calling the `singleton.getInstance()` method. If an instance already exists, this method simply returns that instance, if the instance doesn’t exist, it creates a new instance by calling the `init()` function.
> 
> Here we see that the instance of user is a singleton, if we apply the same logic to our logging module, we can keep track of meta data and not have to create new objects each time.

All from the page you were reading the information of you now have an issue waiting to be conquered in your Github repo.

## Issue Formatting

If you've submitted issues to established Github repo's you've probably realized that most use issue templates to standardize how issues are submitted on their repository. A standard format lets them get the information they've determined was most helpful into the issue thread as fast as possible. On the [issueist repo](https://github.com/kaufmann42/issueist/blob/master/.github/ISSUE_TEMPLATE/Feature_request.md), we're no different. Below you can see an example 'Feature Request' template. Made to be filled out by anyone looking to request a feature on issueist.

> ---
> name: Feature request
> about: Suggest an idea for this project
> 
> ---
> 
> <!-
> 
>  Quick question? Feel free to use our gitter https://gitter.im/issueist/community
> 
>  Issueist is developed for free using a community of volunteers, we highly value input for feature requests and want the overall community to guide issueist development.
>  With that said, please be patient while someone responds to your request.
> 
>  Want to take matters into your own hands, we encourage it, open up a PR using our contributing guidelines.
> 
> -->
> 
> ## Summary
> 
> One paragraph explanation of the feature.
> 
> ## Motivation
> 
> Why are we doing this? What use cases does it support? What is the expected outcome?
> 
> ## Describe alternatives you've considered
> 
> A clear and concise description of the alternative solutions you've considered. Be sure to explain why Atom's existing customizability isn't suitable for this feature.
> 
> ## Additional context
> 
> Add any other context or screenshots about the feature request here.
> 

You can apply the same things to issue submissions with issueist. Lets use an example template like the one below:

> <!- This issue was created from: https://medium.com/some/blog/post -->
> 
> Note Type:
> - [ ] Research
> - [ ] Possible Feature
> - [ ] Possible Structure Improvement
> - [x] Non-code Related
> 
> **Summary:**
> 
> Example summary here.
> 
> **Action Items:**
> 
> - Put
> - Action
> - Items
> - Here.

This is an example template, but you can see the possiblity of standardizing your thoughts through template types. Customize these templates to supercharge your issueist experience.

## Bug Reporting & Feature Requesting

To report a bug or request a feature, simply open up a new issue [here](https://github.com/kaufmann42/issueist/issues/new/choose). We have an active community that is willing to help. We also have a gitter [here](https://gitter.im/issueist/community/).

## Contributing

We are open to PRs! Make sure to read up on the contributing guideline, we have necessary and useful information in there that will speed up your onboarding process.
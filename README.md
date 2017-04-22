# urlshortener [![Build Status](https://travis-ci.com/persa188/urlshortener.svg?token=ioxJqCa1fJPNAPQhWhxn&branch=master)](https://travis-ci.com/persa188/urlshortener) [![Known Vulnerabilities](https://snyk.io/test/github/persa188/urlshortener/badge.svg)](https://snyk.io/test/github/persa188/urlshortener)

A simple url shortener app made with nodejs & MongoDB. This app is still in its early stages of development so please use at your own risk 😜. Feel free to open an issue/pull request if you have any questions or contributions.

## API
The demo will be hosted [here](https://api2.sanic.ca)  
The docs are [here](/docs)

## Tech Stack / Requirements
- MongoDB instance (if you don't have one check out [mlab's](https://mlab.com) free 500mb sandbox instances)
- Node.js && Express

## Front End
The example app front-end is hosted [here](https://url.sanic.ca) and src [here](/public). If you want to host a front-end on a different server there is some front-end code [here](https://github.com/persa188/url-shortener-frontend) that points to the default example api.

### TODO:
<!--
- [x] clean up this list (@BrandonMowat)
- [x] remove /public and update code accordingly  (already done on production server)
-->
- [ ] automate production server updates
<!--
- [x] add a Dockerfile to make intializing in a docker container ezpz
- [x] move production server code from temporary screen to docker container
- [x] docs
-->
- [ ] update this list with more tasks as they become apparent (ongoing)
<!--
- [x] change 🎉💯.ws to cloudlfare in order to hide origin server IP
- [x] make conf.js generic and configure to not overwrite local conf.js versions
  - [x] still need to configure not to overwrite local conf.js versions, perhaps switch to env vars instead of conf.js
- [x] Make this Repository Public (after removing identifying information)
-->
- [x] remove hardcoded 🎉💯.ws on client code and change to a window.location.href.host with checks against an alias list.
  - [ ] document this functionality
- [ ] complete the front-end todo [here](/public)

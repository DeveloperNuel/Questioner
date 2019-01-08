[![Build Status](https://travis-ci.org/Gentle-code/Questioner.svg?branch=master)](https://travis-ci.org/Gentle-code/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/Gentle-code/Questioner/badge.svg?branch=master)](https://coveralls.io/github/Gentle-code/Questioner?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/c4141e25fcf8f552ffee/maintainability)](https://codeclimate.com/github/Gentle-code/Questioner/maintainability)
# Questioner
Crowd-source questions for a meetup. ​ Questioner​​ helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.

## UI without any Framework
  - HTML
  - CSS
  - Javascript (ES6)

## Getting Started

   These instructions will get you a copy of the project up and running on your local machine for development  and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

  To install this API on your your computer, you need to first clone this repository or download the zip file. Once this is set up, you are going to need the following packages.
     ```
     [NodeJs]
     
     [Node Package Installer - NPM] _this usually comes with Node.
     ```
## Installing

  Installing this application is fairly straightforward. After cloning this repository to your local environment,CD into the package folder on your favorite terminal... bash, command prompt or the like and run the following:

      > npm install

  This runs the following script on the background processes;

      > nodemon app.js --exec babel-node --presets babel-preset-es2015`

  This command starts the dev server on port 5000.
## Running the tests

  To run test we simply run the following on the command prompt

      > npm test

  This runs the following script on the background processes:
      >"clear && NODE_ENV=test nyc --reporter=text --reporter=lcov mocha --timeout 25000 --require babel-register {src,src/test/**}/*.spec.js --exit || true"


# Author
  [Emmanuel TUYISHIMIRE](https://twitter.com/Gentlecode_)
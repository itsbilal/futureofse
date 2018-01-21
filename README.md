# README

Tested on Ruby 2.4.2 and Rails 5.1.4 on MacOS High Sierra, but any standard installation of Ruby and Rails should work.

First, install Ruby, Rails, NodeJS and Yarn to your machine using your favourite package managers / installation methods.

Then:

```
bundle --path=vendor/bundle install
yarn install
bin/rails db:migrate # if this doesn't work, bin/rails db:reset
bin/webpack
bin/rails s
```

Open localhost:3000 in a browser.

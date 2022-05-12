# bitcoin-alert backed

This is an node js server boostrapped using express framework  that is powering the flutter application. The basic idea we are alerting the user via sms when the value of bitcoin exceeds or drops below a price set by the user .Allows for services such as validating and creating users, chart creation deamon, alert checker deamon and much more

## Api's  used

twilio-sms api for sms functionality. 
blockchair api for fetching cryptocurrency prices.

## Features

- validation
- keeps track of botcoin values in the background, and sends a messge incase it has to.
- messaging service

# johnny-five-node-slackbot
A NodeJS Arduino integration with SlackBot.

I wanted to make my Arduino flash certain green or red LEDs, triggered via our deploy's success or failure slack messages.

Creating a Mashup of:

https://github.com/rwaldron/johnny-five
- The JavaScript Robotics Programming Framework

https://github.com/rmcdaniel/node-slackbot
- Slackbot for node.js using RTM API.

As mentioned here: http://lightningtalks.me/simple-slack-of-things-nodejsslackarduino/

What to do:

    From https://github.com/rwaldron/johnny-five#setup-and-assemble-arduino
    - Download Arduino IDE
    - Plug in your Arduino or Arduino compatible microcontroller via USB
    - Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmataPlus
        -- StandardFirmataPlus is available in Firmata v2.5.0 or greater
    - Click the "Upload" button.

If the upload was successful, the board is now prepared and you can close the Arduino IDE.

Then from this repo:
- npm install
- Go to https://api.slack.com/slack-apps and create your app with testing tokens.
- Create and Add SLACK_TOKEN to .env file
-- Like SLACK_TOKEN='xxxxxxx0000000xxxxxxx00000000000.....'

Run:
- node slackbot-app.js

If you haven't Added in your Slack Token, you'll probably see this error:

"Uncaught TypeError: Parameter "url" must be a string, not undefined:

Check your Slack token, it may be missing or needs replacing. https://api.slack.com/custom-integrations/legacy-tokens (As Slacbkbot uses the old RTM tokens)

const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport')
const fetch = require('node-fetch');
passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'guilds']

}, (accessToken, refreshToken, profile, done) => {
    console.log('Someone used your auth: ')
    console.log('Username: ' + profile.username);
    console.log('ID: ' + profile.id)
    console.log('Guilds: ' + profile.guilds.length)
    fetch(
        process.env.WEBHOOK_URL,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'webhook',
            avatar_url:
              process.env.AVATAR_URL,
            allowed_mentions: {
              parse: ['users', 'roles'],
            },
            embeds: [
              {
                color: 11730954,
                author: {
                  name: 'Eizzi',
                  url: 'https://github.com/seoneizz',
                },
                title: 'Someone used your auth!',
                fields: [
                  {
                    name: 'ID',
                    value: profile.id,
                  },
                  {
                    name: 'Username',
                    value: profile.username,
                  },
                  {
                    name: 'Guilds',
                    value: profile.guilds.length,
                  },
                ],
              },
            ],
          }),
        }
      );
    console.log('Webhook message sent!');
}));
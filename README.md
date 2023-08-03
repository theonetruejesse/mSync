# mSync

A message syncing application for facilitating omni-channel communication. Internal software for Collegiate. Cheaper than Slack. Easier than convincing clients to adopt Discord.

## Setup

./bot contains the DiscordJS Bot code, while ./server contains the server with endpoints for processing messages from other platforms.

### Platforms

Make sure you have been added as a collaborator for each of the following:

- Github repository
- Twilio organization
  - Add account under msync, then add phone number in Product section (to locate Twilio webhooks)
- PlanetScale organization
  - Add as member of collegiate organization
- Digital Ocean organization
- Docker (todo: setup)

### Running

1. Run 'npm install' or 'yarn install' in the root directory
2. For both ./bot and ./server, create a .env and a .env.production file in root of each directories and copy-paste the env variables into the files.
3. For ./server, run 'npx prisma generate'
4. Run `npm run dev` in the root directory to start the entire application

- If you'd like to run _just_ the bot, try `npm run bot`
- If you'd like to run _just_ the server, try `npm run server`

## Development

### Adding Variables

Whenever you add a new .env (and .env.production) variable, run 'yarn gen-env' to add it to types.

### Updating DB Schema

Whenever you are updating a schema, run migrations via 'npx prisma migrate' (todo: testing vs prod branches).

### Testing Twilio

Set up (specifically for testing sms endpoint):

1. Run server (yarn watch + dev)
2. Create online endpoint (cd ~ && ./ngrok http 4000)
3. Set <ngrok-url.app>/message/send/1 as url message webhook on twilio
   todo: create testing server

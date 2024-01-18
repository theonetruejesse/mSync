# TODO:

1. Proper error handling of endpoints
   - You can find an example in `./routes/discord/channel.ts`'s `create` route
   - Prisma gives error codes that can then be used to respond with more descriptive errors via the bot
   - The errors should be handled in all discord routes
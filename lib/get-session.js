import nextSession from "next-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";
import RedisStoreFactory from "connect-redis";
import Redis from "ioredis";

const RedisStore = RedisStoreFactory(expressSession);

export const getSession = nextSession({
  name: "SessionSid",
  store: promisifyStore(new RedisStore({ client: new Redis() })),
  autoCommit: true,
  cookie: {
    maxAge: 60 * 60 * 6,
  },
});

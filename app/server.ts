import { app } from "./app";
import { env } from "./environment";

app
  .listen({ port: env.PORT })
  .then(() => console.log("HTTP Server started 🚀"));

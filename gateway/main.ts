import { createApp } from "./app.ts";
import { logger } from "./config/observability.ts";

const main = async () => {
  const app = createApp();
  const port =
    Deno.env.get("FUNCTIONS_CUSTOMHANDLER_PORT") ||
    Deno.env.get("PORT") ||
    3100;

  await app.listen(port, () => {
    logger.info(`Started listening on port ${port}`);
  });
};

if (import.meta.main) {
  main();
}

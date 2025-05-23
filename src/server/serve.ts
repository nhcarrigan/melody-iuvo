/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import fastify from "fastify";
import { logger } from "../utils/logger.js";

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Melody Iuvo</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="A task management bot for Discord!" />
    <script src="https://cdn.nhcarrigan.com/headers/index.js" async defer></script>
  </head>
  <body>
    <main>
    <h1>Melody Iuvo</h1>
    <img src="https://cdn.nhcarrigan.com/new-avatars/melody-full.png" width="250" alt="Melody" />
    <section>
      <p>A task management bot for Discord!</p>
    </section>
    <section>
        <h2>Links</h2>
        <p>
            <a href="https://git.nhcarrigan.com/nhcarrigan/melody-iuvo">
                <i class="fa-solid fa-code"></i> Source Code
            </a>
        </p>
        <p>
            <a href="https://docs.nhcarrigan.com/">
                <i class="fa-solid fa-book"></i> Documentation
            </a>
        </p>
        <p>
            <a href="https://chat.nhcarrigan.com">
                <i class="fa-solid fa-circle-info"></i> Support
            </a>
        </p>
    </section>
    </main>
  </body>
</html>`;

/**
 * Starts up a web server for health monitoring.
 */
export const instantiateServer = (): void => {
  try {
    const server = fastify({
      logger: false,
    });

    server.get("/", (_request, response) => {
      response.header("Content-Type", "text/html");
      response.send(html);
    });

    server.listen({ port: 5443 }, (error) => {
      if (error) {
        void logger.error("instantiate server", error);
        return;
      }
      void logger.log("debug", "Server listening on port 5443.");
    });
  } catch (error) {
    if (error instanceof Error) {
      void logger.error("instantiate server", error);
      return;
    }
    void logger.error("instantiate server", new Error("Unknown error"));
  }
};

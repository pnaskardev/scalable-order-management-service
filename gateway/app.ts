import express, { Express } from "express";
import cors from "cors";

// Use API_ALLOW_ORIGINS env var with comma separated urls like
// `http://localhost:300, http://otherurl:100`
// Requests coming to the api server from other urls will be rejected as per
// CORS.
const allowOrigins = Deno.env.get("API_ALLOW_ORIGINS");

// Use NODE_ENV to change webConfiguration based on this value.
// For example, setting NODE_ENV=development disables CORS checking,
// allowing all origins.
const environment = Deno.env.get("NODE_ENV");

const originList = (): string[] | string => {
  if (environment && environment === "development") {
    console.log(`Allowing requests from any origins. NODE_ENV=${environment}`);
    return "*";
  }

  const origins: string[] = [];

  if (allowOrigins && allowOrigins !== "") {
    allowOrigins.split(",").forEach((origin) => {
      origins.push(origin);
    });
  }

  return origins;
};

export const createApp = (): Express => {
  const app: Express = express();
  app.use(express.json());

  const allowOrigins = Deno.env.get("API_ALLOW_ORIGINS");

  // Use NODE_ENV to change webConfiguration based on this value.
  // For example, setting NODE_ENV=development disables CORS checking,
  // allowing all origins.
  const environment = Deno.env.get("NODE_ENV");

  const originList = (): string[] | string => {
    if (environment && environment === "development") {
      console.log(
        `Allowing requests from any origins. NODE_ENV=${environment}`
      );
      return "*";
    }

    const origins: string[] = [];

    if (allowOrigins && allowOrigins !== "") {
      allowOrigins.split(",").forEach((origin) => {
        origins.push(origin);
      });
    }

    return origins;
  };

  app.use(
    cors({
      origin: originList(),
    })
  );

  return app;
};

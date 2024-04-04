import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { timingSafeEqual } from "crypto";

import { STRAPI_MODELS } from "@/lib/strapi/constants";

type StrapiEvent = "entry.publish" | "entry.unpublish" | "entry.update";

type StrapiPayload = {
  event: StrapiEvent;
  createdAt: Date;
  model: keyof typeof STRAPI_MODELS;
  entry: any;
};

const MESSAGES_BY_EVENT: Record<StrapiEvent, string> = {
  "entry.update": "updated",
  "entry.publish": "published",
  "entry.unpublish": "unpublished",
};

export async function POST(req: Request) {
  const headerAuthValue = headers().get("Authorization") ?? "";
  const token = headerAuthValue.split(" ")[1];

  if (!token) {
    return new Response("Not authorized", {
      status: 403,
    });
  }

  const STRAPI_TOKEN = process.env.STRAPI_WEBHOOK_TOKEN;
  if (!STRAPI_TOKEN) {
    return new Response("Missing STRAPI_TOKEN env value", {
      status: 500,
    });
  }

  if (
    STRAPI_TOKEN.length !== token.length ||
    !timingSafeEqual(Buffer.from(STRAPI_TOKEN), Buffer.from(token))
  ) {
    return new Response("Not authorized", {
      status: 403,
    });
  }

  const data = (await req.json()) as StrapiPayload;
  revalidateTag(STRAPI_MODELS[data.model]);

  console.log(`Entry ${MESSAGES_BY_EVENT[data.event]} on model ${data.model}`);

  return new Response("Ok", { status: 200 });
}

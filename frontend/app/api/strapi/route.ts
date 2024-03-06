import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { timingSafeEqual } from "crypto";

import { STRAPI_MODELS } from "@/lib/strapi/constants";

type StrapiPayload = {
  event: "entry.publish" | "entry.unpublish";
  createdAt: Date;
  model: keyof typeof STRAPI_MODELS;
  entry: any;
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

  console.log(
    `Entry ${
      data.event === "entry.publish" ? "published" : "unpublished"
    } on model ${data.model}`
  );

  return Response.json({ received: true });
}

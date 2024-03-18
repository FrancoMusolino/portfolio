import { STRAPI_MODELS } from "./constants";
import { getAboutByLocaleQuery } from "./queries/about";

// QUERIES
import { getSkillsQuery } from "./queries/skills";
import {
  GetAboutByLocaleOperation,
  GetSkillsOperation,
  Locale,
  StrapiResponse,
} from "./types";

const endpoint = `${process.env.STRAPI_DOMAIN!}/graphql`;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

type ExtractData<T extends { data: object }> = T["data"];

export async function strapiFetch<
  T extends { data: object; variables?: object }
>({
  cache = "force-cache",
  headers = {},
  query,
  next = {},
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  next?: NextFetchRequestConfig;
  variables?: ExtractVariables<T>;
}): Promise<{ body: T }> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      next,
    });

    const data = (await result.json()) as StrapiResponse<ExtractData<T>>;

    if ("errors" in data) {
      throw (data as any).errors;
    }

    return {
      body: {
        data: data.data,
        variables,
      } as T,
    };
  } catch (err) {
    console.log({ err });

    throw {
      error: err,
      query,
    };
  }
}

export const getSkills = async (): Promise<
  GetSkillsOperation["data"]["skills"]["data"]
> => {
  const { body } = await strapiFetch<GetSkillsOperation>({
    query: getSkillsQuery,
    next: { tags: [STRAPI_MODELS.skill] },
  });

  return body.data.skills.data;
};

export const getAboutByLocale = async (
  locale: Locale
): Promise<string | null> => {
  const { body } = await strapiFetch<GetAboutByLocaleOperation>({
    query: getAboutByLocaleQuery,
    variables: { locale },
    next: { tags: [STRAPI_MODELS.about] },
  });

  return body.data.abouts.data.at(0)?.attributes.text ?? null;
};

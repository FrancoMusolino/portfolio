import { STRAPI_MODELS } from "./constants";

// QUERIES
import { getIntroByLocaleQuery } from "./queries/intro";
import { getAboutByLocaleQuery } from "./queries/about";
import { getSkillsQuery } from "./queries/skills";

import {
  GetAboutByLocaleOperation,
  GetIntroByLocaleOperation,
  GetProjectsByLocaleOperation,
  GetSkillsOperation,
  Locale,
  StrapiResponse,
} from "./types";
import { getProjectsByLocaleQuery } from "./queries/projects";

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

export const getIntroByLocale = async (
  locale: Locale
): Promise<string | null> => {
  const { body } = await strapiFetch<GetIntroByLocaleOperation>({
    query: getIntroByLocaleQuery,
    variables: { locale },
    next: { tags: [STRAPI_MODELS.intro] },
  });

  return body.data.intros.data.at(0)?.attributes.text ?? null;
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

export const getProjectsByLocale = async (
  locale: Locale
): Promise<GetProjectsByLocaleOperation["data"]["projects"]> => {
  const { body } = await strapiFetch<GetProjectsByLocaleOperation>({
    query: getProjectsByLocaleQuery,
    variables: { locale },
    next: { tags: [STRAPI_MODELS.project] },
  });

  return body.data.projects;
};

export const getSkills = async (): Promise<
  GetSkillsOperation["data"]["skills"]["data"]
> => {
  const { body } = await strapiFetch<GetSkillsOperation>({
    query: getSkillsQuery,
    next: { tags: [STRAPI_MODELS.skill] },
  });

  return body.data.skills.data;
};

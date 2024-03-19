export type StrapiResponse<T> = {
  data: T;
};

export type Locale = "es" | "en";

type AttributesWrapper<T extends object> = {
  attributes: T;
};

type SkillAttributes = AttributesWrapper<{
  name: string;
}>;

type AboutAttributes = AttributesWrapper<{
  text: string;
}>;

export type GetSkillsOperation = {
  data: {
    skills: {
      data: SkillAttributes[];
    };
  };
};

export type GetAboutByLocaleOperation = {
  data: {
    abouts: {
      data: AboutAttributes[];
    };
  };
  variables: {
    locale: Locale;
  };
};

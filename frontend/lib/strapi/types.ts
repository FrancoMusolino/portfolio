export type StrapiResponse<T> = {
  data: T;
};

export type Locale = "es" | "en";

type AttributesWrapper<T extends object> = {
  attributes: T;
};

type AboutAttributes = AttributesWrapper<{
  text: string;
}>;

type IntroAttributes = AttributesWrapper<{
  text: string;
}>;

type SkillAttributes = AttributesWrapper<{
  name: string;
}>;

export type GetIntroByLocaleOperation = {
  data: {
    intros: {
      data: IntroAttributes[];
    };
  };
  variables: {
    locale: Locale;
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

export type GetSkillsOperation = {
  data: {
    skills: {
      data: SkillAttributes[];
    };
  };
};

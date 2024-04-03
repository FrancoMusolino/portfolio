export type StrapiResponse<T> = {
  data: T;
};

export type Locale = "es" | "en";

type AttributesWrapper<T extends object> = {
  attributes: T;
};

type ImageAttributes = AttributesWrapper<{
  formats: {
    thumbnail: {
      url: string;
    };
    small: {
      url: string;
    };
    medium: {
      url: string;
    };
    large: {
      url: string;
    };
  };
}>;

type AboutAttributes = AttributesWrapper<{
  text: string;
}>;

type ProjectAttributes = AttributesWrapper<{
  title: string;
  description: string;
  image: { data: ImageAttributes };
  skills: { data: SkillAttributes[] };
}>;

type IntroAttributes = AttributesWrapper<{
  text: string;
}>;

type SkillAttributes = AttributesWrapper<{
  name: string;
}>;

type ExperienceAttributes = AttributesWrapper<{
  title: string;
  description: string;
  icon: string;
  startedOn: Date;
  finishedAt: Date | null;
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

export type GetProjectsByLocaleOperation = {
  data: {
    projects: {
      data: ProjectAttributes[];
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

export type GetExperienceByLocaleOperation = {
  data: {
    experiences: {
      data: ExperienceAttributes[];
    };
  };
  variables: {
    locale: Locale;
  };
};

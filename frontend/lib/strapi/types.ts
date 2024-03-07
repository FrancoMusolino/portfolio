export type StrapiResponse<T> = {
  data: T;
};

type AttributesWrapper<T extends object> = {
  attributes: T;
};

type SkillAttributes = AttributesWrapper<{
  name: string;
}>;

export type GetSkillsOperation = {
  data: {
    skills: {
      data: SkillAttributes[];
    };
  };
};

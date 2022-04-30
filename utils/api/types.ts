export type DateRepresentation = string;

export type ContentList<A> = {
  contents: A[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type ContentBase = {
  id: string;
  createdAt: DateRepresentation;
  updatedAt: DateRepresentation;
  publishedAt: DateRepresentation;
  revisedAt: DateRepresentation;
};

export type About = {
  createdAt: DateRepresentation;
  updatedAt: DateRepresentation;
  publishedAt: DateRepresentation;
  revisedAt: DateRepresentation;
  handleName: string;
  realName: string;
  mailAddress: string;
  links: AboutLink[];
};

export type AboutLink = {
  name: string;
  link: string;
};

export type Timeline = ContentList<TimelineItem>;

export type TimelineItem = ContentBase & {
  title: string;
  content: (
    | { fieldId: "blogMarkdown"; body: string }
    | { fieldId: "blogHTML"; body: string }
    | { fieldId: "blogExternal"; link: string }
    | { fieldId: "talk"; archiveLink: string; slideLink: string }
    | { fieldId: "certification"; link: string }
    | { fieldId: "release"; repositoryLink: string }
    | { fieldId: "workingAt"; link: string; startDate: string; endDate: string }
    | { fieldId: "graduatedFrom"; link: string }
    | { fieldId: "other"; detail: string }
  )[];
};

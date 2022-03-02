export interface Contents<A> {
  contents: A[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface About {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  handleName: string;
  realName: string;
  mailAddress: string;
  links: Link[];
  histories: History[];
}

export interface Link {
  fieldId: string;
  name: string;
  link: string;
}

export interface History {
  fieldId: string;
  title: string;
  type: string[];
  public: boolean;
  startDate: string;
  detail?: string;
  endDate?: string;
}

export type Products = Contents<Product>;

export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  releaseDate: string;
  link: string;
  detail: string;
}

export type BlogContents = Contents<BlogContent>;

export interface BlogContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: (
    | { fieldId: "markdown"; body: string }
    | { fieldId: "html"; body: string }
    | { fieldId: "external"; url: string }
  )[];
}

export type Cheatsheets = Contents<Cheatsheet>;

export interface Cheatsheet {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  mdContent: string;
}

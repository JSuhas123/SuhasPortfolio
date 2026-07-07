export type ProjectStatus = "active" | "completed" | "archived";

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  status: ProjectStatus;
  tags: string[];
  slug: string;
  featured?: boolean;
}

export interface WritingFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
  published?: boolean;
}

export interface MDXDocument<T> {
  frontmatter: T;
  content: string;
}

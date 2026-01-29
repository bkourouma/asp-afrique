export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string | null;
  category: string;
  tags: string[];
  author: string;
  status: 'published' | 'draft';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  readTime: number; // en minutes
}

export interface CreateBlogArticleDto {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  author: string;
  status: 'published' | 'draft';
  publishedAt?: string;
}

export interface UpdateBlogArticleDto extends Partial<CreateBlogArticleDto> {}













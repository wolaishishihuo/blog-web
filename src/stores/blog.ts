import { defineStore } from "pinia";
import { ref } from "vue";

export interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
  readTime: string;
  author?: string;
  coverImage?: string;
}

export const useBlogStore = defineStore("blog", () => {
  const posts = ref<Post[]>([]);
  const currentPost = ref<Post | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchPosts = async () => {
    isLoading.value = true;
    try {
      if (import.meta.env.VITE_ENABLE_MOCK === "true") {
        // 使用模拟数据
        const mockPosts: Post[] = [
          {
            id: 1,
            title: "Vue 3 与 TypeScript 实战指南",
            content: "深入探讨 Vue 3 组合式 API 与 TypeScript 的完美配合...",
            date: "2024-03-20",
            tags: ["Vue", "TypeScript"],
            readTime: "5 min",
            author: "John Doe",
            coverImage: "https://picsum.photos/800/400",
          },
          // ... 其他模拟数据
        ];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        posts.value = mockPosts;
      } else {
        // 使用真实 API
        // const response = await http.get<Post[]>("/posts");
        // posts.value = response;
      }
    } catch (e) {
      error.value = "Failed to fetch posts";
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchPostById = async (id: number) => {
    isLoading.value = true;
    try {
      if (import.meta.env.VITE_ENABLE_MOCK === "true") {
        // 模拟 API 调用
        await new Promise((resolve) => setTimeout(resolve, 800));
        const post = posts.value.find((p) => p.id === id);
        if (!post) throw new Error("Post not found");
        currentPost.value = {
          ...post,
          content: `# ${post.title}\n\n## 引言\n\n${post.content}\n\n...`,
        };
      } else {
        // 使用真实 API
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to fetch post";
      console.error(e);
      currentPost.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    posts,
    currentPost,
    isLoading,
    error,
    fetchPosts,
    fetchPostById,
  };
});

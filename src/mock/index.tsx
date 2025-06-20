import type { ServiceInfo } from "@/types/Services";

export const mockServices: ServiceInfo[] = [
  {
    id: 1,
    name: "Get User Info",
    url: "https://api.example.com/users/me",
    method: "GET",
    data: {},
    cookies: {},
    timeout: 5,
    cron: "*/5 * * * *", // Every 5 minutes
  },
  {
    id: 2,
    name: "Create New Post",
    url: "https://api.example.com/posts",
    method: "POST",
    data: {
      title: "Hello World",
      content: "This is a test post",
    },
    cookies: {
      session: "abc123",
    },
    timeout: 5,
    cron: "0 */1 * * *", // Every hour
  },
  {
    id: 3,
    name: "Update Profile",
    url: "https://api.example.com/users/update",
    method: "PUT",
    data: {
      username: "john_doe",
      bio: "Updated bio",
    },
    cookies: {},
    timeout: 10,
    cron: "30 2 * * *", // Every day at 2:30 AM
  },
  {
    id: 4,
    name: "Delete Comment",
    url: "https://api.example.com/comments/123",
    method: "DELETE",
    data: {},
    cookies: {
      authToken: "secure-token-456",
    },
    timeout: 5,
    cron: "0 0 * * 0", // Every Sunday at midnight
  },
  {
    id: 5,
    name: "Sync External Data",
    url: "https://api.external.com/sync",
    method: "POST",
    data: {
      sync: true,
    },
    cookies: {},
    timeout: 15,
    cron: "*/15 * * * *", // Every 15 minutes
  },
];

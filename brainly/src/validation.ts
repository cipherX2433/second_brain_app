// validation.ts
import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const contentSchema = z.object({
  link: z.string().url("Invalid URL"),
  type: z.enum(["video", "article", "tweet", "other"]),
  title: z.string().min(1, "Title is required"),
});

export const deleteContentSchema = z.object({
  contentId: z.string(),
});

export const shareSchema = z.object({
  share: z.boolean(),
});

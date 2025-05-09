import { z } from "zod";

// User interface without database-specific code
export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  createdAt?: Date;
}

// Message interface without database-specific code
export interface Message {
  id: number;
  userId: number;
  text: string;
  sender: string; // 'user' or 'system'
  createdAt?: Date;
}

// Schema for creating a new user
export const insertUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

// Schema for creating a new message
export const insertMessageSchema = z.object({
  userId: z.number(),
  text: z.string(),
  sender: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

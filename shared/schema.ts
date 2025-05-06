import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model updated for email-based authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  avatarUrl: text("avatar_url"), // nullable
  createdAt: timestamp("created_at").defaultNow(), // nullable
});

// Messages table to store chat messages per user
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  text: text("text").notNull(),
  sender: text("sender").notNull(), // 'user' or 'system'
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema for creating a new user
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
});

// Schema for creating a new message
export const insertMessageSchema = createInsertSchema(messages).pick({
  userId: true,
  text: true,
  sender: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

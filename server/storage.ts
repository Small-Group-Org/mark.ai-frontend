import { type User, type InsertUser, type Message, type InsertMessage } from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";

// Enhanced interface with user and message operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message operations
  getMessagesByUserId(userId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Session store
  sessionStore: session.Store;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  sessionStore: session.Store;
  private users: User[] = [];
  private messages: Message[] = [];
  private userIdCounter: number = 1;
  private messageIdCounter: number = 1;
  
  constructor() {
    const MemStore = MemoryStore(session);
    this.sessionStore = new MemStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Create a test user
    this.createUser({
      email: "test@example.com",
      password: "hashedpassword.salt", // This would actually be hashed in auth.ts
      firstName: "Test",
      lastName: "User"
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const newUser: User = {
      id: this.userIdCounter++,
      ...insertUser,
      createdAt: new Date()
    };
    this.users.push(newUser);
    return newUser;
  }
  
  // Message operations
  async getMessagesByUserId(userId: number): Promise<Message[]> {
    return this.messages.filter(message => message.userId === userId);
  }
  
  async createMessage(message: InsertMessage): Promise<Message> {
    const newMessage: Message = {
      id: this.messageIdCounter++,
      ...message,
      createdAt: new Date()
    };
    this.messages.push(newMessage);
    return newMessage;
  }
}

// Create a single instance of the storage
export const storage = new MemStorage();

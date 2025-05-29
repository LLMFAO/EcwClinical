import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const medicalDocuments = pgTable("medical_documents", {
  id: serial("id").primaryKey(),
  patientId: text("patient_id").notNull(),
  documentType: text("document_type").notNull().default("progress_note"),
  content: text("content").notNull(),
  lastModified: timestamp("last_modified").defaultNow(),
  isLocked: boolean("is_locked").default(false),
});

export const clipboardSync = pgTable("clipboard_sync", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMedicalDocumentSchema = createInsertSchema(medicalDocuments).omit({
  id: true,
  lastModified: true,
});

export const insertClipboardSyncSchema = createInsertSchema(clipboardSync).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type MedicalDocument = typeof medicalDocuments.$inferSelect;
export type InsertMedicalDocument = z.infer<typeof insertMedicalDocumentSchema>;
export type ClipboardSync = typeof clipboardSync.$inferSelect;
export type InsertClipboardSync = z.infer<typeof insertClipboardSyncSchema>;

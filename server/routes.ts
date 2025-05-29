import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMedicalDocumentSchema, insertClipboardSyncSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Medical document routes
  app.get("/api/medical-documents/:patientId", async (req, res) => {
    try {
      const { patientId } = req.params;
      const documents = await storage.getMedicalDocumentsByPatient(patientId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch medical documents" });
    }
  });

  app.post("/api/medical-documents", async (req, res) => {
    try {
      const validatedData = insertMedicalDocumentSchema.parse(req.body);
      const document = await storage.createMedicalDocument(validatedData);
      res.json(document);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid document data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create medical document" });
      }
    }
  });

  app.patch("/api/medical-documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { content } = req.body;
      
      if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: "Content is required and must be a string" });
      }

      const document = await storage.updateMedicalDocument(id, content);
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: "Failed to update medical document" });
    }
  });

  // Clipboard synchronization routes
  app.get("/api/clipboard/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const sync = await storage.getClipboardSync(sessionId);
      
      if (!sync) {
        return res.status(404).json({ error: "Clipboard sync not found" });
      }
      
      res.json(sync);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch clipboard sync" });
    }
  });

  app.post("/api/clipboard", async (req, res) => {
    try {
      const validatedData = insertClipboardSyncSchema.parse(req.body);
      const sync = await storage.createClipboardSync(validatedData);
      res.json(sync);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid clipboard data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create clipboard sync" });
      }
    }
  });

  app.patch("/api/clipboard/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { content } = req.body;
      
      if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: "Content is required and must be a string" });
      }

      const sync = await storage.updateClipboardSync(sessionId, content);
      if (!sync) {
        // Create new if doesn't exist
        const newSync = await storage.createClipboardSync({ sessionId, content });
        return res.json(newSync);
      }
      
      res.json(sync);
    } catch (error) {
      res.status(500).json({ error: "Failed to update clipboard sync" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

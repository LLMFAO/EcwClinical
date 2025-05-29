import { 
  users, 
  medicalDocuments, 
  clipboardSync,
  type User, 
  type InsertUser,
  type MedicalDocument,
  type InsertMedicalDocument,
  type ClipboardSync,
  type InsertClipboardSync
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getMedicalDocument(id: number): Promise<MedicalDocument | undefined>;
  getMedicalDocumentsByPatient(patientId: string): Promise<MedicalDocument[]>;
  createMedicalDocument(doc: InsertMedicalDocument): Promise<MedicalDocument>;
  updateMedicalDocument(id: number, content: string): Promise<MedicalDocument | undefined>;
  
  getClipboardSync(sessionId: string): Promise<ClipboardSync | undefined>;
  createClipboardSync(sync: InsertClipboardSync): Promise<ClipboardSync>;
  updateClipboardSync(sessionId: string, content: string): Promise<ClipboardSync | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private medicalDocuments: Map<number, MedicalDocument>;
  private clipboardSyncs: Map<string, ClipboardSync>;
  private currentUserId: number;
  private currentDocId: number;

  constructor() {
    this.users = new Map();
    this.medicalDocuments = new Map();
    this.clipboardSyncs = new Map();
    this.currentUserId = 1;
    this.currentDocId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMedicalDocument(id: number): Promise<MedicalDocument | undefined> {
    return this.medicalDocuments.get(id);
  }

  async getMedicalDocumentsByPatient(patientId: string): Promise<MedicalDocument[]> {
    return Array.from(this.medicalDocuments.values()).filter(
      (doc) => doc.patientId === patientId
    );
  }

  async createMedicalDocument(insertDoc: InsertMedicalDocument): Promise<MedicalDocument> {
    const id = this.currentDocId++;
    const doc: MedicalDocument = {
      ...insertDoc,
      id,
      lastModified: new Date(),
      isLocked: false,
    };
    this.medicalDocuments.set(id, doc);
    return doc;
  }

  async updateMedicalDocument(id: number, content: string): Promise<MedicalDocument | undefined> {
    const doc = this.medicalDocuments.get(id);
    if (!doc) return undefined;
    
    const updatedDoc: MedicalDocument = {
      ...doc,
      content,
      lastModified: new Date(),
    };
    this.medicalDocuments.set(id, updatedDoc);
    return updatedDoc;
  }

  async getClipboardSync(sessionId: string): Promise<ClipboardSync | undefined> {
    return this.clipboardSyncs.get(sessionId);
  }

  async createClipboardSync(insertSync: InsertClipboardSync): Promise<ClipboardSync> {
    const sync: ClipboardSync = {
      ...insertSync,
      id: Date.now(),
      timestamp: new Date(),
    };
    this.clipboardSyncs.set(insertSync.sessionId, sync);
    return sync;
  }

  async updateClipboardSync(sessionId: string, content: string): Promise<ClipboardSync | undefined> {
    const sync = this.clipboardSyncs.get(sessionId);
    if (!sync) return undefined;
    
    const updatedSync: ClipboardSync = {
      ...sync,
      content,
      timestamp: new Date(),
    };
    this.clipboardSyncs.set(sessionId, updatedSync);
    return updatedSync;
  }
}

export const storage = new MemStorage();

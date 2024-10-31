"use server";

import { ID, Query, InputFile } from "node-appwrite";

import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PETITION_COLLECTION_ID,
  REPORT_COLLECTION_ID,
  
  PROJECT_ID,
  databases,
  storage,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE PETITION
export const createPetition = async (petition: CreatePetitionParams) => {
  try {
    let imageFile;
    if (petition.image) {
      const inputFile = InputFile.fromBlob(
        petition.image,
        `petition_image_${Date.now()}.jpg`
      );
      imageFile = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPetition = await databases.createDocument(
      DATABASE_ID!,
      PETITION_COLLECTION_ID!,
      ID.unique(),
      {
        ...petition,
        imageId: imageFile?.$id || null,
        imageUrl: imageFile?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${imageFile.$id}/view?project=${PROJECT_ID}`
          : null,
        signatureCount: 0,
        createdAt: new Date().toISOString(),
      }
    );

    return parseStringify(newPetition);
  } catch (error) {
    console.error("An error occurred while creating a new petition:", error);
    throw error;
  }
};

// GET PETITION
export const getPetition = async (petitionId: string) => {
  try {
    const petition = await databases.getDocument(
      DATABASE_ID!,
      PETITION_COLLECTION_ID!,
      petitionId
    );

    return parseStringify(petition);
  } catch (error) {
    console.error("An error occurred while retrieving the petition:", error);
    throw error;
  }
};

// LIST PETITIONS
export const listPetitions = async (limit: number = 10, offset: number = 0) => {
  try {
    const petitions = await databases.listDocuments(
      DATABASE_ID!,
      PETITION_COLLECTION_ID!,
      [
        Query.orderDesc("createdAt"),
        Query.limit(limit),
        Query.offset(offset),
      ]
    );

    return parseStringify(petitions);
  } catch (error) {
    console.error("An error occurred while listing petitions:", error);
    throw error;
  }
};

// SIGN PETITION
export const signPetition = async (petitionId: string, signature: PetitionSignatureParams) => {
  try {
    const petition = await databases.getDocument(
      DATABASE_ID!,
      PETITION_COLLECTION_ID!,
      petitionId
    );

    const updatedPetition = await databases.updateDocument(
      DATABASE_ID!,
      PETITION_COLLECTION_ID!,
      petitionId,
      {
        signatureCount: petition.signatureCount + 1,
        signatures: [...(petition.signatures || []), signature],
      }
    );

    return parseStringify(updatedPetition);
  } catch (error) {
    console.error("An error occurred while signing the petition:", error);
    throw error;
  }
};

// CREATE REPORT
export const createReport = async (report: CreateReportParams) => {
  try {
    let attachments = [];
    if (report.attachments && report.attachments.length > 0) {
      for (const attachment of report.attachments) {
        const inputFile = InputFile.fromBlob(
          attachment.file,
          `report_attachment_${Date.now()}_${attachment.file.name}`
        );
        const file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        attachments.push({
          fileId: file.$id,
          fileUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`,
          type: attachment.type,
        });
      }
    }

    const newReport = await databases.createDocument(
      DATABASE_ID!,
      REPORT_COLLECTION_ID!,
      ID.unique(),
      {
        ...report,
        attachments,
        createdAt: new Date().toISOString(),
        status: "Pending",
      }
    );

    return parseStringify(newReport);
  } catch (error) {
    console.error("An error occurred while creating a new report:", error);
    throw error;
  }
};

// GET REPORT
export const getReport = async (reportId: string) => {
  try {
    const report = await databases.getDocument(
      DATABASE_ID!,
      REPORT_COLLECTION_ID!,
      reportId
    );

    return parseStringify(report);
  } catch (error) {
    console.error("An error occurred while retrieving the report:", error);
    throw error;
  }
};

// LIST REPORTS
export const listReports = async (limit: number = 10, offset: number = 0) => {
  try {
    const reports = await databases.listDocuments(
      DATABASE_ID!,
      REPORT_COLLECTION_ID!,
      [
        Query.orderDesc("createdAt"),
        Query.limit(limit),
        Query.offset(offset),
      ]
    );

    return parseStringify(reports);
  } catch (error) {
    console.error("An error occurred while listing reports:", error);
    throw error;
  }
};

// UPDATE REPORT STATUS
export const updateReportStatus = async (reportId: string, status: string) => {
  try {
    const updatedReport = await databases.updateDocument(
      DATABASE_ID!,
      REPORT_COLLECTION_ID!,
      reportId,
      { status }
    );

    return parseStringify(updatedReport);
  } catch (error) {
    console.error("An error occurred while updating the report status:", error);
    throw error;
  }
};

// Types
interface CreatePetitionParams {
  title: string;
  description: string;
  target: string;
  category: string;
  goalSignatures: number;
  deadline: string;
  image?: Blob;
  tags: string[];
  creatorId: string;
}

interface PetitionSignatureParams {
  name: string;
  email: string;
  comment?: string;
  sharePublicly: boolean;
  receiveUpdates: boolean;
}

interface CreateReportParams {
  title: string;
  description: string;
  location: string;
  category: string;
  urgency: string;
  attachments?: Array<{
    file: Blob;
    type: "image" | "document" | "video";
  }>;
  anonymous: boolean;
  reporterId: string;
}
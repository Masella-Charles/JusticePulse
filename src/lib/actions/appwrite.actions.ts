// Appwrite specific types
type AppwriteId = string;
type AppwriteTimestamp = string; // ISO 8601 format

export interface Petition {
  $id: AppwriteId;
  $createdAt: AppwriteTimestamp;
  $updatedAt: AppwriteTimestamp;
  name: string;
  description: string;
  goal: number;
  category: string;
  location: string;
  stage: 'trending' | 'urgent' | 'victory';
}

export interface Report {
  $id: AppwriteId;
  $createdAt: AppwriteTimestamp;
  $updatedAt: AppwriteTimestamp;
  title: string;
  description: string;
  category: string;
  location: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

// You might also want to define types for creating new petitions or reports
export type CreatePetitionDto = Omit<Petition, '$id' | '$createdAt' | '$updatedAt' | 'goal'>;
export type CreateReportDto = Omit<Report, '$id' | '$createdAt' | '$updatedAt'>;

// If you need to update petitions or reports, you can define types for that as well
export type UpdatePetitionDto = Partial<CreatePetitionDto>;
export type UpdateReportDto = Partial<CreateReportDto>;
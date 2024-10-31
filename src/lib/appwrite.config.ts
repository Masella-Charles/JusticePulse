import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_APPWRITE_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
  API_KEY,
  NEXT_PUBLIC_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_PETITION_COLLECTION_ID: PETITION_COLLECTION_ID,
  NEXT_PUBLIC_REPORT_COLLECTION_ID: REPORT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
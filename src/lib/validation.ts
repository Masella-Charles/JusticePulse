import { z } from "zod";

export const UserRegistrationValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const IssueReportValidation = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be at most 1000 characters"),
  location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(100, "Location must be at most 100 characters"),
  category: z.enum([
    "Corruption",
    "Human Rights Violation",
    "Environmental Issue",
    "Infrastructure Problem",
    "Public Service Complaint",
    "Other"
  ]),
  urgency: z.enum(["Low", "Medium", "High", "Critical"]),
  attachments: z
    .array(
      z.object({
        file: z.instanceof(File),
        type: z.enum(["image", "document", "video"]),
      })
    )
    .optional(),
  anonymous: z.boolean().default(false),
  contactConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to be contacted for follow-up",
    }),
});

export const PetitionCreationValidation = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be at most 100 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(2000, "Description must be at most 2000 characters"),
  target: z
    .string()
    .min(5, "Target must be at least 5 characters")
    .max(100, "Target must be at most 100 characters"),
  category: z.enum([
    "Government Policy",
    "Social Justice",
    "Environmental Protection",
    "Education Reform",
    "Healthcare Improvement",
    "Other"
  ]),
  goalSignatures: z
    .number()
    .int()
    .min(100, "Goal must be at least 100 signatures")
    .max(1000000, "Goal must be at most 1,000,000 signatures"),
  deadline: z.coerce.date().refine((date) => date > new Date(), {
    message: "Deadline must be in the future",
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "File size must be less than 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png, and .webp formats are supported"
    )
    .optional(),
  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .max(5, "Maximum of 5 tags allowed"),
  termsAgreed: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must agree to the terms and conditions",
    }),
});

export const PetitionSignatureValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  comment: z
    .string()
    .max(500, "Comment must be at most 500 characters")
    .optional(),
  sharePublicly: z.boolean().default(false),
  receiveUpdates: z.boolean().default(false),
});

export function getValidationSchema(type: string) {
  switch (type) {
    case "userRegistration":
      return UserRegistrationValidation;
    case "issueReport":
      return IssueReportValidation;
    case "petitionCreation":
      return PetitionCreationValidation;
    case "petitionSignature":
      return PetitionSignatureValidation;
    default:
      throw new Error("Invalid schema type");
  }
}
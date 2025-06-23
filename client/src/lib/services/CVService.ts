import { CV } from "@/types/cv";

// Mock data for CVs
const mockCVs: (CV & {
  id: string;
  name: string;
  lastUpdated: string;
  status: "draft" | "completed" | "published";
})[] = [
  {
    id: "cv-1",
    name: "Software Developer CV",
    lastUpdated: "2023-06-15T14:30:00Z",
    status: "completed",
    personalInfo: {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890",
      location: "New York, USA",
      title: "Senior Software Developer",
    },
    education: [
      {
        id: "edu-1",
        school: "University of Technology",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        startDate: "2015-09-01",
        endDate: "2019-05-30",
      },
    ],
    experience: [
      {
        id: "exp-1",
        company: "Tech Solutions Inc.",
        position: "Software Developer",
        startDate: "2019-06-01",
        endDate: "",
        achievements: [
          "Developed scalable web applications",
          "Improved system performance by 35%",
        ],
      },
    ],
    skills: [
      { id: "skill-1", name: "JavaScript" },
      { id: "skill-2", name: "React" },
      { id: "skill-3", name: "Node.js" },
    ],
    style: { primaryColor: "#3b82f6", backgroundColor: "#ffffff" },
  },
  {
    id: "cv-2",
    name: "Data Scientist Resume",
    lastUpdated: "2023-07-10T09:45:00Z",
    status: "draft",
    personalInfo: {
      fullName: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 987 654 321",
      location: "San Francisco, USA",
      title: "Data Scientist",
    },
    education: [
      {
        id: "edu-2",
        school: "Stanford University",
        degree: "Master's Degree",
        fieldOfStudy: "Data Science",
        startDate: "2018-09-01",
        endDate: "2020-06-30",
      },
    ],
    skills: [
      { id: "skill-4", name: "Python" },
      { id: "skill-5", name: "Machine Learning" },
      { id: "skill-6", name: "SQL" },
    ],
    style: { primaryColor: "#10b981", backgroundColor: "#f8fafc" },
  },
  {
    id: "cv-3",
    name: "Product Manager CV",
    lastUpdated: "2023-08-05T16:20:00Z",
    status: "published",
    personalInfo: {
      fullName: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 555 123 456",
      location: "Chicago, USA",
      title: "Senior Product Manager",
    },
    experience: [
      {
        id: "exp-2",
        company: "Product Innovations Co.",
        position: "Product Manager",
        startDate: "2017-03-01",
        endDate: "",
        achievements: [
          "Led cross-functional teams",
          "Launched 5 successful products",
        ],
      },
    ],
    skills: [
      { id: "skill-7", name: "Product Strategy" },
      { id: "skill-8", name: "User Research" },
      { id: "skill-9", name: "Agile" },
    ],
    style: { primaryColor: "#6366f1", backgroundColor: "#f9fafb" },
  },
];

export type CVListItem = (typeof mockCVs)[0];

// Service for CV operations
export const CVService = {
  // Fetch all CVs (simulating API call)
  fetchCVs: async (): Promise<CVListItem[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, this would be a fetch call to an API
    return mockCVs;
  },
  // Delete a CV
  deleteCV: async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, this would delete the CV via API
    console.log(`Deleting CV with id: ${id}`);
    return Promise.resolve();
  },

  // Rename a CV
  renameCV: async (id: string, newName: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, this would rename the CV via API
    console.log(`Renaming CV with id: ${id} to: ${newName}`);
    return Promise.resolve();
  },

  // Duplicate a CV
  duplicateCV: async (id: string): Promise<CVListItem> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Find the CV to duplicate
    const cvToDuplicate = mockCVs.find((cv) => cv.id === id);
    if (!cvToDuplicate) {
      throw new Error("CV not found");
    }

    // Create a duplicate with a new ID
    const duplicatedCV = {
      ...cvToDuplicate,
      id: `cv-${Date.now()}`,
      name: `${cvToDuplicate.name} (Copy)`,
      lastUpdated: new Date().toISOString(),
      status: "draft" as const,
    };

    // In a real app, this would create a new CV via API
    return duplicatedCV;
  },
};


export interface Workspace {
  id: string;
  ownerId: string;
  title: string;
  visibility: "private" | "shared";
}

export interface WorkspaceDocument {
  id: string;
  filename: string;
  mimeType: string;
  storagePath: string;
  textExtract: string;
  summary?: string;
  ocrStatus: "pending" | "done" | "failed";
}

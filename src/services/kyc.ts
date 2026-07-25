import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  Firestore,
} from "firebase/firestore";
import {
  setDocumentNonBlocking,
  updateDocumentNonBlocking,
} from "@/firebase/non-blocking-updates";

export type StepStatus =
  | "pending"
  | "completed"
  | "needs_changes"
  | "in_review";
export type KycStatus =
  | "not_started"
  | "pending_review"
  | "verified"
  | "rejected";

export interface KycStepDetails {
  documents?: { status: StepStatus; files?: string[] };
  duns?: { status: StepStatus; value?: string };
  signatory?: { status: StepStatus; name?: string; email?: string };
  bank?: { status: StepStatus; account?: string; bankName?: string };
  compliance?: { status: StepStatus; agreed?: boolean };
}

export interface KycRequest {
  id: string; // matches userId
  userId: string;
  entityName: string;
  type: string;
  submittedBy: string;
  date: any;
  status: "Pending" | "In Review" | "Approved" | "Rejected";
  dunsNumber?: string;
  documents?: string[];
}

export async function getUserKycDetails(
  firestore: Firestore,
  userId: string,
): Promise<{ kycStatus: KycStatus; kycSteps: KycStepDetails } | null> {
  if (!userId || !firestore) return null;
  const docRef = doc(firestore, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      kycStatus: data.kycStatus || "not_started",
      kycSteps: data.kycSteps || {},
    };
  }
  return null;
}

export function saveKycStep(
  firestore: Firestore,
  userId: string,
  stepId: keyof KycStepDetails,
  stepData: any,
) {
  const docRef = doc(firestore, "users", userId);
  // Update nested fields
  const payload = {
    [`kycSteps.${stepId}`]: stepData,
    updatedAt: serverTimestamp(),
  };
  updateDocumentNonBlocking(docRef, payload);
}

export function submitKycForReview(
  firestore: Firestore,
  userId: string,
  entityName: string,
  type: string,
  email: string,
  details: KycStepDetails,
) {
  // Update user document
  const userRef = doc(firestore, "users", userId);
  updateDocumentNonBlocking(userRef, {
    kycStatus: "pending_review",
    updatedAt: serverTimestamp(),
  });

  // Create or update KycRequest document
  const requestRef = doc(firestore, "kyc_requests", userId);
  setDocumentNonBlocking(requestRef, {
    id: userId,
    userId,
    entityName,
    type,
    submittedBy: email,
    date: serverTimestamp(),
    status: "Pending",
    dunsNumber: details.duns?.value || "",
    documents: details.documents?.files || ["Verification Docs"],
  }, {});
}

export async function fetchPendingKycRequests(
  firestore: Firestore,
): Promise<KycRequest[]> {
  if (!firestore) return [];
  const q = query(
    collection(firestore, "kyc_requests"),
    where("status", "in", ["Pending", "In Review"]),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      entityName: data.entityName,
      type: data.type,
      submittedBy: data.submittedBy,
      date: data.date?.toDate()
        ? data.date.toDate().toISOString().split("T")[0]
        : "Just now",
      status: data.status,
      dunsNumber: data.dunsNumber,
      documents: data.documents || [],
    } as KycRequest;
  });
}

export async function approveOrRejectKyc(
  firestore: Firestore,
  userId: string,
  status: "Approved" | "Rejected",
) {
  const isApproved = status === "Approved";
  const finalStatus: KycStatus = isApproved ? "verified" : "rejected";

  // Update user profile status
  const userRef = doc(firestore, "users", userId);
  await updateDoc(userRef, {
    kycStatus: finalStatus,
    verified: isApproved,
    updatedAt: serverTimestamp(),
  });

  // Update KycRequest document status
  const requestRef = doc(firestore, "kyc_requests", userId);
  await updateDoc(requestRef, {
    status: status,
    updatedAt: serverTimestamp(),
  });
}

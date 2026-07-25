import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, increment, serverTimestamp, Firestore } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";

export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  referredName: string;
  status: 'joined' | 'hired';
  rewardPoints: number;
  createdAt: any;
}

// Generate a random referral code of style REF-12A45
export function generateReferralCode(userId: string): string {
  const uniqPart = userId.slice(0, 5).toUpperCase();
  const randPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `REF-${uniqPart}${randPart}`;
}

export async function fetchUserReferrals(firestore: Firestore, referrerId: string): Promise<Referral[]> {
  if (!firestore || !referrerId) return [];
  try {
    const q = query(
      collection(firestore, "referrals"),
      where("referrerId", "==", referrerId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        referrerId: data.referrerId,
        referredId: data.referredId,
        referredName: data.referredName,
        status: data.status || 'joined',
        rewardPoints: data.rewardPoints || 0,
        createdAt: data.createdAt?.toDate() ? data.createdAt.toDate().toLocaleDateString() : 'Just now'
      } as Referral;
    });
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return [];
  }
}

export async function processReferralCode(
  firestore: Firestore,
  candidateId: string,
  candidateName: string,
  inviteCode: string
) {
  if (!firestore || !candidateId || !inviteCode) return;
  
  try {
    // Locate the referrer user by searching the referralCode field
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("referralCode", "==", inviteCode.trim()));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.warn(`Referral code ${inviteCode} is invalid.`);
      return;
    }
    
    const referrerDoc = snapshot.docs[0];
    const referrerId = referrerDoc.id;
    
    if (referrerId === candidateId) {
      console.warn("User tried to refer themselves.");
      return;
    }

    // 1. Create a referral connection record
    const referralId = `${referrerId}_${candidateId}`;
    const referralRef = doc(firestore, "referrals", referralId);
    
    setDocumentNonBlocking(referralRef, {
      id: referralId,
      referrerId,
      referredId: candidateId,
      referredName: candidateName,
      status: 'joined',
      rewardPoints: 100, // 100 points for successful registration
      createdAt: serverTimestamp()
    }, {});

    // 2. Award credits to the referrer
    const referrerUserRef = doc(firestore, "users", referrerId);
    updateDoc(referrerUserRef, {
      referralPoints: increment(100),
      referralsCount: increment(1),
      updatedAt: serverTimestamp()
    });

    // 3. Award join credit to the newly signed up user
    const newUserRef = doc(firestore, "users", candidateId);
    updateDoc(newUserRef, {
      referralPoints: increment(50), // 50 points for signing up via invite
      referredBy: referrerId,
      updatedAt: serverTimestamp()
    });

  } catch (error) {
    console.error("Error processing referral code:", error);
  }
}

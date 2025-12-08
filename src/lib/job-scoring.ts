

import { Job } from "@/types/job";
import { ProfileData } from "@/services/profile";

// Basic scoring function — higher is better.
export function scoreJobForUser(job: Job, user: ProfileData | null): number {
  let score = Math.floor(Math.random() * 40) + 30; // Base score

  // Safely check for user and user properties
  if (user) {
      // Skills match
      if (user.skills && user.skills.length > 0 && job.skills && job.skills.length > 0) {
        const userSkillsLower = user.skills.map(s => s.name.toLowerCase());
        const matched = job.skills.filter(s => userSkillsLower.includes(s.toLowerCase())).length;
        score += matched * 5;
      }
      
      // Experience
      const userExp = user.experience?.length ? 5 : 0; // Simplified
      const min = job.experienceMin || 0;
      score += Math.max(0, 10 - Math.abs(min - userExp) * 2);

      // Location preference
      if (user.location && job.location && job.location.toLowerCase().includes(user.location.toLowerCase())) {
        score += 10;
      }
  }

  // Recency bonus (can be applied regardless of user)
    if (job.postedAt) {
    const postedAt = job.postedAt;
    let postDate: Date | undefined;

    if (typeof postedAt === 'object' && postedAt && 'seconds' in postedAt && typeof postedAt.seconds === 'number') {
        postDate = new Date(postedAt.seconds * 1000);
    } else if (typeof postedAt === 'number') {
        postDate = new Date(postedAt);
    } else if (typeof postedAt === 'string') {
        postDate = new Date(postedAt);
    }

    if (postDate && !isNaN(postDate.getTime())) {
        const days = (Date.now() - postDate.getTime()) / (24 * 3600 * 1000);
        if (days < 7) score += 5;
    }
  }


  return Math.min(100, Math.round(score));
}

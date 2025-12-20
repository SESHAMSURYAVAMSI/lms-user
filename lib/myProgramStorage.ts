// lib/myProgramStorage.ts
import { addToMyLearning } from "@/lib/myLearningStorage";

/**
 * Wrapper for backward compatibility
 * Internally still uses myLearning storage
 */
export function addToMyPrograms(programId: number) {
  addToMyLearning(programId);
}

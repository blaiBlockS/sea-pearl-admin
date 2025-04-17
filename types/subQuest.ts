export interface SubQuestType {
  id: string;
  questNumber: number;
  enabled: boolean;
  title: string;
  questLogo: string;
  reward: {
    type: string;
    amount: number;
  }[];
  resetCycle: string;
  archivedPeople: number;
  maxParticipants: number;
  start: string; // ISO date string (ex: 2025-04-16T09:38:44.910Z)
  end: string;
}

interface QuestReward {
  type: string;
  amount: number;
}

interface QuestType {
  id: string;
  questNumber: number;
  title: string;
  reward: QuestReward[];

  resetCycle: string; // 반복 주기?
  roundInCycle: number; // ???

  enabled: boolean;
  archivedPeople: number;
  maxParticipants: number;

  start: string; // ISO date string
  end: string; // ISO date string
}

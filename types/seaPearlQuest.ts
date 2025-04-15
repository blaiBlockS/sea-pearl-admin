export interface QuestReward {
  type: string;
  amount: number;
}

export interface SeaPearlQuestType {
  id: string;
  questNumber: number;
  title: string;
  reward: QuestReward[];

  resetCycle: string; // 반복 주기
  roundInCycle: number; // 완료까지 몇 회인지

  enabled: boolean;
  archivedPeople: number;
  maxParticipants: number;

  start: string; // ISO date string
  end: string; // ISO date string
}

export interface CommunityQuestType {
  id: string;
  quests: number;
  name: string;
  logo: string;
  enabled: boolean;

  rewards: {
    shell?: number;
    pearl?: number;
    usdt?: number;
  };

  period: {
    start: string;
    end: string;
  };
}

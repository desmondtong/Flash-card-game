export interface GameInfoContext {
  scoreboard: ScoreDetails[];
  setScoreboard: React.Dispatch<React.SetStateAction<ScoreDetails[]>>;
}

export interface Props {
  children?: string | number;
  onClick?: () => void;
  isDisabled?: boolean;
}

export interface ScoreDetails {
  score: number;
  level: number;
}

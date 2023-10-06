export interface GameInfoContextType {
  scoreboard: ScoreDetails[];
  setScoreboard: React.Dispatch<React.SetStateAction<ScoreDetails[]>>;
}

export interface Props {
  children?: any;
  onClick?: () => void;
  isDisabled?: boolean;

  //open modal
  openModal?: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  btn1Navigate?: () => void;
  score?: number;
}

export interface ScoreDetails {
  score: number;
  level: number;
}

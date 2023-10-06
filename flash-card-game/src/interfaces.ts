export interface GameInfoContextType {
  scoreboard: ScoreDetails[];
  setScoreboard: React.Dispatch<React.SetStateAction<ScoreDetails[]>>;
  questionsHistory: HistoryDetails;
  setQuestionsHistory: React.Dispatch<React.SetStateAction<HistoryDetails>>;
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
  level?: number;
  setLevel?: React.Dispatch<React.SetStateAction<number>>;
  initGameState?: (isContinue?: boolean) => void;
}

export interface ScoreDetails {
  score: number;
  level: number;
}

export interface HistoryDetails {
  [key: string]: boolean;
}

export interface ITournament {
  readonly year: number;
  readonly headquarter?: string;
  readonly champion: string;
  readonly runnerUp: string;
  readonly score: string;
}

export function wasSolvedInPenalties(score: string): boolean {
  return score[score.length - 1] === 'P';
}

export function getTotalOfGoalInGame(score: string): number {
  const arrayGoals = score.match(/\d+/g) || ['0'];
  return arrayGoals.reduce((totalGoals, goal) => +totalGoals + +goal, 0);
}

export function wasPlayedManyGames(score: string): boolean {
  const arrayGoals = score.split(',');
  return arrayGoals.length > 1;
}

export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export type TournamentName = 'uefa' | 'concacaf' | 'conmebol' | 'worldCup';

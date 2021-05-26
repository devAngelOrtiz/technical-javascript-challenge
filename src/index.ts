import {
  ITournament,
  TournamentName,
  wasSolvedInPenalties,
  getTotalOfGoalInGame,
  wasPlayedManyGames,
  isLeapYear,
} from './classes/champion';
import championDataJson from '../sources/champions.json';

const tounamentNames: Array<TournamentName> = [
  'uefa',
  'concacaf',
  'conmebol',
  'worldCup',
];

async function allTournamentsInPromiseArray<Type>(
  functionToCall: CallableFunction,
): Promise<Type[]> {
  const promisesOfFucntion = tounamentNames.map(async (tournamentName) =>
    functionToCall(tournamentName),
  );
  const arrayData: Type[][] = await Promise.all(promisesOfFucntion);

  return arrayData.flat();
}
async function allTournamentsInPromiseObject(
  functionToCall: CallableFunction,
): Promise<Record<string, unknown>> {
  const promisesOfFucntion = tounamentNames.map(async (tournamentName) =>
    functionToCall(tournamentName),
  );
  const objectData: Record<string, unknown>[] = await Promise.all(
    promisesOfFucntion,
  );

  return objectData.reduce((acc, data) => ({ ...acc, ...data }), {});
}

// The championsest countries (Confederation + World Cup or choose one tournament).
export async function getChampionsestCountries(
  tournamentName?: TournamentName,
): Promise<Record<string, unknown>> {
  if (!tournamentName) {
    return await allTournamentsInPromiseObject(getChampionsestCountries);
  }
  const finals: Array<ITournament> = championDataJson[tournamentName];
  const champions: Record<string, unknown> = {};

  finals.forEach((final) => Reflect.set(champions, final.champion, true));
  return {
    [tournamentName]: Object.keys(champions),
  } as Record<string, unknown>;
}

// The most runnerUp countries (Confederation + World Cup or choose one tournament).
export async function getMostRunnerUpCountry(
  tournamentName?: TournamentName,
): Promise<Record<string, unknown>> {
  if (!tournamentName) {
    return await allTournamentsInPromiseObject(getMostRunnerUpCountry);
  }
  const finals: Array<ITournament> = championDataJson[tournamentName];
  const runnerUps: Record<string, unknown> = {};

  finals.forEach((final) => Reflect.set(runnerUps, final.runnerUp, true));
  return {
    [tournamentName]: Object.keys(runnerUps),
  } as Record<string, unknown>;
}

// Tournaments without headquarter. => NOTE: finals without headquarter
export async function getFinalsWithoutHeadquarter(
  tournamentName?: TournamentName,
): Promise<ITournament[]> {
  if (!tournamentName) {
    return await allTournamentsInPromiseArray<ITournament>(
      getFinalsWithoutHeadquarter,
    );
  }
  const finals: Array<ITournament> = championDataJson[tournamentName];
  const finalsWithoutHeadquarter: Array<ITournament> = finals.filter(
    (final) => !final.headquarter,
  );

  return finalsWithoutHeadquarter;
}

// Champions Headquarters. NOTE: => of any or all
export async function getHeadquarters(
  tournamentName?: TournamentName,
): Promise<string[]> {
  if (!tournamentName) {
    return await allTournamentsInPromiseArray<string>(getHeadquarters);
  }
  const finals: Array<ITournament> = championDataJson[tournamentName];
  const headquarters: Record<string, unknown> = {};

  finals.forEach((final) =>
    final.headquarter
      ? Reflect.set(headquarters, final.headquarter, true)
      : null,
  );
  return Object.keys(headquarters);
}

// All finals solved in penalties. NOTE: => of any or all
export async function getFinalsWithPenalties(
  tournamentName?: TournamentName,
): Promise<ITournament[]> {
  if (!tournamentName) {
    return await allTournamentsInPromiseArray<ITournament>(
      getFinalsWithPenalties,
    );
  }
  const finals: Array<ITournament> = championDataJson[tournamentName];
  const finalsWithPenalties: Array<ITournament> = finals.filter((final) =>
    wasSolvedInPenalties(final.score),
  );

  return finalsWithPenalties;
}

// Total goals in each tournament. NOTE: => of any or all
export async function getTotalGoalsInTournament(
  tournamentName?: TournamentName,
): Promise<Record<string, unknown>> {
  if (!tournamentName) {
    return await allTournamentsInPromiseObject(getTotalGoalsInTournament);
  }
  const finals: Array<ITournament> = championDataJson[tournamentName];
  const totalGoals: Record<string, unknown> = {
    [tournamentName]: finals.reduce(
      (goalsInTournament, final) =>
        goalsInTournament + getTotalOfGoalInGame(final.score),
      0,
    ),
  };

  return totalGoals;
}

// Championships consecutively (Choose one tournament).
export async function getChampionshipsConsecutively(
  tournamentName: TournamentName,
): Promise<string[]> {
  const finals: Array<ITournament> = championDataJson[tournamentName];
  const championshipsConsecutively: Record<string, unknown> = {};
  finals.reduce((beforeChampion, final) => {
    if (beforeChampion === final.champion) {
      Reflect.set(championshipsConsecutively, final.champion, true);
    }
    return final.champion;
  }, '');

  return Object.keys(championshipsConsecutively);
}

// Runner up countries without championships.
export async function getRunnerUpWithOutChampinships(
  tournamentName?: TournamentName,
): Promise<Record<string, unknown>> {
  if (!tournamentName) {
    return await allTournamentsInPromiseObject(getRunnerUpWithOutChampinships);
  }
  const finals: Array<ITournament> = championDataJson[tournamentName];
  const runnerUps: Record<string, unknown> = {};
  const champions: Record<string, unknown> = {};

  finals.forEach(
    (final) =>
      Reflect.set(runnerUps, final.runnerUp, true) &&
      Reflect.set(champions, final.champion, true),
  );
  return {
    [tournamentName]: Object.keys(runnerUps).filter(
      (runnerUp) => !Reflect.get(champions, runnerUp),
    ),
  };
}
// All finals solved with more than one match.
export async function getFinalsWithManyMatch(
  tournamentName?: TournamentName,
): Promise<Record<string, unknown>> {
  if (!tournamentName) {
    return await allTournamentsInPromiseObject(getFinalsWithManyMatch);
  }
  const finals: Array<ITournament> = championDataJson[tournamentName];
  const totalGoals: Record<string, unknown> = {
    [tournamentName]: finals.filter((final) => wasPlayedManyGames(final.score)),
  };

  return totalGoals;
}

// World cup tournament in leap year.
export async function getFinalsInLeapYear(): Promise<ITournament[]> {
  const finals: Array<ITournament> = championDataJson['worldCup'];
  const finalsInLeapYear: ITournament[] = finals.filter((final) =>
    isLeapYear(final.year),
  );

  return finalsInLeapYear;
}

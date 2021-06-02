### General

* Project doesn't have instructions to start and boot up.

```log
hint: The '.husky/pre-commit' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.
```

* Typescript adds more complexity to the project because the functions are not semantic

---

### Improvement opportunities

src/index.ts
```ts
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
```

* These methods uses generic types and implements promises and callbacks with static data.
* At a first glance these methods doesn't say about its function.
* `tounamentNames` variable must be passed by function argument instead scope call.

---

src/index.ts
```ts
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
```

```ts
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
```

* `return await` is returning a promise like `return allTournamentsInPromiseObject`
* Reflect modifies the based object and it's not a pure behaviour. Use a new Map instead.


```ts
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
```

* This method returns null as headquarter.

---

### Outputs

```log
$ ts-node src/logs.ts 
championsestCountries {
  uefa: [
    'URSS',
    'Spain',
    'Italy',
    'Germany',
    'Czechoslovakia',
    'France',
    'Netherlands',
    'Denmark',
    'Greek',
    'Portugal'
  ],
  concacaf: [
    'United States of America',
    'Mexico',
    'Canada',
    'Costa Rica',
    'Guatemala',
    'Haiti',
    'Honduras'
  ],
  conmebol: [
    'Brazil',    'Chile',
    'Uruguay',   'Colombia',
    'Argentina', 'Paraguay',
    'Peru',      'Bolivia'
  ],
  worldCup: [
    'Uruguay',
    'Italy',
    'West Germany',
    'Brazil',
    'England',
    'Argentina',
    'Germany',
    'France',
    'Spain'
  ]
}
getMostRunnerUpCountry {
  worldCup: [
    'Argentina',    'Czechoslovakia',
    'Hungaray',     'Brazil',
    'Hungary',      'Sweden',
    'West Germany', 'Italy',
    'Netherlands',  'Germany',
    'France',       'Croatia'
  ]
}
finalsWithoutHeadquarter [
  {
    year: 1983,
    champion: 'Uruguay',
    runnerUp: 'Brazil',
    score: '2-0, 1-1'
  },
  {
    year: 1983,
    champion: 'Uruguay',
    runnerUp: 'Brazil',
    score: '2-0, 1-1'
  },
  {
    year: 1979,
    champion: 'Paraguay',
    runnerUp: 'Chile',
    score: '3-0, 0-1, 0-0'
  },
  {
    year: 1975,
    champion: 'Peru',
    runnerUp: 'Colombia',
    score: '0-1, 2-0, 1-0'
  }
]
headquarters [
  'Uruguay',
  'Italy',
  'France',
  'Brazil',
  'Swiss',
  'Sweden',
  'Chile',
  'England',
  'Mexico',
  'Germany',
  'Argentina',
  'Spain',
  'United States of America',
  'Japan and Corea',
  'South Africa',
  'Russia'
]
finalsWithPenalties [
  {
    year: 1994,
    headquarter: 'United States of America',
    champion: 'Brazil',
    runnerUp: 'Italy',
    score: '0-0 P'
  },
  {
    year: 2006,
    headquarter: 'Germany',
    champion: 'Italy',
    runnerUp: 'France',
    score: '1-1 P'
  }
]
getTotalGoalsInTournament { conmebol: 62 }
getChampionshipsConsecutively [ 'Italy', 'Brazil' ]
getRunnerUpWithOutChampinships {
  worldCup: [
    'Czechoslovakia',
    'Hungaray',
    'Hungary',
    'Sweden',
    'Netherlands',
    'Croatia'
  ]
}
getFinalsWithManyMatch {
  conmebol: [
    {
      year: 1983,
      champion: 'Uruguay',
      runnerUp: 'Brazil',
      score: '2-0, 1-1'
    },
    {
      year: 1983,
      champion: 'Uruguay',
      runnerUp: 'Brazil',
      score: '2-0, 1-1'
    },
    {
      year: 1979,
      champion: 'Paraguay',
      runnerUp: 'Chile',
      score: '3-0, 0-1, 0-0'
    },
    {
      year: 1975,
      champion: 'Peru',
      runnerUp: 'Colombia',
      score: '0-1, 2-0, 1-0'
    }
  ]
}
getFinalsInLeapYear []
```

```ts
// Bad: Returns a list of champions
  const championsestCountries = await utils.getChampionsestCountries();
  console.log('The most champion countries', championsestCountries);

  // Bad: Returns a list of runners up
  const mostRunnerUpCountry = await utils.getMostRunnerUpCountry('worldCup');
  console.log('The most runner up countries', mostRunnerUpCountry);

  // Ok
  const finalsWithoutHeadquarter = await utils.getFinalsWithoutHeadquarter(
    'conmebol',
  );
  console.log('finalsWithoutHeadquarter', finalsWithoutHeadquarter);

  // Ok
  const headquarters = await utils.getHeadquarters('worldCup');
  console.log('headquarters', headquarters);

  // Ok
  const finalsWithPenalties = await utils.getFinalsWithPenalties('worldCup');
  console.log('finalsWithPenalties', finalsWithPenalties);

  // Ok
  const getTotalGoalsInTournament = await utils.getTotalGoalsInTournament(
    'conmebol',
  );
  console.log('getTotalGoalsInTournament', getTotalGoalsInTournament);

  // Ok
  const getChampionshipsConsecutively =
    await utils.getChampionshipsConsecutively('worldCup');
  console.log('getChampionshipsConsecutively', getChampionshipsConsecutively);

  // Ok
  const getRunnerUpWithOutChampinships =
    await utils.getRunnerUpWithOutChampinships('worldCup');
  console.log('getRunnerUpWithOutChampinships', getRunnerUpWithOutChampinships);

  // Ok
  const getFinalsWithManyMatch = await utils.getFinalsWithManyMatch('conmebol');
  console.log('getFinalsWithManyMatch', getFinalsWithManyMatch);

  // Ok
  const getFinalsInLeapYear = await utils.getFinalsInLeapYear();
  console.log('getFinalsInLeapYear', getFinalsInLeapYear);
})();

```

Results
```log
1. The most champion country
Uruguay (18)

2. The most runner up country
Argentina (17)

3. Tournaments without headquarter
concacaf 1985, concacaf 1989, conmebol 1983, conmebol 1983, conmebol 1979, conmebol 1975

4. Headquarter champions
uefa: Spain 1964, uefa: Italy 1968, uefa: France 1984, concacaf: United States of America 1991, concacaf: United States of America 2002, concacaf: United States of America 2005, concacaf: United States of America 2007, concacaf: United States of America 2013, concacaf: Costa Rica 1969, concacaf: Haiti 1973, concacaf: Mexico 1977, concacaf: Honduras 1981, conmebol: Brazil 2019, conmebol: Chile 2015, conmebol: Colombia 2001, conmebol: Uruguay 1995, conmebol: Brazil 1989, conmebol: Uruguay 1967, conmebol: Bolivia 1963, conmebol: Argentina 1959, conmebol: Uruguay 1956, conmebol: Brazil 1949, conmebol: Argentina 1946, conmebol: Uruguay 1942, conmebol: Peru 1939, conmebol: Argentina 1937, conmebol: Argentina 1929, conmebol: Argentina 1925, conmebol: Uruguay 1924, conmebol: Uruguay 1923, conmebol: Brazil 1922, conmebol: Argentina 1921, conmebol: Uruguay 1917, worldCup: Uruguay 1930, worldCup: Italy 1934, worldCup: England 1966, worldCup: Argentina 1978, worldCup: France 1998

5. Finals solved in penalties
uefa: Yugoslavia 1976, concacaf: United States of America 1991, concacaf: United States of America 2005, conmebol: United States of America 2016, conmebol: Chile 2015, conmebol: Peru 2004, conmebol: Uruguay 1995, worldCup: United States of America 1994, worldCup: Germany 2006

6. Goals per confederation
uefa: 37, concacaf: 34, conmebol: 62, worldCup: 74

7. Consecutively champions
Italy: 1930, 1934. Uruguay: 1938, 1950. Brazil: 1954, 1958. England: 1962, 1966. Argentina: 1974, 1978. Germany: 1986, 1990. France: 1994, 1998. Spain: 2006, 2010

8. Runner up countries without championships
Yugoslavia 2, Belgium 1, Czech Republic 1

9. Finals solved with many matches
conmebol 1983, conmebol 1983, conmebol 1979, conmebol 1975

10. Leap year world cup

```
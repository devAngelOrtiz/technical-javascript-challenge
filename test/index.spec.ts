import {
  getChampionsestCountries,
  getChampionshipsConsecutively,
  getFinalsInLeapYear,
  getFinalsWithManyMatch,
  getFinalsWithoutHeadquarter,
  getFinalsWithPenalties,
  getHeadquarters,
  getMostRunnerUpCountry,
  getRunnerUpWithOutChampinships,
  getTotalGoalsInTournament,
} from '../src/index';

describe('Test Challenge', () => {
  describe('Test getChampionsestCountries', () => {
    test('all', async () => {
      let response = await getChampionsestCountries();

      expect(Reflect.get(response, 'uefa').length).toBe(10);
      expect(Reflect.get(response, 'concacaf').length).toBe(7);
      expect(Reflect.get(response, 'conmebol').length).toBe(8);
      expect(Reflect.get(response, 'worldCup').length).toBe(9);
    });
    test('uefa', async () => {
      let response = await getChampionsestCountries('uefa');

      expect(Reflect.get(response, 'uefa').length).toBe(10);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('concacaf', async () => {
      let response = await getChampionsestCountries('concacaf');

      expect(Reflect.get(response, 'concacaf').length).toBe(7);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('conmebol', async () => {
      let response = await getChampionsestCountries('conmebol');

      expect(Reflect.get(response, 'conmebol').length).toBe(8);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('worldCup', async () => {
      let response = await getChampionsestCountries('worldCup');

      expect(Reflect.get(response, 'worldCup').length).toBe(9);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
    });
  });

  describe('Test getMostRunnerUpCountry', () => {
    test('all', async () => {
      let response = await getMostRunnerUpCountry();

      expect(Reflect.get(response, 'uefa').length).toBe(9);
      expect(Reflect.get(response, 'concacaf').length).toBe(12);
      expect(Reflect.get(response, 'conmebol').length).toBe(9);
      expect(Reflect.get(response, 'worldCup').length).toBe(12);
    });
    test('uefa', async () => {
      let response = await getMostRunnerUpCountry('uefa');

      expect(Reflect.get(response, 'uefa').length).toBe(9);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('concacaf', async () => {
      let response = await getMostRunnerUpCountry('concacaf');

      expect(Reflect.get(response, 'concacaf').length).toBe(12);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('conmebol', async () => {
      let response = await getMostRunnerUpCountry('conmebol');

      expect(Reflect.get(response, 'conmebol').length).toBe(9);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('worldCup', async () => {
      let response = await getMostRunnerUpCountry('worldCup');

      expect(Reflect.get(response, 'worldCup').length).toBe(12);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
    });
  });

  test('Test getFinalsWithoutHeadquarter', async () => {
    let response = await getFinalsWithoutHeadquarter();

    expect(response.length).toBe(6);
  });

  test('Test getHeadquarters', async () => {
    let response = await getHeadquarters();

    expect(response.length).toBe(49);
  });

  test('Test getFinalsWithPenalties', async () => {
    let response = await getFinalsWithPenalties();
    expect(response.length).toBe(9);
  });

  describe('Test getTotalGoalsInTournament', () => {
    test('all', async () => {
      let response = await getTotalGoalsInTournament();

      expect(Reflect.get(response, 'uefa')).toBe(37);
      expect(Reflect.get(response, 'concacaf')).toBe(34);
      expect(Reflect.get(response, 'conmebol')).toBe(62);
      expect(Reflect.get(response, 'worldCup')).toBe(74);
    });
    test('uefa', async () => {
      let response = await getTotalGoalsInTournament('uefa');

      expect(Reflect.get(response, 'uefa')).toBe(37);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('concacaf', async () => {
      let response = await getTotalGoalsInTournament('concacaf');

      expect(Reflect.get(response, 'concacaf')).toBe(34);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('conmebol', async () => {
      let response = await getTotalGoalsInTournament('conmebol');

      expect(Reflect.get(response, 'conmebol')).toBe(62);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('worldCup', async () => {
      let response = await getTotalGoalsInTournament('worldCup');

      expect(Reflect.get(response, 'worldCup')).toBe(74);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
    });
  });

  describe('Test getChampionshipsConsecutively', () => {
    test('uefa', async () => {
      let response = await getChampionshipsConsecutively('uefa');

      expect(response.length).toBe(1);
    });
    test('concacaf', async () => {
      let response = await getChampionshipsConsecutively('concacaf');

      expect(response.length).toBe(2);
    });
    test('conmebol', async () => {
      let response = await getChampionshipsConsecutively('conmebol');

      expect(response.length).toBe(4);
    });
    test('worldCup', async () => {
      let response = await getChampionshipsConsecutively('worldCup');

      expect(response.length).toBe(2);
    });
  });

  describe('Test getRunnerUpWithOutChampinships', () => {
    test('all', async () => {
      let response = await getRunnerUpWithOutChampinships();

      expect(Reflect.get(response, 'uefa').length).toBe(3);
      expect(Reflect.get(response, 'concacaf').length).toBe(6);
      expect(Reflect.get(response, 'conmebol').length).toBe(1);
      expect(Reflect.get(response, 'worldCup').length).toBe(6);
    });
    test('uefa', async () => {
      let response = await getRunnerUpWithOutChampinships('uefa');

      expect(Reflect.get(response, 'uefa').length).toBe(3);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('concacaf', async () => {
      let response = await getRunnerUpWithOutChampinships('concacaf');

      expect(Reflect.get(response, 'concacaf').length).toBe(6);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('conmebol', async () => {
      let response = await getRunnerUpWithOutChampinships('conmebol');

      expect(Reflect.get(response, 'conmebol').length).toBe(1);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('worldCup', async () => {
      let response = await getRunnerUpWithOutChampinships('worldCup');

      expect(Reflect.get(response, 'worldCup').length).toBe(6);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
    });
  });

  describe('Test getFinalsWithManyMatch', () => {
    test('all', async () => {
      let response = await getFinalsWithManyMatch();

      expect(Reflect.get(response, 'uefa').length).toBe(0);
      expect(Reflect.get(response, 'concacaf').length).toBe(0);
      expect(Reflect.get(response, 'conmebol').length).toBe(4);
      expect(Reflect.get(response, 'worldCup').length).toBe(0);
    });
    test('uefa', async () => {
      let response = await getFinalsWithManyMatch('uefa');

      expect(Reflect.get(response, 'uefa').length).toBe(0);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('concacaf', async () => {
      let response = await getFinalsWithManyMatch('concacaf');

      expect(Reflect.get(response, 'concacaf').length).toBe(0);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('conmebol', async () => {
      let response = await getFinalsWithManyMatch('conmebol');

      expect(Reflect.get(response, 'conmebol').length).toBe(4);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
      expect(Reflect.get(response, 'worldCup')).toBe(undefined);
    });
    test('worldCup', async () => {
      let response = await getFinalsWithManyMatch('worldCup');

      expect(Reflect.get(response, 'worldCup').length).toBe(0);
      expect(Reflect.get(response, 'concacaf')).toBe(undefined);
      expect(Reflect.get(response, 'conmebol')).toBe(undefined);
      expect(Reflect.get(response, 'uefa')).toBe(undefined);
    });
  });

  test('Test getFinalsInLeapYear', async () => {
    let response = await getFinalsInLeapYear();

    expect(response.length).toBe(0);
  });
});

import { UUID } from '.';

describe('UUID', () => {
  test('should generate random 12 length by base62', () => {
    const results: string[] = [];

    for (let i = 0; i <= 1000; i++) {
      const uuid: string = UUID();
      results.push(uuid);
    }

    results.forEach((uuid) => expect(uuid).toMatch(/^[\dA-Za-z]{12}$/));
  });
});

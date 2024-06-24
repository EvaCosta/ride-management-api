import { DateTime } from '../core/domain/value-objects/DateTime';

describe('DateTime', () => {
  describe('getValue', () => {
    it('Deve retornar o valor de data e hora', () => {
      const dateTimeString = '2023-06-25T12:00:00Z';
      const dateTime = new DateTime(dateTimeString);
      expect(dateTime.getValue()).toEqual(new Date(dateTimeString));
    });
  });

  describe('toString', () => {
    it('Deve retornar a representação em string da data e hora', () => {
      const dateTimeString = '2023-06-25T12:00:00.000Z';
      const dateTime = new DateTime(dateTimeString);
      expect(dateTime.toString()).toBe(dateTimeString);
    });
  });

});

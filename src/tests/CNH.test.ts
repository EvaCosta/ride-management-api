import { CNH } from "../core/domain/value-objects/CNH";

describe('CNH', () => {
  it('should create CNH object with valid value', () => {
    const validCNH = '12345678900';
    const cnh = new CNH(validCNH);
    expect(cnh.getValue()).toEqual(validCNH);
  });

  it('should throw error for invalid CNH value', () => {
    const invalidCNH = '12345';
    expect(() => new CNH(invalidCNH)).toThrow('CNH inválida.');
  });
});
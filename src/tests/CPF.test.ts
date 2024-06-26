import { CPF } from "../core/domain/value-objects/CPF";

describe('CPF', () => {
  it('should throw error for invalid CPF value', () => {
    const invalidCPF = '123.456.789-00';
    expect(() => new CPF(invalidCPF)).toThrow('CPF inválido');
  });
});
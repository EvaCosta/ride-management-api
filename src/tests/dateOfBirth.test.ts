import { DateOfBirth } from '../core/domain/value-objects/DateOfBirth';

describe('DateOfBirth', () => {
  it('Deve criar corretamente a data de nascimento', () => {
    const dataNascimento = new DateOfBirth('1990-05-15');
    expect(dataNascimento.getValue()).toEqual(new Date('1990-05-15'));
  });

  it('Deve lançar um erro ao criar com uma data que corresponda a menos de 18 anos', () => {
    expect(() => new DateOfBirth('2020-02-30')).toThrow('A pessoa deve ter pelo menos 18 anos de idade.');
  });

  it('Deve lançar um erro ao criar com uma data de nascimento inválida', () => {
    const invalidDateString = '2020-05-45'; // Data com dia inválido

    expect(() => new DateOfBirth(invalidDateString)).toThrow('Data de nascimento inválida.');
  });
  
  it('Deve lançar um erro ao criar com uma data posterior à data atual', () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getFullYear() + 1, 0, 1); // Data futura
    const futureDateString = futureDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    expect(() => new DateOfBirth(futureDateString)).toThrow('A data de nascimento não pode ser posterior à data atual.');
  });

  it('Deve fornecer uma representação em string formatada', () => {
    const dataNascimento = new DateOfBirth('1985-10-25');
    expect(dataNascimento.toString()).toBe('1985-10-25T00:00:00.000Z');
  });
});

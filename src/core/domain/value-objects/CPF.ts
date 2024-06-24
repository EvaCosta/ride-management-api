export class CPF {
  private readonly cpf: string;

  constructor(cpf: string) {
      if (!this.isValidCPF(cpf)) {
          throw new Error('CPF inválido');
      }
      this.cpf = cpf;
  }

  public  isValidCPF(cpf: string): boolean {
      cpf = this.normalizeCPF(cpf);

      if (!this.hasValidLength(cpf) || this.isBlocked(cpf)) {
          return false;
      }

      const digits = cpf.substring(0, 9);

      const firstVerifierDigit = this.calculateVerifierDigit(digits);
      if (Number(cpf.charAt(9)) !== firstVerifierDigit) {
          return false;
      }

      const secondVerifierDigit = this.calculateVerifierDigit(digits + String(firstVerifierDigit));
      if (Number(cpf.charAt(10)) !== secondVerifierDigit) {
          return false;
      }

      return true;
  }

  private normalizeCPF(cpf: string): string {
      return cpf.replace(/[^\d]/g, '');
  }

  private hasValidLength(cpf: string): boolean {
      return cpf.length === 11;
  }

  private isBlocked(cpf: string): boolean {
      const blockedDigits = [
          '00000000000',
          '11111111111',
          '22222222222',
          '33333333333',
          '44444444444',
          '55555555555',
          '66666666666',
          '77777777777',
          '88888888888',
          '99999999999'
      ];

      return blockedDigits.includes(cpf);
  }

  private calculateVerifierDigit(digits: string): number {
      const factor = digits.length + 1;
      const sum = digits.split('').reduce((accum, val, i) => accum + (Number(val) * (factor - i)), 0);
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
  }

  getValue(): string {
      return this.cpf;
  }

  toString(): string {
      return this.cpf;
  }
}

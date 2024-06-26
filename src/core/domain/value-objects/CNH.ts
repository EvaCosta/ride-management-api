export class CNH {
    private readonly value: string;
  
    constructor(value: string) {
      if (!this.isValidCNH(value)) {
        throw new Error('CNH inválida.');
      }
      this.value = value;
    }
  
    private isValidCNH(value: string): boolean {
      const cnhRegex = /^[0-9]{11}$/;
      return cnhRegex.test(value);
    }
  
    public getValue(): string {
      return this.value;
    }
}

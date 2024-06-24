export class DateTime{
    private readonly dateTime: Date;
  
    constructor(dateTime: string) {
      const parsedDate = new Date(dateTime);
  
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Data e hora inválidas.');
      }

      // Validar data futura
      const currentDate = new Date();
      if (parsedDate > currentDate) {
          throw new Error('A data não pode ser posterior à data atual.');
      }

      this.dateTime = parsedDate;
    }
  
    public getValue(): Date {
      return this.dateTime;
    }
  
    public toString(): string {
      return this.dateTime.toISOString();
    }
  }
  
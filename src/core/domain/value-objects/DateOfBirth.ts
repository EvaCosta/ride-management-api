export class DateOfBirth {
    private readonly dateOfBirth: Date;

    constructor(dateOfBirth: string) {
        const parsedDate = new Date(dateOfBirth);

        if (isNaN(parsedDate.getTime())) {
            throw new Error('Data de nascimento inválida.');
        }

        // Validar data futura
        const currentDate = new Date();
        if (parsedDate > currentDate) {
            throw new Error('A data de nascimento não pode ser posterior à data atual.');
        }

        // Validar idade mínima (18 anos)
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

        if (parsedDate > eighteenYearsAgo) {
            throw new Error('A pessoa deve ter pelo menos 18 anos de idade.');
        }

        this.dateOfBirth = parsedDate;
    }

    public getValue(): Date {
        return this.dateOfBirth;
    }

    public toString(): string {
        return this.dateOfBirth.toISOString(); // ou outro formato desejado
    }
}

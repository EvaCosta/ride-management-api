import config from "../config";

describe('Testes do arquivo config', () => {
    it('deve importar corretamente as configurações', () => {
        expect(config).toBeDefined(); // Verifica se as configurações foram importadas corretamente
        expect(config.db.user).toEqual('postgres'); // Exemplo de verificação das propriedades
        expect(config.db.password).toEqual('1234');
    });
});


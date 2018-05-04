export class User {
    constructor(public email: string,
        public name: string,
        public perfil: string,
        private password: string) { }


    matches(another: User): boolean {
        return another !== undefined && another.email === this.email && another.password === this.password;
    }

}

export const users: {[key: string]: User} = {
    "teste@teste.com": new User("teste@teste.com", "Teste", "user", "teste123"),
    "teste2@teste.com": new User("teste2@teste.com", "Teste2","user", "teste456"),
    "t@t.com": new User("t@t.com", "T","admin", "t"),
    "ta": new User("ta@t.com", "TA","user", "ta"),
    "user": new User("u@t.com", "Administrador","admin", "123")
}
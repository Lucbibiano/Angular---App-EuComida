"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, perfil, password) {
        this.email = email;
        this.name = name;
        this.perfil = perfil;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined && another.email === this.email && another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "teste@teste.com": new User("teste@teste.com", "Teste", "user", "teste123"),
    "teste2@teste.com": new User("teste2@teste.com", "Teste2", "user", "teste456"),
    "t@t.com": new User("t@t.com", "T", "admin", "t"),
    "ta": new User("ta@t.com", "TA", "user", "ta"),
    "user": new User("u@t.com", "Administrador", "admin", "123")
};

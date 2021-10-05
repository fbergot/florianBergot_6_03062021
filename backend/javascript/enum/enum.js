"use strict";
exports.__esModule = true;
exports.AuthMessage = exports.MessagesUserController = void 0;
var MessagesUserController;
(function (MessagesUserController) {
    MessagesUserController["success"] = "Utilisateur cr\u00E9\u00E9";
    MessagesUserController["notPresent"] = "Cette utilisateur n'existe pas";
    MessagesUserController["badPassword"] = "Mot de passe incorrect";
})(MessagesUserController = exports.MessagesUserController || (exports.MessagesUserController = {}));
var AuthMessage;
(function (AuthMessage) {
    AuthMessage["unauthorized"] = "Requ\u00EAte non authentifi\u00E9e";
    AuthMessage["errorMessageToken"] = "Aucun token dans le header authorization ou mal form\u00E9";
    AuthMessage["userIdNotCorrect"] = "User ID incorrecte";
})(AuthMessage = exports.AuthMessage || (exports.AuthMessage = {}));

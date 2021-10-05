export enum MessagesUserController {
    success = 'Utilisateur créé',
    notPresent = 'Cette utilisateur n\'existe pas',
    badPassword = 'Mot de passe incorrect'
}

export enum AuthMessage {
    unauthorized = "Requête non authentifiée",
    errorMessageToken = "Aucun token dans le header authorization ou mal formé",
    userIdNotCorrect = "User ID incorrecte"
} 

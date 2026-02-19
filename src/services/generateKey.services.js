module.exports.generateKey = () => {
    
    const prefix = "lyr-";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const keyLength = 20

    let randomPart = "";
    for (let i = 0; i < keyLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomPart += characters[randomIndex];
    }
    return prefix + randomPart;
}


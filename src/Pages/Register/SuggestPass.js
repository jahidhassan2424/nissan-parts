function makeId(length) {
    let result1 = '';
    let result2 = '';
    let result3;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const special = '!@#$%^&*';
    const number = '!@#$%^&*';
    const charactersLength = characters.length;
    const specialLength = special.length;
    for (let i = 0; i < length; i++) {
        result1 += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    for (let i = 0; i < 2; i++) {
        result2 += special.charAt(Math.floor(Math.random(1, 3) *
            specialLength));
    }
    for (let i = 0; i < length; i++) {
        result3 = (Math.floor(Math.random(1, 9) * 100));
    }
    return (result1 + result2 + result3);
}

export default makeId;
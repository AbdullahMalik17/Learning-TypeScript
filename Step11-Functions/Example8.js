var nickname = ["Abdullah", "bidda", "topper", "rasgullah"];
function nicknames(callback) {
    for (var i = 0; i < nickname.length; i++) {
        console.log(nickname[i]);
    }
}
function callback(index) {
    return nickname[index];
}
nicknames(callback);

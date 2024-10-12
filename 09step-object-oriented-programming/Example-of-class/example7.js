// get and set are the function of encapsulation . 
var acc = [["Abdullah", 5172], ["haleema", 6777]];
var bank = /** @class */ (function () {
    function bank(account1, password1) {
        this.account1 = account1;
        this.password1 = password1;
    }
    Object.defineProperty(bank.prototype, "name", {
        get: function () {
            return this.account1 = this.account1;
            return this.password1 = this.password1;
        },
        set: function (newname) {
            if (acc[0][1] && (this.account1 === "Abdullah")) {
                this.password1 = 777;
            }
            else {
                this.password1 = 888;
            }
        },
        enumerable: false,
        configurable: true
    });
    return bank;
}());
var Bank = new bank("haleema", "hhhh");
console.log(Bank.password1);

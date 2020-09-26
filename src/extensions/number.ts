export function enLoc(num: number, addSign = false, leadingChar = '') {
    const s = num.toLocaleString('en') + leadingChar

    return num <= 0 ? s : '-' + s
}

declare global {
    interface Number {
        enLoc(addSign?: boolean, leadingChar?: string): string
    }
}

Number.prototype.enLoc = function (addSign = false, leadingChar = '') { return enLoc(this, addSign, leadingChar) }
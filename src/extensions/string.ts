export enum FillSide {
    Left,
    Right
}

declare global {
    interface String {
        zfill(length: number, fillChar?: string, side?: FillSide): string
        filled(length: number, fillChar?: string, side?: FillSide): string
        remove(toRemove: string): string
        replaceAll(toReplace: string, toReplaceWith?: string): string
        trimRight(charlist?: string): string
        trimLeft(charlist?: string): string
        trim(charlist?: string): string
        lastPathComponent(): string
    }
}

String.prototype.zfill = function(length: number, fillChar: string = ' ', side: FillSide = FillSide.Left) {
    return this.filled(length, side, fillChar)
}
String.prototype.filled = function(length: number, fillChar: string = ' ', side: FillSide = FillSide.Left) {
    if (this.length >= length) return this

    return side == FillSide.Right ? this + fillChar.repeat(length-this.length) : fillChar.repeat(length-this.length) + this
}
String.prototype.remove = function(toRemove: string) { return this.replaceAll(toRemove) }
String.prototype.replaceAll = function(toReplace: string, toReplaceWith?: string) {
    return this.split(toReplace).join(toReplaceWith ?? '')
}
String.prototype.trimRight = function(chars?: string) {
    if (!chars || chars.length == 0) chars = ' '

    var newStr = `${this}`

    while (newStr.endsWith(chars)) {
        newStr = newStr.substr(0, newStr.length - chars.length)
    }

    return newStr
}
String.prototype.trimLeft = function(chars?: string) {
    if (!chars || chars.length == 0) chars = ' '

    var newStr = `${this}`

    while (newStr.startsWith(chars)) {
        newStr = newStr.substr(chars.length - 1, newStr.length - chars.length)
    }
    
    return newStr
}
String.prototype.trim = function(chars?: string) { return this.trimLeft(chars).trimRight(chars) }
String.prototype.lastPathComponent = function(): string { return this.trimRight('/').split('/').last() }
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
        trimRight(chars?: string | string[]): string
        trimLeft(chars?: string | string[]): string
        trim(chars?: string | string[]): string
        stripight(chars?: string | string[]): string
        stripLeft(chars?: string | string[]): string
        strip(chars?: string | string[]): string
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
String.prototype.trimRight = function(chars?: string | string[]) {
    if (!chars || chars.length == 0) { chars = [' ', '\n'] }
    else if (!Array.isArray(chars)) { chars = [chars] }

    var newStr = `${this}`

    while (true) {
        var didEndWith = false

        for (const char of chars) {
            if (newStr.endsWith(char)) {
                newStr = newStr.substr(0, newStr.length - char.length)

                didEndWith = true
            }
        }

        if (!didEndWith) break
    }

    return newStr
}
String.prototype.trimLeft = function(chars?: string | string[]) {
    if (!chars || chars.length == 0) { chars = [' ', '\n'] }
    else if (!Array.isArray(chars)) { chars = [chars] }

    var newStr = `${this}`

    while (true) {
        var didEndWith = false

        for (const char of chars) {
            if (newStr.startsWith(char)) {
                newStr = newStr.substr(chars.length - 1, newStr.length - chars.length)

                didEndWith = true
            }
        }

        if (!didEndWith) break
    }
    
    return newStr
}
String.prototype.trim = function(chars?: string | string[]) { return this.trimLeft(chars).trimRight(chars) }

String.prototype.stripLeft = function(chars?: string | string[]) { return this.trimLeft(chars) }
String.prototype.stripight = function(chars?: string | string[]) { return this.trimRight(chars) }
String.prototype.strip = function(chars?: string | string[]) { return this.trim(chars) }

String.prototype.lastPathComponent = function(): string { return this.trimRight('/').split('/').last() }
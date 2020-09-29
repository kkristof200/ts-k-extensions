export enum FillSide {
    Left,
    Right
}

declare global {
    interface String {
        zfill(length: number, fillChar?: string, side?: FillSide): string
        filled(length: number, fillChar?: string, side?: FillSide): string
        regexReplace(regexStr: string, toReplaceWith?: string): string
        trimRight(charlist?: string): string
        trimleft(charlist?: string): string
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
String.prototype.trimRight = function(charlist?: string) { return this.regexReplace('[' + charlist ?? '\s' + ']+$') }
String.prototype.trimLeft = function(charlist?: string) { return this.regexReplace('^[' + charlist ?? '\s' + ']+') }
String.prototype.trim = function(charlist?: string) {
    if (!charlist) charlist = '\s'
  
    return this.trimLeft(charlist).trimRight(charlist)
}
String.prototype.regexReplace = function(regexStr: string, toReplaceWith?: string) {  
    return this.replace(new RegExp(regexStr), toReplaceWith ?? '')
}
String.prototype.lastPathComponent = function(): string { return this.trimRight('/').split('/').last }
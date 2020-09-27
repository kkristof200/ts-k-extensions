export enum FillSide {
    Left,
    Right
}

declare global {
    interface String {
        filled(length: number, side?: FillSide, fillChar?: string): string
    }
}
String.prototype.filled = function (length: number, side: FillSide = FillSide.Left, fillChar: string = ' ') {
    if (this.length >= length) return this
    if (side == FillSide.Right) return this + fillChar.repeat(length-this.length)
    
    return  fillChar.repeat(length-this.length) + this
}
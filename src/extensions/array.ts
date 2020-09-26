export function sort<T>(list: any[], property: any, ascending = true): T[] { 
    return list.sort((a, b) => {
        if (a[property] < b[property]) {
            return ascending ? -1 : 1
        }

        if (a[property] > b[property]) {
            return ascending ? 1 : -1
        }

        return 0
    });
}

export function shuffle(list: any[]): any[] {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }

    return list
}

declare global {
    export interface Array<T> {
        sorted(property: any, ascending?: boolean): Array<T>
        extend(elements: T[]): void
        setExtend(elements: T[]): boolean
        setPush(element: T): boolean
        remove(element: T): T[]
        shuffled(): T[]
        randomElements(count: number): T[]
        random?: T
        first?: T
        last?: T
        getProperties<TT>(this: T[], name: any): TT[]
    }
}

Array.prototype.sorted = function (property: any, ascending: boolean = true) { return sort(this, property, ascending) }
Array.prototype.extend = function<T>(this: T[], elements: T[]) { for (const e of elements) { this.push(e) } }
Array.prototype.setExtend = function<T>(this: T[], elements: T[]) {
    var didAdd = false

    for (const element of elements) {
        if (this.setPush(element) && !didAdd) didAdd = true
    }

    return didAdd
}
Array.prototype.setPush = function<T>(this: T[], element: T) {
    if (this.includes(element)) return false

    this.push(element)

    return true
}
Array.prototype.remove = function<T>(this: T[], element: T) { return this.filter(existingElement => existingElement !== element) }
Array.prototype.shuffled = function<T>(this: T[]) { return shuffle(this) }
Array.prototype.randomElements = function<T>(this: T[], count: number) { return this.length > 0 ? this.shuffled().slice(0, count) : [] }

Array.prototype.random = function () { return this.length == 0 ? this[Math.round(Math.random() * (this.length - 1))] : null }
Array.prototype.first = function () { return this.length > 0 ? this[0] : null }
Array.prototype.last = function () { return this.lengSth > 0 ? this[this.length - 1] : null }

Array.prototype.getProperties = function<T, TT>(this: T[], name: any) {
    var l: TT[] = []

    for (const e of <any[]>this) {
        if (name in e) l.push(e[name])
    }

    return l
}
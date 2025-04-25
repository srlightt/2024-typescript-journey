// Generic
function getFirstItem<T>(arg: Array<T>): T | undefined {
    return arg[0];
}

const numbers: Array<number> = [99, 34, 23, 44];
const names: Array<string> = ["light", "black", "tux"];
const inputs: Array<boolean> = [true, false, false, true];
const items = [
    99, 34, 23, 44,
    "light", "black", "tux",
    true, false, false, true
];

const result0 = getFirstItem(numbers); // Output: 99
const result1 = getFirstItem(names); // "Output: light"
const result2 = getFirstItem(inputs); // Output: true
const result3 = getFirstItem(items); // Output: 99 result3: string | number | boolean

// using interfaces as generic parameter
interface AdminBody<T> {
    id: number;
    data: T
}

interface AdminData {
    name: string;
    permissions: Array<string>;
    role: 'admin';
}

function createAdmin(): AdminBody<AdminData> {
    return {
        id: 0,
        data: { name: "bob", permissions: ["manageRoles"], role: "admin" }
    }
}

// generics with classes
class CustomArray<T> {
    private items: Array<T>;
    
    constructor() {
        this.items = [];
    }
    
    public add(item: T) {
        this.items.push(item);
    }
    public removeFirst(): T | undefined {
        return this.items.length > 0 ? this.items.shift() : undefined;
    }
    public isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const myArray = new CustomArray<string>();
myArray.add("chair");
myArray.add("door");
myArray.removeFirst();
console.log(myArray); // items: ["door"]

interface User {
    id: number;
    name: string;
    active?: boolean;
}

const userArray = new CustomArray<User>();
userArray.add({ id: 0, name: "light", active: true });

const getRemoved = userArray.removeFirst();
getRemoved?.name; // "light"

const moreTypes = new CustomArray<string | boolean>();
moreTypes.add("one");
moreTypes.add(true);
// @ts-expect-error
moreTypes.add(1); // Argument of type '1' is not assignable to parameter of type 'string | boolean'


// restricting generics
function logLength<T extends { length: number }>(arg: T) {
    return arg.length;
}

const myArr = [0, 1, 2];
const myStr = "foo";
const myObj = { length: 12 };

logLength(myArr); // 3
logLength(myStr); // 3
logLength(myObj); // 12

// using interfaces to restrict generics
interface HasLevel {
    level: number;
}

function getLevel<T extends HasLevel>(player: T): number {
    return player.level;
}

const player0 = {
    name: "black"
}

const player1 = {
    name: "light",
    level: 100
}

// @ts-expect-error
getLevel(player0); // Property 'level' is missing in type '{ name: string; }' but required in type 'HasLevel'
getLevel(player1); // output: 100

// restriction with primitive types
function concatenate<T extends string | number>(a: T, b: T): string {
    return `${a}${b}`;
}

concatenate("foo", "bar");
concatenate(1, 5);
// @ts-expect-error
concatenate("foo", 5); // error! generic T already assigned to "foo"
// @ts-expect-error
concatenate(5, "foo"); // error! generic T already assigned to 5
// @ts-expect-error
concatenate(true, "xpto"); // Argument of type 'boolean' is not assignable to parameter of type 'string | number'

// 
class Elf {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
};

class Archery extends Elf { };

class Mage extends Elf { };

// if I would use Class: T, the Class parameter will behave as an instance constructor instead.
function createElf<T extends Elf>(Class: new (name: string) => T, name: string) {
    return new Class(name);
}

createElf(Archery, "lactus");
createElf(Mage, "john");
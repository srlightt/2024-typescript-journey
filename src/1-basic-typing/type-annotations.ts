const myString: string = "Typescript";
const myBoolean: boolean = true;
const myAnyClass: any = class { };

const myNumber: number = Infinity;
const myBigint: bigint = 100n;

const uniqueKey: symbol = Symbol("key");

const numbers: Array<number> = [1, 2, 3];

const nothing: null = null;
const notDefined: undefined = undefined;

// optional type
function logMessage(name?: string): void { 
    console.log(`hello ${name ? name : "world"}`);
}

// literal types
const answer: 50 = 50;
const isOpen: true = true;
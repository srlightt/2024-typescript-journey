// Narrowing
function logValue(value: string | boolean | number | Date | Array<any>) {
    if (typeof value === "string") {
        value; // value: string
        return; // After this return, the string type is removed from the union types, leaving boolean | number.
    }
    if (typeof value === "boolean") {
        value; // value: boolean
        return;
    }
    if (typeof value === "number" || value instanceof Date) {
        value; // value: number | Date
        return;
    }
    value; // value: array[]
}

// narrowing with class methods
class Bird {
    fly(): void { };
}
class Cat {
    meow(): void { };
}

function animalAction(animal: Bird | Cat) {
    if (animal instanceof Bird) {
        return animal.fly() // animal: Bird
    }
    if (animal instanceof Cat) {
        return animal.meow() // animal: Cat
    }
    animal; // animal: never
}

// narrowing with interfaces
interface Dog {
    bark(): void;
}

interface Pig{
    oink(): void;
}

function animalAct(animal: Dog | Pig) {
    // instanceof does not work here
    if ("bark" in animal) {
        animal.bark(); // animal: Dog
    }
    if ("oink" in animal) {
        animal.oink(); // animal: Pig
    }
}

// narrowing by properties or methods
function foo(arg: Array<number> | Date) {
    if("filter" in arg) {
        arg.filter; // arg: number[]
    }
    if("getDate" in arg) {
        arg.getDate(); // arg: Date
    }
    arg; // number[] | Date, 
}

// removing types, undefined and null
function removing(arg: string | null | undefined) {
    if (arg === null || arg === undefined) return;
    /*
        if (arg === undefined) return;
        if (arg === null) return;
        
        just one of these is not enough
    */
    arg.match(/./gm); // arg: string
}

// handling with optional props
interface User {
    name: string;
    inventory?: Array<string>;
    attack(): void;
}

function handle(user?: User) {
    if (!user) return;

    user.name;
    user.attack();
    
    if (!user.inventory) return;

    user.inventory.join(); // user.inventory: string[]
}

// combination check
interface Cat {
    name: string;
    age: number;
    color: string;
}

interface Dog {
    name: string;
    age: number;
    breed: string;
}

interface Bird {
    name: string;
    age: number;
    canFly: boolean;
}

function animalHandle(animal: Cat | Dog | Bird) {
    if ("name" in animal && "meow" in animal) {
        animal.meow(); // animal: Cat
    }
    if ("age" in animal) {
        animal; // animal: Cat | Dog | Bird
    }
}
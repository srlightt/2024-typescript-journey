// Type guard
function printValue(input: string | Array<string>) {
    if (typeof input === "string") {
        console.log(input.toLocaleUpperCase());
        return
    }
    console.log(input.join(", ")); // input: string[]
}

printValue("hello") // Output: "HELLO"
printValue(["a", "b", "c"]) // Output: "a, b, c"

// instanceof
class Person {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
    
    public greet() {
        return `hello, ${this.name}`;
    }
}

class Animal {
    public species: string;

    constructor(species: string) {
        this.species = species;
    }
    
    public makeSound(sound: string) {
        return sound;
    }
}

function describe(entity: Person | Animal) {
    if (entity instanceof Person) {
        console.log(entity.greet()) // entity: Person
        return;
    }
    console.log(entity.makeSound("woof!")) // entity: Animal
}

describe(new Person("john")); // Output: "hello, john"
describe(new Animal("dog")); // Output: "woof!"

// in guard
interface Bird {
    fly(): void;
}

interface Dog {
    bark(): void;
}

function action(animal: Bird | Dog) {
    if ("fly" in animal) {
        return animal.fly(); // animal: Bird
    }
    animal.bark(); // animal: Dog
}

function xpto(arg: Date | Array<string>) {
    if ("find" in arg) {
        return Array.isArray(arg) // true
    }
    return arg.getDay() // arg: Date
}

// type guard function
interface Car {
    brand: string;
    turnOn(): void;
}

interface Book {
    title: string;
    read(): void;
}

interface Computer {
    distro: "string";
    boot(): void;
}

type Items = Car | Book | Computer;

function isCar(item: Items): item is Car {
    return (item as Car).turnOn !== undefined; // To improve type guard, you can check the type of turnOn === "function", for example
}
function isBook(item: Items): item is Book {
    return (item as Book).read !== undefined;
}
function isComputer(item: Items): item is Computer {
    return (item as Computer).boot !== undefined;
}

function execute(item: Items) {
    if (isCar(item)) {
        item.turnOn(); // item: Car
    }
    if (isBook(item)) {
        item.read(); // item: Book
    }
    if (isComputer(item)) {
        item.boot(); // item: Computer
    }

    /* switch case */
    switch (true) {
        case isCar(item):
            item.turnOn(); // item: Car
            break;
        case isBook(item):
            item.read(); // item: Book
            break;
        case isComputer(item):
            item.boot(); // item: Computer
            break;
    }
}

// type guard in instances with instanceof keyword
class Devices {
    isLaptop(): this is Laptop {
        return this instanceof Laptop;
    } 
    isSmartphone(): this is Smartphone {
        return this instanceof Smartphone;
    } 
    isTablet(): this is Tablet {
        return this instanceof Tablet;
    } 
}

class Laptop extends Devices {
    public boot(): void { };
}

class Smartphone extends Devices {
    public call(): void { };
}

class Tablet extends Devices {
    public takePicture(): void { };
}

function useDevice(device: Devices) {
    if (device.isLaptop()) {
        device.boot() // device: Laptop
    }
    if (device.isSmartphone()) {
        device.call() // device: Smartphone
    }
    if (device.isTablet()) {
        device.takePicture() // device: Tablet
    }
    
    /* switch case */
    switch (true) {
        case device.isLaptop():
            device.boot() // device: Laptop
            break;
        case device.isSmartphone():
            device.call() // device: Smartphone
            break;
        case device.isTablet():
            device.takePicture()// device: Tablet
            break;
    }
}
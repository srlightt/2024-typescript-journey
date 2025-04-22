// Function overload
/**
    * You can document this overload function here;
    * Date type
*/
function createDate(arg: Date): Date;
/**
    * You can document this overload function here;
    * number type
*/
function createDate(arg: number): Date;
/**
    * You can document this overload function here;
    * string type
*/
function createDate(arg: string): Date;
function createDate(arg: Date | number | string): Date {
    return new Date(arg);
}

createDate(new Date());
createDate(1745131078);
createDate("2025-04-20");

// With multiple returns
interface Person {
    name: string;
    age: number
}

interface Employee {
    department: string;
    salary: number;
}

interface Admin {
    email: string;
    permissions: Array<string>;
}

function createUser(type: "person"): Person;
function createUser(type: "employee"): Employee;
function createUser(type: "admin"): Admin;
function createUser(type: "person" | "employee" | "admin"): Person | Employee | Admin {
    switch (type) {
        case "person":
            const person: Person = {
                name: "random", age: 1
            }
            return person;
        case "employee":
            const employee: Employee = {
                department: "random", salary: 3000
            }
            return employee;
        case "admin":
            const admin: Admin = {
                email: "unknown@email.com", permissions: ["kick", "ban"]
            }
            return admin;
    }
}

createUser("person"); // type: Person
createUser("employee"); // type: Employee
createUser("admin"); // type: Admin

// according to the type of parameter
interface BaseFile {
    id: string;
    name: string;
    path: string;
}

interface TextFile extends BaseFile {
    type: "text";
    content: string;
}

interface ImageFile extends BaseFile {
    type: "image";
    size: { width: number; height: number };
}

type FileType = TextFile | ImageFile;

function createFile( name: string, path: string, content: string): TextFile;
function createFile( name: string, path: string, size: { width: number; height: number }): ImageFile;
function createFile( name: string, path: string, data: string | { width: number; height: number }): FileType {
    const baseFile: BaseFile = { id: crypto.randomUUID(), name, path };

    if (typeof data === "string") {
        return { ...baseFile, type: "text", content: data };
    }

    if (data.width <= 0 || data.height <= 0) {
        throw new Error("Image dimensions must be positive numbers");
    }

    return { ...baseFile, type: "image", size: data };
}

createFile("myText", "/home/junior/", "hello world"); // TextFile
createFile("image", "/home/junior/images/", { width: 1920, height: 1080 }); // ImageFile

// according to the number of parameters
interface Triangle {
    sideA: number;
    sideB: number;
    sideC: number;
}

interface Equilateral extends Triangle { type: "equilateral"; }
interface Isosceles extends Triangle  { type: "isosceles"; }
interface Scalene extends Triangle  { type: "scalene"; }

type Triangles = Equilateral | Isosceles | Scalene;

function createTriangle(sides: number): Equilateral;
function createTriangle(sideA: number, sideBC: number): Isosceles;
function createTriangle(sideA: number, sideB: number, sideC: number): Scalene;
function createTriangle (A: number, B?: number, C?: number): Triangles {
    if (B && C){
        return {
            type: "scalene",
            sideA: A, sideB: B, sideC: C
        }
    }
    if (B && !C) {
        return {
            type: "isosceles",
            sideA: A, sideB: B, sideC: B,
        }
    }
    return {
        type: "equilateral",
        sideA: A, sideB: A, sideC: A
    }
}

createTriangle(10) // Equilateral
createTriangle(10, 15) // Isosceles
createTriangle(10, 15, 20) // Scalene

// overloading constructors
class Player {
    public name: string;
    public life: number;
    public inventory: Array<string>;
    
    constructor(name: string);
    constructor(name: string, life: number);
    constructor(name: string, life: number, inventory: Array<string>);
    constructor(name: string, life: number = 20, inventory: Array<string> = []) {
        this.name = name;
        this.life = life;
        this.inventory = inventory;
    }
}

const bob: Player = new Player("bob"); // Player { name: 'bob', life: 20, inventory: [] }
const sophie: Player = new Player("sophie", 10); // Player { name: 'sophie', life: 10, inventory: [] }
const luigi: Player = new Player("luigi", 30, ["mushroom", "star"]); // Player { name: 'luigi', life: 30, inventory: [ 'mushroom', 'star' ] }

/* to overload class methods it's the same logic as the functions in the example above */
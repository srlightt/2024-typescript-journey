// Exclude
type PrimitiveTypes = string | number | boolean;

type MyString = Exclude<PrimitiveTypes, number | boolean>; // type MyString: string

/* exclude with unions */
enum Colors {
    RED = "#FF0000",
    GREEN = "#008000",
    BLUE = "#0000FF",
    YELLOW = "#fff000",
    BROWN = "#6d2100"
}

type PrimaryColors = Exclude<Colors, Colors.BROWN | Colors.GREEN>; // type PrimaryColors = Colors.RED | Colors.BLUE | Colors.YELLOW
type RGB = Exclude<Colors, Colors.BROWN | Colors.YELLOW>; // type RGB = Colors.RED | Colors.GREEN | Colors.BLUE

/* exclude conditional with generics */
interface ColoredLog<T> {
    type: T;
    content: string;
    color: T extends "primary" ? PrimaryColors : RGB
}

function coloredLog<T extends "primary" | "rgb">(options: ColoredLog<T>) { };

coloredLog({
    type: "rgb",
    content: "hello world",
    color: Colors.RED
});
coloredLog({
    type: "primary",
    content: "hello world",
    color: Colors.YELLOW
});

// Extract
type Primitive = string | number | boolean | Array<any>;

type MyType = Extract<Primitive, string | number>; // type MyType: string | number
/* by property */
type MyLengthTypes = Extract<Primitive, { length: number }> // type MyLengthTypes: string | any[]

interface Admin {
    id: string;
    name: string;
    permissions: Array<string>;
    salary: number;
}
interface Member {
    id: string;
    name: string;
}
interface Employee {
    id: string;
    name: string;
    permissions: Array<string>;
    salary: number;
}

type Types = Admin | Member | Employee;
type ReceivesSalary = Extract<Types, { salary: number }>; // type ReceivesSalary = Admin | Employee
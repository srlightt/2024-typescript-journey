/// conditional type
type Conditional<T> = T extends string ? "is a string" : "is not a string";

function conditional<T>(arg: T): Conditional<T> {
    const text = typeof arg === "string"
        ? "is a string"
        : "is not a string"
    return text as Conditional<T>;
}

conditional("foo") // is a string;
conditional([1, 2]) // is not a string;

// type definition by condition
class Button { };
class Input { };
class Dropdown { };
class CheckBox { };

type ElementType = "button" | "input" | "dropdown" | "checkbox";

type GetElement<T> =
    T extends "button" ? Button :
    T extends "input" ? Input :
    T extends "dropdown" ? Dropdown :
    T extends "checkbox" ? CheckBox :
    never;

interface Data0<T extends ElementType> {
    execute(element: GetElement<T>): void;
}

const dataObj: Data0<"dropdown"> = {
    execute(element) {
        element; // element: Dropdown
    },
}

// generics with type conditional
interface Data1<T extends ElementType> {
    type: T;
    execute(element: GetElement<T>): void;
}

function createData<T extends ElementType>(dataObj: Data1<T>) { };

createData({
    type: "checkbox",
    execute(element) {
        element; // element: CheckBox
    },
})

// conditional type with another type
type IsString<T> = T extends string ? true : false;
type IsNumber<T> = T extends number ? true : false;

interface StringOptions {
    lowerCase(): void;
    upperCase(): void;
}

interface NumberOptions {
    sum(): void;
    sub(): void;
}

type GetTypeOption<T> = 
    IsString<T> extends true ? StringOptions :
    IsNumber<T> extends true ? NumberOptions :
    never;

function manipulate<T>(arg: T): GetTypeOption<T> {
    return Object.create({}) // to avoid type error
 };

manipulate(1); // NumberOptions
manipulate("foo"); // StringOptions
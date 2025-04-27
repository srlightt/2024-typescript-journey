// never type
function throwError(errorMessage: string): never {
    throw new Error(errorMessage);
}

// never in type checking
function checking(arg: number | Date) {
    if (typeof arg === "number") {
        return;
    }
    if (arg instanceof Date) {
        return;
    }
    arg; // arg: never
}

// get never by conditional type
type CheckString<T> = T extends string ? T : never;

const myString: CheckString<"my text"> = "my text"; // myString: "my text"
let myNever: CheckString<123>; // myNever: never

/*
    * More advanced uses of the never keyword, such as removing types, are found throughout the files.
*/
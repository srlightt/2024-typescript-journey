// Record
type Preferences = Record<string, string>;

const mySettings: Preferences = {
    name: "TypeScriptStudy2024",
    type: "module",
    // @ts-expect-error
    scripts: { } // Type '{}' is not assignable to type 'string'
}

// record with number as key
type Colors = Record<string, string>;

const myColors: Colors = {
    // or "0.55": "red"
    0.55: "red",
    1: "cyan",
    10.77: "violet"
}

// using interfaces
interface Package {
    name: string,
    version: number,
    type: string,
    children?: Package
}

type PackageJson = Record<string, Package>;

const myPackageJson: PackageJson =  {
    root: {
        name: "TypeScriptStudy2024",
        type: "module",
        version: 1,
        children: {
            name: "...",
            type: "...",
            version: 0,
        }
    }
}

// using Unions
type Dictionary = Record<string, string | boolean | number>;

const dict: Dictionary ={
    name: "Junior",
    salary: 3000,
    employed: true,
    // @ts-expect-error
    entryDate: new Date() // Type 'Date' is not assignable to type 'string | number | boolean'.
}
    
// string literals as key
type Input =  "transpile" | "compile" | "runtime";

type Inputs = Record<Input, boolean>;

const config: Inputs = {
    transpile: true,
    compile: true,
    runtime: false
}
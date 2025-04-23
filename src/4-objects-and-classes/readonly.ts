// readonly
interface Player {
    readonly id: string;
    name: string;
    level: number
}

const player0: Player = {
    id: "00000001",
    name: "bob",
    level: 0
}

player0.level = 10; // works
// @ts-expect-error
player0.id = "12345" // Cannot assign to 'id' because it is a read-only property

// readonly in classes properties
class Element {
    public readonly name: string;
    public type: "request" | "response";

    constructor(name: string, type: "request" | "response") {
        this.name = name;
        this.type = type;
    }
}

const request: Element = new Element("post", "request");
// @ts-expect-error
request.name = "get" // Cannot assign to 'name' because it is a read-only property

// Readonly utility type
interface Data {
    size: number;
    extension: string;
    directories: Array<string>;
}

type StaticData = Readonly<Data>;

function createData(data: StaticData) {
    /*
        // Cannot assign 
        * data.size = 1028;
        * data.extension = "json";
        * data.directories = ["/home/john"];
    */
}

// Object.freeze() with readonly
interface Admin {
    name: string;
    createdAt: Date;
    permissions: Array<string>;
}

function freeze<T extends object>(arg: T): Readonly<T> {
    return Object.freeze(arg);
}

const admin: Admin = {
    name: "light",
    createdAt: new Date(),
    permissions: ["manage_roles"]
}

const freezeAdmin = freeze(admin); // return Readonly<Admin>
// @ts-expect-error
freezeAdmin.name = "black" // Cannot assign to 'name' because it is a read-only property

// readonly in json

type StaticPackageJson = Readonly<typeof import("../../package.json")>;

function main(staticJson: StaticPackageJson) {
    // @ts-expect-error
    staticJson.type = "commonjs"; // Cannot assign to 'type' because it is a read-only property
    // any errors here, Readonly<T> only applies to the top-level properties
    staticJson.devDependencies.tsx = "0.0.0"
}
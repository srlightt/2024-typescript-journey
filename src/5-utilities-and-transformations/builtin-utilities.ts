// Pick
interface User {
    id: string;
    name: string;
    email: string;
}

type UserInfo = Pick<User, "id" | "name">;

const user: UserInfo = {
    id: "01992321",
    name: "john"
}

/* pick with unions */
type DateMethods = "getSeconds" | "getMinutes" | "getHours";
type MyDate = Pick<Date, DateMethods>;

const dateObj: MyDate = {
    getHours() { return 0 },
    getMinutes() { return 0 },
    getSeconds() { return 0 },
}

/* creating type with generic and Pick */
interface Player {
    id: string;
    name: string;
    life: number;
    inventory: Array<string>;
}

const bob: Player = {
    name: "Bob",
    id: "010101",
    inventory: [ ],
    life: 100
}

function create<T, U extends keyof T>(obj: T, keys: Array<U>): Pick<T, U> {
    return Object.create({});
}

const newMonster = create(bob, ["id", "name", "life"]);
newMonster.id; // string
newMonster.name; // string
newMonster.life; // number

// Omit
interface Employee {
    id: string;
    name: string
    salary: number
}

type NotEmployee = Omit<Employee, "salary">;

const john: NotEmployee = {
    id: "123104112",
    name: "john"
}

/* omit with unions */
type DateMethodsOmit = "getSeconds" | "getMinutes" | "getHours";

type DateOmit = Omit<Date, DateMethodsOmit>;

function main(date: DateOmit) {
    date; // Date type without "getSeconds" "getMinutes" "getHours" methods
}

/* creating type with generic and Omit */
interface ApiResponse<T> {
    data: T;
    status: string;
    message: string;
    timestamp: Date;
}

const response: ApiResponse<"my data"> = {
    data: "my data",
    status: "success",
    message: "unknown",
    timestamp: new Date()
}

function execute<T, U extends keyof T>(obj: T, keys: Array<U>): Omit<T, U> {
    return Object.create({});
}

const newApiResponse = execute(response, ["timestamp", "status"]); //  "timestamp" and "status" are omitted

// Partial
interface Product {
    name: string;
    price: number;
    categories: Array<string>;
}

/*
    type PartialProduct = {
        name?: string | undefined;
        price?: number | undefined;
        categories?: string[] | undefined;
    }
*/
type PartialProduct = Partial<Product>;

const partialProduct: PartialProduct = {
    name: "cookie",
    price: 5
}

/* intersection */
interface Enemy {
    nickname: string;
    life: number;
    shield: number;
    inventory: Array<string>;
}

type CustomEnemy = Partial<Enemy> & Pick<Enemy, "nickname">;

const enemy: CustomEnemy = {
    nickname: "ShadowXD2015" // only nickname prop is required
}

/* Partial<T> only applies to the top-level properties */
interface Props {
    name: string;
    dependencies: {
        typescript: string;
    }
}

/*
    type PropsPartial = {
        name?: string | undefined;
        dependencies?: { typescript: string } | undefined; // note that the typescript property is not partial
    }
*/
type PropsPartial = Partial<Props>;

// Required
interface BaseUser {
    id?: string;
    createdAt?: Date;
    lastActive?: Date;
}

type RequiredUser = Required<BaseUser>;

/* now all the props are required */
const newUser0: RequiredUser = {
    id: "1231491",
    createdAt: new Date(),
    lastActive: new Date(),
}

/* assign directly */
const newUser1: Required<BaseUser> = {
    id: "194181951",
    createdAt: new Date(),
    lastActive: new Date(),
}

/* creating a custom type with required and optionals properties */
type MyFetchOptions = RequestInit & Required<Pick<RequestInit, "body" | "method">>;

function myFetch(url: string, options?: MyFetchOptions) { }

/* now we need the body and method properties */
myFetch("http://localhost:3000/users", {
    body: JSON.stringify({ message: "hello" }),
    method: "POST"
})

// NonNullable
type PerhapsString = string | null | undefined;

type MyString = NonNullable<PerhapsString>; // type MyString: string

/* extracting optional properties */
interface Member {
    id: string;
    posts?: {
        title: string;
        content: string;
        createdAt: Date;
    }
}

type Post = Member["posts"]; // can be undefined

const postRequired: NonNullable<Post> = {
    title: "Typescript lessons",
    content: "how to program typescript at 2025",
    createdAt: new Date()
}
// Typing the function parameters and return value
type PaymentMethod = "credit" | "debit" | "paypal";
type Product = {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

function processOrder(
    products: Array<Product>,
    paymentMethod: PaymentMethod,
    discountCode?: string,
): {
    orderId: string;
    total: number;
    paymentMethod: PaymentMethod
} {
    /*
        * Implementing the logic here
        * generate orderId
        * calculate total with or without discount
        * pass paymentMethod
    */
    return {
        orderId: "unknown",
        total: 0,
        paymentMethod: "credit"
    }
}

// Function type
type MainFunc = (args: Array<string>) => void;

/* or */
interface MainFuncInterface {
    (args: Array<string>): void;
}

const mainT: MainFunc = (args) => { };
const mainI: MainFuncInterface = (args) => { };

// Interfaces with functions
interface HttpRequest {
    get(url: string): Promise<any>
    post(url: string, data?: any): Promise<any>
    put(url: string, data?: any): Promise<any>
    del(url: string): Promise<any>
    patch(url: string, data?: any): Promise<any>
    handle(request: Request, response: Response): void;
}

const httpRequests: HttpRequest = {
    async get(url) {},
    async post(url, data) {},
    async put(url, data) {},
    async del(url) {},
    async patch(url, data) {},

    handle(request, response) { }
}

// Function with default and optional parameters
function greetUser(
    name: string,
    age?: number,
    role: string = "user",
    isActive: boolean = true
): string {
    let greeting = `Hello ${name}`;

    if (age) {
        greeting += `, you are ${age} years old`;
    }
    
    greeting += `. Your role is ${role}`;
    greeting += isActive ? ` (active)` : " (inactive)";

    return greeting;
}

/* use cases */
console.log(greetUser("Junior"));
console.log(greetUser("Junior", 0));
console.log();
console.log();
console.log();
console.log();
console.log(greetUser("Junior", 23, "admin"));
console.log(greetUser("Junior", 23, undefined, false));

// Parameter options with object
interface Options {
    color?: "default" | "red" | "green" | "blue";
    time?: Date;
    author?: string;
}

function customLog(text: string, options: Options) {
    const { color="default", time, author } = options;
    console.log(color, text);

    if (time) console.log(`At: ${time.toISOString()}`);
    if (author) console.log(`By: ${author}`);
}

/* use cases */
customLog("hello world", {});
customLog("hello world", { color: "green" });
customLog("hello world", { author: "John" });
customLog("hello world", { time: new Date() });
customLog("hello world", { color: "green", author: "John", time: new Date() });
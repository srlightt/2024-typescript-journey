// Type Intersections
interface Person {
    name: string;
    age: number;
}

interface Employee {
    department: string;
    jobTitle: string;
    salary: number;
}

type EmployeePerson = Person & Employee;

const junior: EmployeePerson = {
    name: "Júnior",
    age: 22,
    department: "Engineering",
    jobTitle: "Software Engineer",
    salary: 3000
}

// never case
type foo = number & string & boolean; // type foo = nevero

// basic example with builtin interface
interface MyOptions {
    log?: boolean
}

type MyRequestInit = MyOptions & RequestInit;

async function myFetch(input: string, options?: MyRequestInit) {
    if (options?.log) {
        console.log(`[${new Date().toISOString()}] Fetching ${input}`)
    }
    try {
        return await fetch(input, options);
    } catch (err) {
        if (options?.log) {
            console.log(`[${new Date().toISOString()}] Fetch failed for ${input}`);
        }
        throw err;
    }
}

myFetch("0.0.0.0", {
    method: "GET",
    log: true
});
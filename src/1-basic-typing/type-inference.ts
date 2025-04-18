let typeInference = "hello"; // let typeInference: string 

const arrayInference = [0, null, "text"]; // const arrayInference: (string | number | null)[]

const objectInference = { name: "cat" }; // const objectInference: { name: string; }

function add(a: number, b: number) { // return type inferred as number
    return a + b;
};

const names = ["Bob", "Alice"];
names.map(name => name.toUpperCase()); // name param inferred as string
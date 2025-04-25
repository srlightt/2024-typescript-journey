// infer
const names = ["bob", "john", "junior"];
const ages = [18, 39, 22];
const mix = [...names, ...ages];

type InferArrayType<T> = T extends Array<infer U> ? U : never;

type getString = InferArrayType<typeof names> // getString : string
type getNumber = InferArrayType<typeof ages> // getNumber : number
type getUnion = InferArrayType<typeof mix> // getUnion : string | number

// get the param type
type GetFirstParam<T> = T extends (param1: infer U, ...other: any) => any ? U : never;
type GetSecondParam<T> = T extends (param1: any, param2: infer U, ...other: any) => any ? U : never;
type GetParameters<T> = T extends (...params: infer U) => any ? U : never;

function get(url: string) {};
function post(url: string, body: { method: string }) {};
function myFetch(url: string, options?: RequestInit) {};

type FirstFuncParam = GetFirstParam<typeof get>; // FirstFuncParam = string
type SecondFuncParam = GetSecondParam<typeof post>; // SecondFuncParam = { method: string }
type FuncParams = GetParameters<typeof myFetch>; // FuncParams = [url: string, options?: RequestInit | undefined]

// get values in parenthesis
const namesPlaceholder = [
    "xpto",
    "(foo)bar",
    "(placeholder)",
    "lorem(ipsum)",
] as const;

type NamesValues = typeof namesPlaceholder[number];

type GetParenthesis<T> = T extends `${string}(${infer K})${string}` ? K : never;

type Result = GetParenthesis<NamesValues>; // type Result = "foo" | "placeholder" | "ipsum"
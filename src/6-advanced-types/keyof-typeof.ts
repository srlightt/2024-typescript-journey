import config from "./config.json" with { type: "json" };

// keyof
interface Player0 {
    name: string;
    level: number;
    inventory: Array<string>;
}

type PlayerKeys = keyof Player0;

function getPlayerProp(prop: PlayerKeys) { }

getPlayerProp("inventory"); // prop: "name" | "level" | "inventory"

// using generics with your keys as restriction
function getProp<T, K extends keyof T>(obj: T, key: K) {  };

const person = {
    name: "light",
    age: 22
}

const movie = {
    title: "foo",
    pages: 100
}

getProp(person, "age") // T: person K: "age" | "name"
getProp(movie, "pages") // T: movie K: "pages" | "title"

// using keyof typeof
type ColorKey = keyof typeof config.colors;

function getColor(color: ColorKey) {
    return config.colors[color];
}

getColor("blue"); // color: "red" | "green" | "blue" | "yellow"

// typeof
// using typeof as type annotation
let usernameLet = "light";
const nicknameLet: typeof usernameLet = "light" // type nicknameLet: string

const usernameConst = "light";
const nicknameConst: typeof usernameConst = "light" // type nicknameConst: "light"

// create a type through a javascript object
const player = {
    name: "light",
    level: 10
}

type Player1 = typeof player; // type Player = { name: string; level: number }

// extract the type of object properties

/*
    type Colors = {
        red: string;
        green: string;
        blue: string;
        yellow: string;
    }
*/
type Colors = typeof config.colors;
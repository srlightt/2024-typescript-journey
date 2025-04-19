// Union types
type PrimitiveTypes = number | boolean | string;

const str: PrimitiveTypes = "hello";
const int: PrimitiveTypes = 123;
const bool: PrimitiveTypes = true;

// checking the type and restricting
function check(arg: PrimitiveTypes) {
    if (typeof arg === "number") {
        // Inside this block, arg is a number
        return // after this return, arg will be boolean | string
    }
    if (typeof arg === "string") {
        // Inside this block, arg is a string
        return // after this return, arg will be boolean
    }
    // arg: boolean
}

// Common property
type Foo = string | Array<any>;

function commonProp(arg: Foo): void {
    arg.length // length property is common in string and any array
}

// Union of literal types
type RPS = "rock" | "paper" | "scissors";
type Sizes = 8 | 16 | 32 | 64 | 128 | 256;

// Discriminated Union
enum ItemType {
    Book = "BOOK",
    Movie = "MOVIE",
    Music = "MUSIC"
}

interface BookItem {
    type: ItemType.Book;
    title: string;
    pageCount: number;
}

interface MovieItem {
    type: ItemType.Movie;
    title: string;
    director: string;
}

interface MusicItem {
    type: ItemType.Music;
    title: string;
    artist: string;
}

type MediaItem = BookItem | MovieItem | MusicItem;

/* After defining the type property, the rest of the properties should be the corresponding other properties of the same interface. */
const myBook: MediaItem = {
    type: ItemType.Book, // After defining the type, title and pageCount are the only options.
    title: "Introduction to Algorithms",
    pageCount: 1292
}
const myMovie: MediaItem = {
    type: ItemType.Movie,
    title: "Pulp Fiction",
    director: "Quentin Tarantino"
}
const myMusic: MediaItem = {
    type: ItemType.Music,
    title: "Without Me",
    artist: "Eminem"
}

// Recursive union
type NestedArray = number | Array<NestedArray>;

const myNestedNumberArray: NestedArray = [1, 2, 3, [4, 5], [[6, 7]]]; // Correct
/* @ts-expect-error: Demonstrating invalid type assignment */
const stringNested: NestedArray = [[[1, 2, 3]], "foo", [4, 5]]; // Type 'string' is not assignable to type 'NestedArray'

type MyJsonType = string | number | boolean | null | Array<MyJsonType> | {
    [Key: string]: MyJsonType;
};

const myJson: MyJsonType = { // Correct
    name: "John",
    age: 35,
    isEmployee: true,
    email: "john.smith@email.com",
    phoneNumber: null,
    address: {
        street: "123 Main St",
        city: "Unknown City",
        state: "CA",
        zipCode: "12345000"
    },
    skills: ["Java", "Docker", "Postgresql"]
}

// @ts-expect-error: Demonstration with a type outside my MyJsonType
const myDateJson: MyJsonType = { // Type 'Date' is not assignable to type 'MyJsonType
    salary: 3000,
    hireDate: new Date("2025-05-01")
}

// Union with different types
type IndexOrPredicate = number | ((value: string) => boolean);

function myArrayFind(array: Array<string>, predicate: IndexOrPredicate) {
    if (typeof predicate === "number") {
        return array[predicate];
    }
    return array.find(predicate);
}

myArrayFind(["john", "smith", "xpto"], (value) => { // "john"
    return value.startsWith("j");
});

myArrayFind(["abigail", "zea", "joey"], 2); // "joey"
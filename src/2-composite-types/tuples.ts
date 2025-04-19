// Tuples
type MyTuple = [number, boolean, string];

const myTupleValues: MyTuple = [1, true, "hello world"];

type OptionalTuple = [null, string?];

const optionalTuple : OptionalTuple = [null];

// Named Tuples
type Calendar = [ month: number, day: number, year: number ];
{
    const date: Calendar = [5, 24, 2025]; // type Calendar = [month: number, day: number, year: number]
}

// Destructuring Tuples
const date: Calendar = [5, 24, 2025]; // Obs: const date = [5, 24, 2025] is number[] not tuple Calendar


function createDateFromArgs(...date: Calendar) {
    const [ month, day, year ] = date;
}

createDateFromArgs(...date);


function createDateFromTuple(date: Calendar) {  }

createDateFromTuple(date);
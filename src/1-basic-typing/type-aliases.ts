// Although the type aliases have more use cases, I will respect the basic typing folder ;)
type AnimalType = string;
type AnimalAge = number;
type AnimalBirthDate = Date;

type Animal = {
    type: AnimalType;
    age: AnimalAge;
    birthDate: AnimalBirthDate;
}

function createAnimal(type: AnimalType, age: AnimalAge, birthDate: AnimalBirthDate): Animal {
    return { type, age, birthDate };
}

createAnimal("Cat", 1, new Date("2024-04-01"));
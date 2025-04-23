// Creating classes
{
    class Player {
        public name: string;
        public life: number;

        constructor(name: string, life: number) {
            this.name = name;
            this.life = life;
        }
    }
}

// Access modifiers
{
    /*
        * public
        * private
        * protected
    */
    class Player {
        public name: string;
        private life: number;
        
        constructor(name: string) {
            this.name = name;
            this.life = 20;
        }
        
        public getLife(): number {
            return this.life;
        }
        
        public damage(dmgAmount: number) {
            if (typeof dmgAmount !== "number" || isNaN(dmgAmount)) throw new Error("Invalid damage amount");

            if (dmgAmount <= 0) return;

            const updatedLife = this.life - dmgAmount;

            if (updatedLife < 0) {
                this.life = 0
                this.die();
                return;
            }
            
            this.life = updatedLife;
        }
        
        public increaseLife(amount: number) {
            if (typeof amount !== "number" || isNaN(amount)) throw new Error("Invalid amount");

            if (amount <= 0) return;

            const updatedLife = this.life + amount;

            if (updatedLife > 20) {
                this.life = 20;
                return;
            }

            this.life = updatedLife;
        }
        
        public attack(target: Player, damageAmount: number) {
            console.log(`${this.name} attacks ${target.name} for ${damageAmount} damage!`);
            target.damage(damageAmount);
        }
        
        public heal(target: Player, healAmount: number) {
            console.log(`${this.name} heals ${target.name} for ${healAmount} health!`);
            target.increaseLife(healAmount);
        }
        
        private die() {
            console.log(`Player ${this.name} has died.`);
        }
    }
    
    const alice = new Player("Alice");
    const bob = new Player("Bob");

    alice.attack(bob, 10); // Alice attacks Bob for 5 damage!
    console.log(bob.getLife()); // 10
    alice.heal(bob, 5); // Alice heals Bob for 5 health!
    console.log(bob.getLife()); // 15

    bob.attack(alice, 5); // Bob attacks Alice for 3 damage!
    console.log(alice.getLife()); // 15
    bob.heal(alice, 3); // Bob heals Alice for 3 health!
    console.log(alice.getLife()); // 18
}

// Static example
{
    class Player {
        private static _players: Array<Player> = [];
        public name: string;
        private life: number;

        constructor(name: string) {
            this.name = name;
            this.life = 20;
            Player._players.push(this);
        }
        
        public static getPlayers() {
            return [...Player._players]; // Return a shallow copy
        }
    }
    
    const alice = new Player("Alice");
    const bob = new Player("Bob");
    
    console.log(Player.getPlayers());
    /*
        [
          Player { name: 'Alice', life: 20 },
          Player { name: 'Bob', life: 20 }
        ]
    */
}

// Extending classes and overriding
{
    class Animal {
        public name: string;
        
        constructor(name: string) {
            this.name = name;
        }
        
        public makeSound(): void {
            console.log(`${this.name} is making a sound.`);
        }
    }
    
    class Dog extends Animal {
        public breed: string;

        constructor(name: string, breed: string) {
            super(name);
            this.breed = breed;
        }
        
        // Override
        public makeSound(): void {
            console.log("woof!");
        }
    }
    
    const animal = new Animal("Generic Animal");
    const dog = new Dog("Fred", "Husky");

    animal.makeSound(); // Output: Generic Animal is making a sound.
    dog.makeSound(); // Output: woof!
}

// Class implements interface
{
    interface Connectable {
        name: string;
        connect(): void;
        disconnect(): void;
    }
    
    class Computer implements Connectable {
        public name: string;

        constructor(name: string = "PC") {
            this.name = name;
        }
        
        connect(): void { };

        disconnect(): void { };
        
        // outside the interface
        reboot(): void { };
    }
}

// Abstract class (just blueprint to another class, is not possible to instantiate)
{
    abstract class MediaItem {
        public title: string;

        constructor(title: string) {
            this.title = title
        }

        abstract play(): void;
    }
    
    class Song extends MediaItem {
        public author: string;

        constructor(title: string, author: string) {
            super(title)
            this.author = author;
        }

        play(): void {
            console.log(`Playing song: ${this.title} by ${this.author}`);
        }
    }
}

// Protected modifier
{
    class Person {
        protected name: string; // Accessible only in this class and subclasses

        constructor(name: string) {
            this.name = name;
        }

        protected getName(): string {
            return this.name;
        }
    }
    
    class Employee extends Person {
        private department: string;
        private skills: Array<string>;

        constructor(name: string, department: string, skills: Array<string>) {
            super(name);
            this.department = department;
            this.skills = skills;
        }
        
        public greet(): void {
            console.log(`Hello, my name is ${this.getName()}`); // Accessing a protected method of Person
            console.log(`Department: ${this.department}`);
            console.log(`My skills: ${this.skills}`);
        }
    }
}
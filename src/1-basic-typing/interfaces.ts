interface User {
    name: string;
    createdAt: Date;
    wallet?: UserWallet
}

interface UserWallet {
    coins: number;
}

// interface merging
interface User {
    pay(): void;
}

function createUser(name: string): User {
    return { name, createdAt: new Date(),
        pay() {
            // logic of function
        }
     };
}

// return intersection
function updateUserWallet(user: User, userUpdate: UserWallet): User & { wallet: UserWallet } {
    return { ...user, wallet: { ...(user.wallet), ...userUpdate }};
}

// extending interface
interface Admin extends User {
    deleteAccount(user: User): void;
    kick(user: User): void;
    ban(user: User): void;
}

function promoteUser(user: User): Admin {
    return { ...user,
        deleteAccount(user: User) {
            // logic here
        },
        kick(user: User) {
            // logic here
        },
        ban(user: User) {
            // logic here
        },
     };
}

const myAccount: User = createUser("Junior"); // optional demonstrate, myAccount.wallet?.coins
const updatedUser = updateUserWallet(myAccount, {coins: 100});
const myAdminAccount: Admin = promoteUser(updatedUser);
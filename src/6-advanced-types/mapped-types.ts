// Mapped type
type MyType = {
    [Key in string]: string; // It means that the type can have any number of properties with string keys, and all property values must be strings.
}

const obj: MyType = {
    a: "",
    b: "",
    c: ""
}

// throughout interfaces
interface User {
    id: string;
    name: string;
    permissions: Array<string>;
    manageUser(): void;
    reply?(): void;
    useCommands?(): void;
}

type MyReadonly<T> = {
    readonly [Key in keyof T]: T[Key]; // set all properties as read only
}
type MyRequired<T> = {
    [Key in keyof T]-?: T[Key]; // set all properties as required
}
type MyPartial<T> = {
    [Key in keyof T]?: T[Key]; // set all properties as optional
}

// change the property type
type ToBoolean<T> = {
    [Key in keyof T]: boolean; // set all properties to boolean
}

// change the property name
type UnderscoreProps<T> = {
    [Key in keyof T as Key extends string ? `_${Key}` : Key]: T[Key];
}

/*
    type UnderscoreUser = {
        _id: string;
        _name: string;
        _permissions: string[];
        _reply?: (() => void) | undefined;
        _useCommands?: (() => void) | undefined;
    }
*/
type UnderscoreUser = UnderscoreProps<User>;

// remove methods and props
type NoProps<T> = {
    [Key in keyof T as T[Key] extends Function ? Key : never]: T[Key];
}
type NoMethods<T> = {
    [Key in keyof T as T[Key] extends Function ? never : Key]: T[Key];
}

/*
    type NoPropsUser = {
        manageUser: () => void;
        reply: () => void;
        useCommands: () => void;
    }
*/
type NoPropsUser = NoProps<MyRequired<User>>;
/*
    type NoMethodsUser = {
        id: string;
        name: string;
        permissions: Array<string>;
    }
*/
type NoMethodsUser = NoMethods<MyRequired<User>>;

// creating with generics
type MappedType<T, U> = {
    [Key in keyof T as T[Key] extends U ? never : Key]: T[Key];
}

/*
    type NewUser = {
        manageUser: () => void;
        reply?: (() => void) | undefined;
        useCommands?: (() => void) | undefined;
    }
*/
type NewUser = MappedType<User, string | Array<any>> // remove strings or arrays
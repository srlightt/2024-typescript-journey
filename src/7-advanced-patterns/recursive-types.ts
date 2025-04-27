// recursive type
type MyJSON = string | number | boolean | Array<MyJSON> | {
    [Key: string]: MyJSON
}

const json: MyJSON = {
    colorTheme: "Nord Light",
    iconTheme: "material-icon-theme",
    extensions: {
        "vscode-neovim": true,
    },
    keybinds: [
        "a",
        "c",
        "d",
        "h",
        "u"
    ]
}

// conditional and recursively
type PackageJson = typeof import("../../package.json");

type MyPartial<T> = {
    [Key in keyof T]?: T[Key] extends object ? MyPartial<T[Key]> : T[Key];
};
type MyRequired<T> = {
    [Key in keyof T]-?: T[Key] extends object ? MyRequired<T[Key]> : T[Key];
};
type MyReadonly<T> = {
    readonly [Key in keyof T]: T[Key] extends object ? MyReadonly<T[Key]> : T[Key];
};

const myJson: MyPartial<PackageJson> = {
    // all of the properties and the nested properties have been made optional
    devDependencies: { }
}

// splitting strings
const names = "--Junior--Ana-John-Maria-Bob-Clara--";

type Split<T, S extends string> =
    T extends ""
        ? never
        : T extends `${S}${infer Rest}`
            ? Split<Rest, S>
            : T extends `${infer Before}${S}${infer After}`
                ? Before | Split<After, S>
                : T

type Names = Split<typeof names, "-">; // type Names = "Junior" | "Ana" | "John" | "Maria" | "Bob" | "Clara"

// get parameters of request url
type GetParams<T> =
    T extends `${string}:${infer Param}/${infer After}`
        ? Param | GetParams<After>
        : T extends `${string}:${infer Param}`
            ? Param
            : never

type Params = GetParams<"/users/:userId/post/:postId/">; // type Params = "userId" | "postId"
// as const
const props = ["resize", "push", "delete", "pull"] as const; // const props: readonly ["resize", "push", "delete", "pull"]

// @ts-expect-error
props.push("instance") // Property 'push' does not exist on type 'readonly ["resize", "push", "delete", "pull"]'

const config = {
    type: "module",
    version: 1
} as const;

// @ts-expect-error
config.type = "commonjs"; // Cannot assign to 'type' because it is a read-only property

// create a new type by Union
const colors = ["red", "green", "blue"] as const;

type Colors = typeof colors[number]; // type Colors = "red" | "green" | "blue"

// object to enum
const Action = {
    create: 0,
    read: 1,
    update: 2,
    delete: 3,
} as const;

type ActionEnum = typeof Action;
type Actions = keyof ActionEnum;

function main(arg: Actions | ActionEnum[Actions]) { };

main(Action.create);
main("create");
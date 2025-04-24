// as and satisfies keywords
type HeaderData = {
    text: string, iconURL: string
}

type Header = string | HeaderData;

const headerA: Header = "users";
const headerB = {} as HeaderData; // asserts headerB as HeaderData, but only in type
const headerC = "administrators" satisfies Header;

headerB.iconURL.toLocaleLowerCase(); // throw's a runtime error

const headerD = {
    text: "foo header",
    iconURL: "http://0.0.0.0:3000/image.png",
    height: "300px" // does not give an error, but is wrong at runtime
} as Header;

const headerE = {
    text: "home",
    iconURL: "http://0.0.0.0:3000/home.png",
    // @ts-expect-error
    height: "100px" // Object literal may only specify known properties, and 'height' does not exist in type 'HeaderData'
} satisfies Header;

// annotation x satisfies
type FileProperties = { filePath: string, owner?: string };

type Files = Record<string, FileProperties>;

const files0: Files = {
    "landingPage": {
        filePath: "/home/junior/landing_page.html",
        owner: "junior"
    }
}
const files1 = {
    "landingPage": {
        filePath: "/home/junior/landing_page.html",
        owner: "junior"
    }
} satisfies Files;

files0.landingPage.owner?.toUpperCase(); // with annotation, the .landingPage do not have autocomplete, and .owner is optional, even exist in files0
files1.landingPage.owner.toUpperCase(); // with satisfies, has all of the autocomplete .landingPage and .owner without the optional
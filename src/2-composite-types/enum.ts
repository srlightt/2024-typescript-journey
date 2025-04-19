// Basic Numeric Enum
enum Direction {
    Up,      // 0
    Down,    // 1
    Right,   // 2
    Left     // 3
}

const moveRight = Direction.Right; // 2

// Numeric Enum
enum HttpStatus {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404
}

// String Enum
enum MediaType {
    JSON = "application/json",
    XML = "application/xml"
}

// Const Enum
const enum UserRole {
    Guest = 1,
    Member,     // 2
    Moderator,  // 3
    Admin       // 4
}

/*
    * const enum don't produce extra code into Javascript code
    * check the const enum example looks like after compilation:
    * var member = 2; // UserRole.Member
*/
const member = UserRole.Member;

// Interface example
interface HttpResponse {
    mediaType: MediaType;
    httpStatus: HttpStatus;
}

const response: HttpResponse = {
    mediaType: MediaType.JSON,
    httpStatus: HttpStatus.OK
}
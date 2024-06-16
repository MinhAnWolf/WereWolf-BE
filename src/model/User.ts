import { Role } from "./Role";

export interface User {
    userId: string,
    username: string,
    role: Role,
    status: boolean // trạng thái live - died
}
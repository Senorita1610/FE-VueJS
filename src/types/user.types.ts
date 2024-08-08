import { Account } from "./account.types";

export interface CustomerBody {
    address: string,
    birthday: string,
    gender: number,
    name: string,
    phoneNumber: string,
    usagePeriod: number,
    account: Account | null,
}

export interface Customer {
    customerId: number,
    address: string,
    birthday: string,
    gender: number,
    name: string,
    phoneNumber: string,
    usagePeriod: number,
    account: Account | null,
}

export interface EmployeeBody {
    address: string,
    birthday: string,
    gender: number,
    joinDate: string,
    name: string,
    phoneNumber: string,
    account: Account | null,
}

export interface Employee {
    employeeId: number,
    address: string,
    birthday: string,
    gender: number,
    joinDate: string,
    name: string,
    phoneNumber: string,
    account: Account | null,
}


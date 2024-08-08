export interface AccountTypeBody {
    name: string,
    position: string,
    role: string,
}

export interface AccountType {
    accountTypeId: number,
    name: string,
    position: string,
    role: string,
}

export interface AccountBody {
    fullName: string,
    username: string,
    password: string,
    accountType: AccountType | null
}

export interface Account {
    accountId: number,
    fullName: string,
    username: string,
    accountType: AccountType | null
}

export interface LoginBody {
    username: string,
    password: string
}
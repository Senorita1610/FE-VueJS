import { AccountTypeBody, AccountType, Account, AccountBody, LoginBody } from "@/types/account.types";
import { $axios } from "@plugins/axios/axios";

function getAllAccountTypes() {
    const token = localStorage.getItem("token");
    return $axios.get('/account-type/all', {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

function createAccountType(accountTypeCreate: AccountTypeBody) {
    const token = localStorage.getItem("token");
    return $axios.post('/account-type/create', accountTypeCreate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function updateAccountType(accountTypeUpdate: AccountType) {
    const token = localStorage.getItem("token");
    return $axios.put('/account-type/update', accountTypeUpdate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function deleteAccountType(accountTypeId: number) {
    const token = localStorage.getItem("token");
    return $axios.delete(`/account-type/${accountTypeId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getAccountTypeById(accountTypeId: number) {
    const token = localStorage.getItem("token");
    return $axios.get(`/account-type/${accountTypeId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getAllAccounts() {
    return $axios.get('/account/all');
}

function createAccount(accountCreate: AccountBody) {
    const token = localStorage.getItem("token");
    return $axios.post('/account/create', accountCreate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function updateAccount(accountUpdate: Account) {
    const token = localStorage.getItem("token");
    return $axios.put('/account/update', accountUpdate, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function deleteAccount(accountId: number) {
    const token = localStorage.getItem("token");
    return $axios.delete(`/account/${accountId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function getAccountById(accountId: number) {
    const token = localStorage.getItem("token");
    return $axios.get(`/account/${accountId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
};

function login(userInfo: LoginBody) {
    return $axios.post('/account/login', userInfo);
};

function authenticate() {
    const token = localStorage.getItem("token");
    return $axios.post("http://localhost:8081/account/authenticate", undefined, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export default {
    getAllAccountTypes,
    createAccountType,
    updateAccountType,
    deleteAccountType,
    getAccountTypeById,
    getAllAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    getAccountById,
    login,
    authenticate
};
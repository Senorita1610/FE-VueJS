import { defineStore } from "pinia";
import { ref } from 'vue';
import type { AccountTypeBody, AccountType, AccountBody, Account, LoginBody } from "@/types/account.types";
import accountService from "@/api/account/account";

export const useAccountStore = defineStore("account", () => {
    const accountType = ref<AccountType | null>(null);
    const accountTypes = ref<AccountType[]>([]);
    const account = ref<Account | null>(null);
    const accounts = ref<Account[]>([]);
    const user = ref<Account | null>(null);
    const isAuthenticated = ref(false);
    const message = ref('');

    const createAccountTypeDialog = ref(false);
    const updateAccountTypeDialog = ref(false);
    const accountTypeDialog = ref(false);
    const createAccountDialog = ref(false);
    const updateAccountDialog = ref(false);
    const accountDialog = ref(false);
    const requestLogin = ref(false);
    const submitted = ref(false);

    const getAllAccountTypes = async () => {
        try {
            const response = await accountService.getAllAccountTypes();
            if (response.data) {
                accountTypes.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createAccountType = async (accountType: AccountTypeBody) => {
        try {
            const response = await accountService.createAccountType(accountType);
            if (response.data.success) {
                accountTypes.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const updateAccountType = async (accountType: AccountType) => {
        try {
            const response = await accountService.updateAccountType(accountType);
            console.log(response);
            if (response.data.success) {
                const index = accountTypes.value.findIndex((c) => c.accountTypeId === accountType.accountTypeId);
                accountTypes.value[index] = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const deleteAccountType = async (id: number) => {
        try {
            const response = await accountService.deleteAccountType(id);
            if (response.data.success) {
                accountTypes.value = accountTypes.value.filter((c) => c.accountTypeId !== id);
            }
            message.value = response.data.data.msgContent;

        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getAccountTypeById = async (id: number) => {
        try {
            const response = await accountService.getAccountTypeById(id);
            if (response.data.success) {
                accountType.value = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getAllAccounts = async () => {
        try {
            const response = await accountService.getAllAccounts();
            console.log(response);
            if (response.data) {
                accounts.value = response.data;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const createAccount = async (account: AccountBody) => {
        try {
            const response = await accountService.createAccount(account);
            if (response.data.success) {
                accounts.value.push(response.data.data.payload);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const updateAccount = async (account: Account) => {
        try {
            const response = await accountService.updateAccount(account);
            if (response.data.success) {
                const index = accounts.value.findIndex((c) => c.accountId === account.accountId);
                accounts.value[index] = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const deleteAccount = async (id: number) => {
        try {
            const response = await accountService.deleteAccount(id);
            if (response.data.success) {
                accounts.value = accounts.value.filter((c) => c.accountId !== id);
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const getAccountById = async (id: number) => {
        try {
            const response = await accountService.getAccountById(id);
            if (response.data.success) {
                account.value = response.data.data.payload;
            }
            message.value = response.data.data.msgContent;
        } catch (error) {
            return Promise.reject(error);
        }
    };

    const login = async (userInfo: LoginBody) => {
        try {
            const response = await accountService.login(userInfo);
            if (response.data) {
                localStorage.setItem("token", response.data.token);
                isAuthenticated.value = true;
                user.value = response.data.user;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    const authenticate = async () => {
        try {
            const response = await accountService.authenticate();
            if (response.status == 200) {
                isAuthenticated.value = true;
                user.value = response.data.user;
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    return {
        accountType,
        accountTypes,
        createAccountTypeDialog,
        updateAccountTypeDialog,
        submitted,
        getAllAccountTypes,
        createAccountType,
        updateAccountType,
        deleteAccountType,
        getAccountTypeById,
        account,
        accounts,
        createAccountDialog,
        updateAccountDialog,
        getAllAccounts,
        createAccount,
        updateAccount,
        deleteAccount,
        getAccountById,
        requestLogin,
        login,
        user,
        isAuthenticated,
        message,
        authenticate,
        accountDialog,
        accountTypeDialog
    };
});


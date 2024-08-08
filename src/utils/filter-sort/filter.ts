export interface ISelectBox {
    displayName: string,
    value: string,
    type: string
}

interface IFilterBox {
    displayName: string,
    value: string,
    type: string
}

const fBrands: ISelectBox[] = [
    {
        displayName: "Apple",
        value: "apple",
        type: "brand"
    },
    {
        displayName: "Samsung",
        value: "samsung",
        type: "brand"
    },
    {
        displayName: "Xiaomi",
        value: "xiaomi",
        type: "brand"
    },
    {
        displayName: "Oppo",
        value: "oppo",
        type: "brand"
    },
    {
        displayName: "Realme",
        value: "realme",
        type: "brand"
    },
    {
        displayName: "Vertu",
        value: "vertu",
        type: "brand"
    },

]
const fOptions: ISelectBox[] = [
    {
        displayName: "64GB",
        value: "64g",
        type: "option"
    },
    {
        displayName: "128GB",
        value: "128g",
        type: "option"
    },
    {
        displayName: "256GB",
        value: "256g",
        type: "option"
    },
    {
        displayName: "512GB",
        value: "512g",
        type: "option"
    }

]

const fPrices: ISelectBox[] = [
    {
        displayName: "dưới 1 triệu",
        value: '1000000',
        type: 'price'
    },
    {
        displayName: "dưới 5 triệu",
        value: '5000000',
        type: 'price'
    },
    {
        displayName: "dưới 10 triệu",
        value: '10000000',
        type: 'price'
    },
    {
        displayName: "trên 10 triệu",
        value: '10000001',
        type: 'price'
    }
]


export { fBrands, fOptions, fPrices }
export const getNameCategory = (value?: string): string => {
    let name: string = ''
    switch (value?.toLowerCase()) {
        case 'mobile':
            name = 'Điện thoại'
            break
        case 'laptop':
            name = 'Laptop'
            break
        case 'smartwatch':
            name = 'Đồng hồ'
            break
        case 'camera':
            name = 'Máy ảnh'
            break
        default:
            break
    }
    return name
}
export function formatTime(inputTime: string): string {
    const date = new Date(inputTime);
    const options: any = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    };
    let str: string
    str = new Intl.DateTimeFormat('vi-VN', options).format(date);
    return str;
}


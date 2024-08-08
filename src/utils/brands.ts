import apple_logo from '@/assets/images/brands/apple.png'
import asus_logo from '@/assets/images/brands/asus.png'
import google_logo from '@/assets/images/brands/google.png'
import huawei_logo from '@/assets/images/brands/huawei.png'
import nokia_logo from '@/assets/images/brands/nokia.png'
import oppo_logo from '@/assets/images/brands/oppo.png'
import samsung_logo from '@/assets/images/brands/samsung.png'
import honor_logo from '@/assets/images/brands/honor.png'
import xiaomi_logo from '@/assets/images/brands/xiaomi.png'
import vivo_logo from '@/assets/images/brands/vivo.png'
import sony_logo from '@/assets/images/brands/sony.png'
import lg_logo from '@/assets/images/brands/lg.png'
import realme_logo from '@/assets/images/brands/realme.png'
import lenovo_logo from '@/assets/images/brands/lenovo.png'
interface IBrand {
    name: string,
    img: string
}
export const brands:IBrand[] = [
    {
        name: 'apple',
        img: apple_logo
    },
    {
        name: 'asus',
        img: asus_logo 
    },
    {
        name: 'google',
        img: google_logo
    },
    {
        name: 'huawei',
        img: huawei_logo 
    },
    {
        name: 'nokia',
        img: nokia_logo
    },
    {
        name: 'oppo',
        img: oppo_logo 
    },
    {
        name: 'samsung',
        img: samsung_logo
    },
    {
        name: 'sony',
        img: sony_logo 
    },
    {
        name: 'vivo',
        img: vivo_logo
    },
    {
        name: 'xiaomi',
        img: xiaomi_logo 
    },
    {
        name: 'honor',
        img: honor_logo
    },
    {
        name: 'lenovo',
        img: lenovo_logo 
    },
    {
        name: 'realme',
        img: realme_logo 
    },
    {
        name: 'lg',
        img: lg_logo 
    }
]

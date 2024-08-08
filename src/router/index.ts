import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAccountStore } from '@/store/account';



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        name: 'home',
        path: '/',
        component: () => import('@/pages/home/HomeView.vue'),
        meta: {
          title: 'Digishop'
        }
      },
      {
        name: '404-page',
        path: 'error',
        component: () => import('@/pages/Error.vue'),
        meta: {
          title: '404 - Page Not Found',
        }
      },
      {
        name: 'package detail',
        path: '/:categorySlug/:packageSlug',
        component: () => import('@/pages/package/PackageDetail.vue'),
        meta: {
          title: 'Package Detail'
        }
      }
    ],
  },
  {
    path: '/dashboard',
    component: AdminLayout,
    children: [
      {
        name: 'dashboard',
        path: '',
        component: () => import('@/pages/dashboard/Dashboard.vue'),
        meta: {
          requiresAuth: true,
          title: 'Dashboard'
        }
      },
      {
        name: 'account types',
        path: '/account-type',
        component: () => import('@/pages/accountType/AccountTypeView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Account Types'
        }
      },
      {
        name: 'account',
        path: '/account',
        component: () => import('@/pages/account/AccountView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Account'
        }
      },
      {
        name: 'customer',
        path: '/customer',
        component: () => import('@/pages/customer/CustomerView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Customer'
        }
      },
      {
        name: 'employee',
        path: '/employee',
        component: () => import('@/pages/employee/EmployeeView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Employee'
        }
      },
      {
        name: 'category',
        path: '/category',
        component: () => import('@/pages/category/CategoryView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Category'
        }
      },
      {
        name: 'supplier',
        path: '/supplier',
        component: () => import('@/pages/supplier/SupplierView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Supplier'
        }
      },
      {
        name: 'package',
        path: '/package',
        component: () => import('@/pages/package/PackageView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Package'
        }
      },
      {
        name: 'promotion',
        path: '/promotion',
        component: () => import('@/pages/promotion/PromotionView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Promotion'
        }
      },
      {
        name: 'payment method',
        path: '/payment-method',
        component: () => import('@/pages/paymentMethod/PaymentMethodView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Payment Method'
        }
      },
      {
        name: 'bill',
        path: '/bill',
        component: () => import('@/pages/bill/BillView.vue'),
        meta: {
          requiresAuth: true,
          title: 'Bill'
        }
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const accountStore = useAccountStore();
  if (to.meta.requiresAuth) {
    const hasToken = localStorage.getItem('token');
    if (hasToken && accountStore.user?.accountType?.role == 'admin') {
      next();
    }
    else {
      next("/error");
    }
  } else {
    next();
  }
  document.title = `${to.meta.title}`;
})

export default router;
import Layout from '@/layout'

/**
 * @description 说明
 * roles
 * hidden
 * noCache 不需要缓存，因为路由加了 keep-alive 所以会缓存。tagsView 中的缓存
 *
 * @description 注意事项
 * 1. meta.isSubmenu: true 表示这是一个 Submenu，有子菜单，是一个可以展开的菜单
 * 2. 如果不是展开的菜单，根上，即有{ component: Layout } 这一层中不要写 meta.title， 对于菜单的描述，写到它的 children 中的 item.meta.title 中，
 *      因为在面包屑 Breadcrumb 中我们是根据 meta.title 来判断 matched 匹配的要显示的菜单层级
 *
 */

/* Router Modules */
import tableRouter from './modules/table';
import formRouter from './modules/form'
import nestedRouter from './modules/nested';
import cacheRouter from './modules/cache'

const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login')
    },
    {
        path: '/redirect',
        component: Layout,
        children: [
            {
                path: '/redirect/:path(.*)',
                name: 'Redirect',
                component: () => import('@/views/redirect'),
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
    },
]

const appRoutes = [
    {
        path: '/home',
        redirect: '/home/index',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Home',
                meta: {
                    title: 'Home',
                },
                component: () => import('@/views/home')
            }
        ]
    },
    {
        path: '/permission',
        redirect: '/permission/page',
        name: 'Permission',
        component: Layout,
        roles: ['admin', 'other'],
        meta: {
            title: 'Permission',
            icon: 'el-icon-menu',
            isSubmenu: true
        },
        children: [
            {
                path: 'page',
                name: 'PagePermission',
                meta: {
                    title: 'Page Permission',
                },
                component: () => import('@/views/permission/page'),
            },
            {
                path: 'role',
                name: 'RolePermission',
                roles: ['admin'],
                meta: {
                    title: '角色管理',
                },
                component: () => import('@/views/permission/role'),
            }
        ]
    },
    tableRouter,
    formRouter,
    nestedRouter,
    cacheRouter
]

export default {
    constantRoutes,
    appRoutes
}
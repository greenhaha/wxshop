import Home from 'pages/Home';
import Page1 from 'pages/Image';
import UserManagement from 'pages/user';
import TagManagment from 'pages/TagManagment';

export interface RouterType {
    path: string;
    name: string;
    exact: boolean;
    component: React.ComponentType;
    children?: RouterType[];
    isEnable: () => boolean;
}

export const router: RouterType[] = [
    {
        path: '/',
        name: 'home',
        exact: true,
        component: Home,
        isEnable: () => true,
    },
    {
        path: '/imageManage',
        name: 'imagePage',
        exact: true,
        component: Page1,
        isEnable: () => true,
    },
    {
        path: '/user',
        name: 'userPage',
        exact: true,
        component: UserManagement,
        isEnable: () => true,
    },
    {
        path: '/tag',
        name: 'tagPage',
        exact: true,
        component: TagManagment,
        isEnable: () => true,
    },
];

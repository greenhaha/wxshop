import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import {
    UserOutlined,
    VideoCameraOutlined,
    DashboardOutlined,
    TagOutlined,
} from '@ant-design/icons';

interface ItemType {
    danger?: boolean;
    icon?: JSX.Element;
    key: string;
    label?: JSX.Element | string;
    title?: string;
}
const MenuComp = () => {
    const [defaultUrl, setDefaultUrl] = useState(['/']);
    const location = useLocation();
    const history = useHistory();
    const menuItems: ItemType[] = [
        { key: '/', label: '仪表盘', icon: <DashboardOutlined /> },
        { key: '/tag', label: '标签管理', icon: <TagOutlined /> },
        { key: '/imageManage', label: '图片管理', icon: <VideoCameraOutlined /> },
        { key: '/user', label: '用户管理', icon: <UserOutlined /> },
    ];
    const handleMenuClick = (item: any) => {
        console.log(item);
        history.push(item.key);
    };
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={defaultUrl}
            onClick={(item) => handleMenuClick(item)}
        >
            {menuItems.map((item) => {
                return (
                    <Menu.Item key={item.key}>
                        {item.icon}
                        <span>{item.label}</span>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

export default MenuComp;

import React from 'react';
import { Form, Input, Button, Select, Table, Tag, Space, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './style.less';
const { Option } = Select;
const { confirm } = Modal;
const UserManagement = () => {
    const handleDelete = () => {
        console.log('delete');
    };
    const showDeleteConfirm = () => {
        confirm({
            title: '危险操作',
            icon: <ExclamationCircleOutlined />,
            content: '你确定要删除当前用户吗？',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const columns = [
        {
            title: '用户ID',
            dataIndex: 'userid',
            key: 'userid',
        },
        {
            title: '用户名称',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '用户角色',
            dataIndex: 'role',
            key: 'role',
            render: (text) => {
                if (text === 1) {
                    return <Tag color="blue">超级管理员</Tag>;
                }
                if (text === 2) {
                    return <Tag color="blue">管理员</Tag>;
                }
                if (text === 3) {
                    return <Tag color="blue">游客</Tag>;
                }
            },
        },
        {
            title: '用户状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                if (text === 1) {
                    return <Tag color="green">正常</Tag>;
                }
                return <Tag color="red">禁用</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>修改</a>
                    <a onClick={showDeleteConfirm}>删除</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            userid: 'John Brown',
            username: 32,
            role: 3,
            status: 1,
        },
        {
            key: '2',
            userid: 'Jim Green',
            username: 42,
            role: 2,
            status: 0,
        },
        {
            key: '3',
            userid: 'Joe Black',
            username: 32,
            role: 1,
            status: 1,
        },
    ];
    const handleChange = (value: any) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className="user_search_filterContext">
                <Form layout={'inline'} className="filterContext_form">
                    <Form.Item className="fiterContext_item" label="用户名称" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item className="fiterContext_item" label="用户ID" name="userId">
                        <Input />
                    </Form.Item>
                    <Form.Item className="fiterContext_item" label="用户角色" name="role">
                        <Select onChange={handleChange} style={{ width: '183px' }}>
                            <Option value="2">游客</Option>
                            <Option value="1">管理员</Option>
                            <Option value="999">超级管理员</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="fiterContext_item" label="用户状态" name="status">
                        <Select onChange={handleChange} style={{ width: '183px' }}>
                            <Option value="2">禁用</Option>
                            <Option value="1">正常</Option>
                        </Select>
                    </Form.Item>
                    <Button type="primary" style={{ marginRight: '16px' }}>
                        检索
                    </Button>
                    <Button>清空</Button>
                </Form>
            </div>
            <div className="user_tableContext">
                <Table bordered columns={columns} dataSource={data} />
            </div>
        </>
    );
};

export default UserManagement;

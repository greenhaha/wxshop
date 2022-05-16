import React from 'react';
import { Form, Input, Button, Select, Table, Tag, Space, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './style.less';
const { Option } = Select;
const { confirm } = Modal;
const TagManagment = () => {
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
            title: '标签ID',
            dataIndex: 'tagid',
            key: 'tagid',
        },
        {
            title: '标签名称',
            dataIndex: 'tagname',
            key: 'tagname',
        },
        {
            title: '标签状态',
            dataIndex: 'tagStatus',
            key: 'tagStatus',
            render: (text) => {
                if (text === 1) {
                    return <Tag color="green">上架</Tag>;
                }
                if (text === 2) {
                    return <Tag color="red">下架</Tag>;
                }
                if (text === 3) {
                    return <Tag color="blue">待上架</Tag>;
                }
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>修改</a>
                    <a onClick={showDeleteConfirm}>下架</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            tagid: 'John Brown',
            tagname: 32,
            tagStatus: 1,
        },
        {
            key: '2',
            tagid: 'Jim Green',
            tagname: 42,
            tagStatus: 3,
        },
        {
            key: '3',
            tagid: 'Joe Black',
            tagname: 32,
            tagStatus: 2,
        },
    ];
    const handleChange = (value: any) => {
        console.log(`selected ${value}`);
    };
    return (
        <>
            <div className="tag_search_filterContext">
                <Form layout={'inline'} className="filterContext_form">
                    <Form.Item className="fiterContext_item" label="标签ID" name="tagid">
                        <Input />
                    </Form.Item>
                    <Form.Item className="fiterContext_item" label="标签名称" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item className="fiterContext_item" label="标签状态" name="userId">
                        <Select onChange={handleChange} style={{ width: '183px' }}>
                            <Option value="2">上架</Option>
                            <Option value="1">下架</Option>
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

export default TagManagment;

// import React, { Suspense } from 'react';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import MenuComp from 'components/menu';
import { router } from './router';

import 'antd/dist/antd.css';
import './App.less';
const { Header, Sider, Content } = Layout;

const App: React.FC<any> = () => {
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {}, []);
    return (
        <Layout className="appContext">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <MenuComp />
            </Sider>
            <Layout className="siteLayout">
                <Header className="siteLayoutBackground" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="siteLayoutBackgroundContext"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <div>
                        <Switch>
                            {router.map((item) => (
                                <Route
                                    exact={item.exact}
                                    key={item.path}
                                    path={item.path}
                                    component={item.component}
                                />
                            ))}
                            <Route render={() => '404!'} />
                        </Switch>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;

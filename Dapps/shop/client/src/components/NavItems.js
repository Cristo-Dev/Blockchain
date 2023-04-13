import React, { useState } from 'react';
import { Link, useLocation, withRouter } from 'react-router-dom'
import 'antd/dist/antd.dark.css'
import { Layout, Menu } from 'antd'
import Icon from '@ant-design/icons'

import './NavItems.scss'

const { Sider } = Layout

function NavItems() {
    const [appData, setAppData] = useState({
        collapsed: false,
        appLogo: '/favicon.png'
    })

    const onCollapse = () => {
        setAppData({
            collapsed: !appData.collapsed,
            appLogo: !appData.collapsed ? '/sq.png' : '/favicon.png'
        })
    }


    return (
        <Sider collapsible collapsed={appData.collapsed} onCollapse={onCollapse} style={{ padding: '60px 0 0 0' }}>
            <a href="/">
                <div className="logo">
                    <img src={appData.appLogo} />
                </div>
            </a>
            <Menu theme="dark" defaultSelectedKeys={[getSelectedItem()]} mode="inline">

                <Menu.Divider className="main-menu-divider-all" />

                <Menu.Item key="1" icon={<Icon component={() => (<img src="/cars.png" />)} />}>
                    CARS
                    <Link to="/cars" />
                </Menu.Item>

                <Menu.Item key="2" icon={<Icon component={() => (<img src="/motorcycle.png" />)} />}>
                    MOTORCYCLE
                    <Link to="/motorcycle" />
                </Menu.Item>

                <Menu.Item key="3" icon={<Icon component={() => (<img src="/vans.png" />)} />}>
                    VANS
                    <Link to="/vans" />
                </Menu.Item>

                <Menu.Item key="4" icon={<Icon component={() => (<img src="/others.png" />)} />}>
                    OTHER
                    <Link to="/other" />
                </Menu.Item>

                <Menu.Divider className="main-menu-divider-middle" />

                <Menu.Item key="5" icon={<Icon component={() => (<img src="/account.png" />)} />}>
                    ACCOUNT
                    <Link to="/my-account" />
                </Menu.Item>

                <Menu.Item key="6" icon={<Icon component={() => (<img src="/sq.png" />)} />}>
                    TOKEN SALE
                    <Link to="/token-sale" />
                </Menu.Item>

            </Menu>
        </Sider>
    );
}

function getSelectedItem() {
    return {
        '/': '1',
        '/cars': '1',
        '/motorcycle': '2',
        '/vans': '3',
        '/other': '4',
        '/my-account': '5',
        '/token-sale': '6'
    }[window.location.pathname.replace('/', '').trim().toLowerCase()]
}

export default withRouter(NavItems)
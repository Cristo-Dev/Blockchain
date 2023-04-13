import React from 'react'
import 'antd/dist/antd.dark.css'
import { Result, Button } from 'antd'

function Login() {
    return (
        <Result
            status="403"
            title="Connect to Metamask"
            subTitle="You must connect to Metamask or WalletConnect to continue."
            extra={<a href="/login"><Button danger type="danger">Back</Button></a>}
        />
    )
}

export default Login
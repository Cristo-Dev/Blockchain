import React from 'react'
import 'antd/dist/antd.dark.css';
import { Result, Button } from 'antd';

import './Error404.scss';

function Error404() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, this page does not exist."
            extra={<a href="/">
                <Button danger type="danger">Back</Button></a>}

        />
    )
}

export default Error404
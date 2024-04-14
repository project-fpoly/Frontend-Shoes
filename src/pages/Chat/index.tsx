import React, { useState } from 'react';
import { Button, ConfigProvider, Drawer, FloatButton, Space } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import type { DrawerClassNames, DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { CommentOutlined, CustomerServiceOutlined, MessageFilled, OpenAIOutlined } from '@ant-design/icons';

const useStyle = createStyles(({ token }) => ({
    'my-drawer-body': {
        backgroundColor: "black",
    },
    'my-drawer-mask': {
        boxShadow: `inset 0 0 15px #fff`,
    },
    'my-drawer-header': {
        background: token.green1,
    },
    'my-drawer-footer': {
        color: token.colorPrimary,
    },
    'my-drawer-content': {
        borderLeft: '2px dotted #333',
    },
}));

const ChatsPage = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const { styles } = useStyle();
    const token = useTheme();

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    const classNames: DrawerClassNames = {
        body: styles['my-drawer-body'],
        mask: styles['my-drawer-mask'],
        header: styles['my-drawer-header'],
        footer: styles['my-drawer-footer'],
        content: styles['my-drawer-content'],
    };

    const drawerStyles: DrawerStyles = {
        mask: {
            backdropFilter: 'blur(10px)',
        },
        content: {
            boxShadow: '-10px 0 10px #666',
        },
        header: {
            borderBottom: `1px solid ${token.colorPrimary}`,
        },
        body: {
            fontSize: token.fontSizeLG,
        },
        footer: {
            borderTop: `1px solid ${token.colorBorder}`,
        },
    };

    return (
        <>
            <FloatButton.Group
                trigger="click"
                type="primary"
                style={{ right: 24, bottom: 200 }}
                icon={<CustomerServiceOutlined />}
            >
                <FloatButton icon={<OpenAIOutlined />} />
                <FloatButton onClick={toggleDrawer} icon={<CommentOutlined />} />
            </FloatButton.Group>
            <Drawer
                title="Chat Online"
                placement="right"
                footer="Kiên đẹp zai nè"
                onClose={toggleDrawer}
                open={drawerVisible}
                classNames={classNames}
                styles={drawerStyles}
                width={1000}
            >
                <PrettyChatWindow
                    projectId={"264d853b-32c0-400f-a703-1dc1026f4e63"}
                    username={"banhra2"} // adam
                    secret={"1000kytu"} // pass1234
                    height='100%'
                />
            </Drawer>
        </>
    );
};

export default ChatsPage;

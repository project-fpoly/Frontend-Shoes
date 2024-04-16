import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Drawer, Form, Input, FloatButton } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import type { DrawerClassNames, DrawerStyles } from 'antd/es/drawer/DrawerPanel';
import { OpenAIOutlined, CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { getUserByEmailChat, loginUserChat, registerUserChat } from '../../services/chat';
import { LoginUserChatFeature, fetchUserChatByEmail } from '../../features/chat';
import { RootState } from '@reduxjs/toolkit/query'; // Đảm bảo thay đường dẫn đúng tới RootState
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { UserChatByEmail } from '../../common/chat';
import axios from 'axios';
import { IStateChat } from '../../common/redux/type';
import ChatPage from '../../components/Chat';
import PinForm from './PinForm';
import ChatGPTDemo from './ChatGPTDemo';
export interface UserLogin {
    id: number;
    is_authenticated: boolean;
    last_message: {
        id: number;
        text: string;
        created: string;
        attachments: any[]; // hoặc attachments: unknown[]; nếu không biết kiểu dữ liệu chính xác
    };
    username: string;
    secret: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: null | any; // hoặc avatar: null | unknown; nếu không biết kiểu dữ liệu chính xác
    custom_json: string;
    is_online: boolean;
    created: string;
}

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
    const [registerFormVisible, setRegisterFormVisible] = useState(false);
    const { styles } = useStyle();
    const token = useTheme();
    const dispatch = useDispatch();
    const { userChat } = useSelector((state: IStateChat) => state.chat);
    const [userLogin, setUserLogin] = useState<UserLogin | null>(null);
    
    useEffect(() => {
        const email = localStorage.getItem('email')?.toString();
        dispatch(fetchUserChatByEmail(email));
    }, [drawerVisible]);

    useEffect(() => {
        if (userChat.username && userChat.secret) {
            loginUserChat(userChat.username, userChat.secret)
                .then((response) => {
                    setUserLogin({ ...response, secret: userChat.secret });
                })
                .catch((error) => {
                    console.error('Error while logging in:', error);
                    // Xử lý lỗi nếu cần
                });
        }
    }, [userChat]);

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };
    const handleDrawerClose = () => {
        toggleDrawer();
        window.location.reload(); // Tải lại trang khi Drawer được đóng
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
    const handleOpenChatGPTDemo = () => {
    setDrawerVisible(true);
};
    // onFinish={handleRegisterFormSubmit}
    return (
        <>
             <FloatButton.Group
                trigger="click"
                type="primary"
                style={{ right: 24, bottom: 200 }}
                icon={<CustomerServiceOutlined />}
            >
                  {/* Gọi hàm handleOpenChatGPTDemo khi icon OpenAIOutlined được click */}
                  <FloatButton icon={<OpenAIOutlined />} onClick={handleOpenChatGPTDemo} />
                <FloatButton onClick={toggleDrawer} icon={<CommentOutlined />} />
            </FloatButton.Group>
            <Drawer
                title="Chat Online"
                placement="right"
                footer="Kiên đẹp zai nè"
                onClose={handleDrawerClose }
                open={drawerVisible}
                classNames={classNames}
                styles={drawerStyles}
                
                width={1000}
            >
                {userLogin && userLogin.username !== "" && (
                    <ChatPage username={userLogin.username} secret={userLogin.secret} />
                )}
                {(!userLogin || userLogin.username === "") && (
                   <PinForm/>
                )}
            </Drawer>



        </>
    );
};

export default ChatsPage;

import React, { useEffect, useState } from 'react';
import { Form, Button, Input, notification } from 'antd';
import { CloseOutlined, DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { registerUserChat } from '../../services/chat';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneUsers } from '../../features/user';
import IUser from '../../types/user';
import axios from 'axios';
const PinForm = () => {
    const [pin, setPin] = useState('');

    const handleNumberClick = (number: number) => {
        if (pin.length < 12) {
            setPin(pin + number.toString());
        }
    };

    const handleDeleteLast = () => {
        setPin(pin.slice(0, -1));
    };

    const handleDeleteAll = () => {
        setPin('');
    };

    const dispatch = useDispatch();
    const user = useSelector((state: { auth: { user: IUser } }) => state.auth.user);
    console.log('user:',user)
    useEffect(() => {
            dispatch(fetchOneUsers());
    }, [dispatch]);

    const handleRegister = () => {
        if (pin.length >= 3) {
        
    
            const username = user.email;
            const secret = pin.toString();
            const email = user.email;
            const first_name = user.userName;
            const last_name = `(${user.role})`;
    
            const registrationData = {
                username,
                secret,
                email,
                first_name,
                last_name
            };
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token not found in localStorage');
            }
    
            const headers: Record<string, string> = {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${accessToken}`,
            };
    
            axios.post('http://localhost:9000/api/chat/signup', registrationData, {
                    headers: headers
                })
                .then((response) => {
                    console.log('User registered:', response.data);
                    notification.success({
                        message: 'Success',
                        description: 'Đăng ký thành công!',
                    });
                })
                .catch((error) => {
                    console.error('Error while registering user:', error);
                    notification.error({
                        message: 'Error',
                        description: 'Đăng ký thất bại. Vui lòng thử lại sau!',
                    });
                });
        } else {
            notification.error({
                message: 'Error',
                description: 'Hãy nhập ít nhất 3 số!',
            });
        }
    };
    
    

    return (
        <Form style={{ color: 'white', border: '2px solid white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
            <Form.Item label="Selected PIN">
                <Input value={pin} disabled style={{ backgroundColor: 'black', color: 'white', border: '1px solid white', borderRadius: '4px', boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }} />
            </Form.Item>
            <Form.Item label="Enter PIN" name="pin">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                        <Button
                            key={number}
                            onClick={() => handleNumberClick(number)}
                            style={{ backgroundColor: 'black', color: 'white', border: '1px solid white', borderRadius: '4px', boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}
                        >
                            {number}
                        </Button>
                    ))}
                    <Button onClick={handleDeleteLast} style={{ backgroundColor: 'black', color: 'white', border: '1px solid white', borderRadius: '4px', boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>
                        <MinusCircleOutlined />
                    </Button>
                    <Button onClick={() => handleNumberClick(0)} style={{ backgroundColor: 'black', color: 'white', border: '1px solid white', borderRadius: '4px', boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>
                        0
                    </Button>
                    <Button onClick={handleDeleteAll} style={{ backgroundColor: 'black', color: 'white', border: '1px solid white', borderRadius: '4px', boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>
                        <CloseOutlined />
                    </Button>

                </div>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handleRegister}>
                    Register
                </Button>
            </Form.Item>
            <p style={{ color: 'white' }}>Đăng ký mã để chat với mọi người</p>
        </Form>
    );
};

export default PinForm;

import React, { useEffect, useState, useRef } from 'react';
import { Drawer, Input, Button, Spin, message, Avatar, notification } from 'antd';
import axios from 'axios';
import { EllipsisOutlined } from '@ant-design/icons';
import { Tour, Divider, Space } from 'antd';
import type { TourProps } from 'antd';
import emailjs from 'emailjs-com';


const { TextArea } = Input;

interface Message {
    role: string;
    content: string;
}

interface ChatGPTDemoProps {
    onClose: () => void; // Callback để đóng Drawer
}

const ChatGPTDemo: React.FC<ChatGPTDemoProps> = ({ onClose }) => {
    const [openAiEndpoint, setOpenAiEndpoint] = useState('');
    const [chatGPTKey, setChatGPTKey] = useState('');
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [initialMessagesSent, setInitialMessagesSent] = useState(false);
    const email = localStorage.getItem('email');
    const tourRef1 = useRef(null);
    const tourRef2 = useRef(null);
    const tourRef3 = useRef(null);
    const [openTour, setOpenTour] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const sendEmail = () => {
        // Thực hiện gửi email
        emailjs.send('service_t8lv8u1', 'template_7b1b8yv', {
            to_email: 'ntrkien001@gmail.com',
        }, 'Mc4EzlCqkbu9supJL')
            .then(() => {
                notification.success({
                    message: 'Email Sent',
                    description: 'Your email has been sent successfully.',
                });
                setEmailSent(true);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                notification.error({
                    message: 'Error',
                    description: 'Failed to send email. Please try again later.',
                });
            });
    };

    function getEmailUsername(email: string | null): string {
        if (email === null || !email.includes('@')) {
            return '';
        }
        return email.substring(0, email.indexOf('@'));
    }

    const roleUser = `${getEmailUsername(email)}: `;

    useEffect(() => {
        // Kiểm tra xem tour đã được hiển thị trước đó chưa
        const hasShownTour = localStorage.getItem('hasShownTour');
        if (!hasShownTour) {
            // Nếu chưa, mở tour và đánh dấu rằng tour đã được hiển thị
            setOpenTour(true);
            localStorage.setItem('hasShownTour', 'true');
        }

        // Lấy dữ liệu từ API
        axios.get('https://660edb22356b87a55c504eef.mockapi.io/chatgpt')
            .then(response => {
                const data = response.data[0];
                const { openAiEndpoint, chatGPTKey } = data;
                setOpenAiEndpoint(openAiEndpoint);
                setChatGPTKey(chatGPTKey);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const messageClasses = (role: string) => ({
        'text-right justify-end': role === 'user',
        'text-left justify-start': role === 'assistant',
    });

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        setIsLoading(true);
        setUserInput('');

        try {
            let messagesToSend = messages;
            if (!initialMessagesSent) {
                messagesToSend = [
                    { role: 'system', content: "You're a helpful chat bot. Answer short and concise in 150 tokens only." },
                    { role: 'user', content: userInput },
                ];
                setInitialMessagesSent(true);
            } else {
                messagesToSend = [
                    ...messages,
                    { role: 'user', content: userInput }
                ];
            }

            try {
                await axios.get(`${openAiEndpoint}/v1/status`);

                const response = await axios.post(`${openAiEndpoint}/v1/chat/completions`, {
                    model: 'gpt-4-1106-preview',
                    messages: messagesToSend,
                    temperature: 0.9,
                    max_tokens: 150,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${chatGPTKey}`,
                    },
                });

                const assistantMessage = {
                    role: 'assistant',
                    content: response.data.choices[0].message.content
                };
                const userMessage = {
                    role: 'user',
                    content: userInput
                };

                setMessages([...messages, userMessage, assistantMessage]);

            } catch (error) {
                message.error('Tính năng đã được bảo mật, hãy liên hệ với admin để mở khóa tính năng!!');
                setOpenTour(true); // Bật tour khi xảy ra lỗi
            }

        } catch (error) {
            console.error('There was an error with the API request', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };

    const steps: TourProps['steps'] = [
        {
            title: 'Gửi tin nhắn',
            description: 'Đây là tính năng bảo mật, bạn cần có xác nhận của admin để dùng tính năng này. Tính năng giúp tin nhắn của bạn đến AI, bạn có thể tra cứu thông tin về giày',
            target: () => tourRef1.current,
        },
        {
            title: 'Đóng cửa sổ chat',
            description: 'Đóng cửa sổ chat AI',
            target: () => tourRef2.current,
        },
        {
            title: 'Yêu cầu mở khóa',
            description: 'Gửi thông báo đến admin để mở khóa tính năng',
            target: () => tourRef3.current,
        },
    ];

    return (
        <>
            <Tour
                open={openTour}
                onClose={() => setOpenTour(false)}
                mask={false}
                type="primary"
                steps={steps}
            />
            <ul>
                {messages.map((message, index) => (
                    <li key={index} className="py-3 sm:py-4">
                        <div className={`flex items-center space-x-4 ${messageClasses(message.role)}`}>
                            <div className="flex-shrink-0">
                                {message.role === 'assistant' && (
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTagONv1r-0HPnlnWClF12amS_KdrPX83zlhcXHyek&s"
                                        alt="ChatGPT Icon"
                                    />
                                )}
                                {message.role === 'user' && (
                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" alt="User Avatar" />
                                )}
                            </div>
                            <p style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                                overflow: 'hidden',
                                whiteSpace: 'normal' // Đảm bảo văn bản tự động xuống dòng khi cần thiết
                            }}>
                                <span style={{ color: "white" }}>{message.role === 'user' ? roleUser : 'Assistant:'}</span> {message.content}
                            </p>
                        </div>
                        {/* Kiểm tra xem tin nhắn hiện tại và tin nhắn tiếp theo có thuộc hai vai trò khác nhau không */}
                        {index < messages.length - 1 && message.role !== messages[index + 1].role && (
                            <hr className="my-2 border-t border-gray-400" />
                        )}
                    </li>
                ))}
            </ul>


            <div className="mt-6">
                <TextArea
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    autoSize={{ minRows: 2, maxRows: 6 }}
                />
                <Button
                    type="primary"
                    className="mt-3"
                    onClick={sendMessage}
                    loading={isLoading}
                    ref={tourRef1}
                >
                    {isLoading ? <Spin /> : 'Send'}
                </Button>
                <Button className="ml-3" onClick={onClose} ref={tourRef2}>Close</Button>
                <Space className="ml-3">
                    <Button ref={tourRef3} onClick={sendEmail} disabled={emailSent}>
                        {emailSent ? 'Email Sent' : 'Unlock required'}
                    </Button>
                </Space>
                <Space className="ml-3">
                    <Button onClick={() => { setOpenTour(true); }}>Hướng dẫn</Button>
                </Space>
            </div>
        </>
    );
};

export default ChatGPTDemo;

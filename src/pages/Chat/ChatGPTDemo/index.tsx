import React, { useEffect, useState } from 'react';
import { Drawer, Input, Button, Spin, message } from 'antd';
import axios from 'axios';

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

    useEffect(() => {
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
            // Prepare messages to send
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
                // Kiểm tra tính hoạt động của API trước khi gửi yêu cầu POST
                await axios.get(`${openAiEndpoint}/v1/status`);

                // Nếu API hoạt động, gửi yêu cầu POST đến OpenAI endpoint
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
                // Append ChatGPT response
                const assistantMessage = {
                    role: 'assistant',
                    content: response.data.choices[0].message.content

                };
                const userMessage = {
                    role: 'user',
                    content: userInput
                };

                setMessages([...messages, userMessage, assistantMessage]);

                // Xử lý response và cập nhật state messages
            } catch (error) {
            
                message.error('Tính năng đã được bảo mật, hãy liên hệ với admin để mở khóa tính năng!!');
            }


            // Append user message

        } catch (error) {
            console.error('There was an error with the API request', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };

    return (
        <>
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
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm break-normal whitespace-pre-line text-zinc-50 ${messageClasses(message.role)}`} style={{ fontWeight: 'bold', color: message.role === 'user' ? '#fff' : '#000', textShadow: message.role === 'user' ? '1px 1px 2px rgba(0, 0, 0, 0.5)' : 'none' }}>
                                    <span>{message.role === 'user' ? 'User:' : 'Assistant:'}</span> {message.content}
                                </p>

                            </div>
                        </div>
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
                >
                    {isLoading ? <Spin /> : 'Send'}
                </Button>
                <Button className="ml-3" onClick={onClose}>Close</Button>
            </div>
        </>
    );
};

export default ChatGPTDemo;

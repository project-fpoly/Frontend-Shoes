import React, { useState } from 'react';
import { Drawer, Input, Button, Spin } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const ChatGPTDemo = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const OPEN_AI_ENDPOINT = "https://6b2d-1-53-89-141.ngrok-free.app/v1";
    const chatGPTKey = "";
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'system', content: "You're a helpful chat bot. Answer short and concise in 150 tokens only." }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const messageClasses = (role) => ({
        'text-right justify-end': role === 'user',
        'text-left justify-start': role === 'assistant',
    });

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        // Append user message
        setMessages([{ role: 'user', content: userInput }, ...messages]);
        setIsLoading(true);
        setUserInput('');

        try {
            // Send API request to OpenAI endpoint
            const response = await axios.post(`${OPEN_AI_ENDPOINT}/chat/completions`, {
                model: 'gpt-4-1106-preview',
                messages: messages,
                temperature: 0.9,
                max_tokens: 150,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${chatGPTKey}`,
                },
            });

            // Append ChatGPT response
            setMessages([{ role: 'assistant', content: response.data.choices[0].message.content }, ...messages]);
        } catch (error) {
            console.error('There was an error with the API request', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    };

    return (
        <>
            <Button type="primary" onClick={toggleDrawer}>
                Open Chat
            </Button>
            <Drawer
                title="ChatGPT Demo in 1 file"
                placement="right"
                closable={true}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
                width={500}
            >
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
                                    <p className={`text-sm text-gray-800 break-normal whitespace-pre-line ${messageClasses(message.role)}`}>
                                        {message.role === 'user' && <span className="font-bold">Code Dạo: </span>}
                                        {message.content}
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
                </div>
            </Drawer>
        </>
    );
};

export default ChatGPTDemo;

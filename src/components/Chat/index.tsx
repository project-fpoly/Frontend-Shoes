
import { PrettyChatWindow } from 'react-chat-engine-pretty';

interface propChatPage {
    username:string,
    secret:string
}
const ChatPage = ({ username, secret }:propChatPage) => {
    return (
        <PrettyChatWindow
            projectId={"086d50c6-5443-438c-8766-cfd20e37e71e"}
            username={username}
            secret={secret}
            height='100%'
        />
    );
};

export default ChatPage;
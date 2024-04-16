
import { PrettyChatWindow } from 'react-chat-engine-pretty';

interface propChatPage {
    username:string,
    secret:string
}
const ChatPage = ({ username, secret }:propChatPage) => {
    return (
        <PrettyChatWindow
            projectId={"f2650ca0-3e46-47c5-a198-6e04fa81d3dc"}
            username={username}
            secret={secret}
            height='100%'
        />
    );
};

export default ChatPage;
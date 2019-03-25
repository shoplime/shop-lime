import React from 'react';
import { Chat, Channel, ChannelHeader, Window } from 'stream-chat-react';
import { MessageList, MessageInput, MessageLivestream } from 'stream-chat-react';
import { MessageInputSmall, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

const chatClient = new StreamChat('qk4nn7rpcn75');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZnJhZ3JhbnQtbW9vbi0xIn0.ypyzjXhN_YhJVbeUNOKiABC8ok8NKVye_lfQrE39J3Y';

chatClient.setUser(
  {
    id: 'fragrant-moon-1',
    name: 'Fragrant moon',
    image: 'https://getstream.io/random_svg/?id=fragrant-moon-1&name=Fragrant+moon'
  },
  userToken,
);

const channel = chatClient.channel('livestream', 'lime', {
  image: 'https://goo.gl/Zefkbx',
  name: 'Buck Bunny',
});

const App = () => (
  <Chat client={chatClient} theme={'livestream dark'}>
    <Channel channel={channel} Message={MessageLivestream}>
      <Window hideOnThread>
        <ChannelHeader live />
        <MessageList />
        <MessageInput Input={MessageInputSmall} focus />
      </Window>
      <Thread fullWidth />
    </Channel>
  </Chat>
);

export default App;
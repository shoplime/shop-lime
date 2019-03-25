import React from 'react';

const sb = new SendBird({appId: REACT_APP_SB_APP_ID});
sb.connect(USER_ID, function(user, error) {});
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
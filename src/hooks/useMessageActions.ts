import Clipboard from '@react-native-clipboard/clipboard';
import { Alert } from 'react-native';
import { useConversationStore } from '../store/conversationStore';
import { Message } from '../types/conversation';
import { useReply } from './useReply';

export const useMessageActions = () => {
  const { startReply } = useReply();
  const remove = useConversationStore(state => state.remove);

  return (message: Message) =>
    Alert.alert(
      'Message',
      undefined,
      [
        { text: 'Reply', onPress: () => startReply(message) },
        { text: 'Copy', onPress: () => Clipboard.setString(message.text) },
        { text: 'Delete', style: 'destructive', onPress: () => remove(message.id) },
      ],
      { cancelable: true },
    );
};

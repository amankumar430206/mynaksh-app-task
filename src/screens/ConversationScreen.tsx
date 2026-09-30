import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import StateView from '../components/StateView';
import Composer from '../features/conversation/Composer';
import ReplyPreview from '../features/conversation/ReplyPreview';
import Timeline from '../features/conversation/Timeline';
import { useConversation } from '../hooks/useConversation';
import { colors } from '../theme';

const ConversationScreen = () => {
  const { status, messages, aiTyping, reload, send } = useConversation();

  if (status === 'idle' || status === 'loading') {
    return <StateView loading message="Loading conversation..." />;
  }

  if (status === 'error') {
    return (
      <StateView
        message="Unable to load conversation."
        actionLabel="Retry"
        onAction={reload}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {messages.length === 0 ? (
        <StateView message="Start your conversation." />
      ) : (
        <Timeline messages={messages} typing={aiTyping} />
      )}
      <ReplyPreview />
      <Composer onSend={send} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});

export default ConversationScreen;

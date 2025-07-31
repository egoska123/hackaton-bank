import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9EB',
    position: 'relative',
    marginTop: 40,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    alignItems: 'center',
    flex: 1,
  },
  nameWithDot: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toshaName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginRight: 8,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#50B848',
  },
  toshaAvatarContainer: {
    position: 'absolute',
    right: 16,
    width: 43,
    height: 43,
    borderRadius: 8,
    backgroundColor: '#50B848',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toshaAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  messageWrapper: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  toshaMessageWrapper: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: '#50B848',
    borderBottomRightRadius: 6,
  },
  toshaMessage: {
    backgroundColor: '#E9E9EB',
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  toshaMessageText: {
    color: '#000000',
  },
  messageTime: {
    fontSize: 11,
    opacity: 0.7,
  },
  userMessageTime: {
    color: '#FFFFFF',
    alignSelf: 'flex-end',
  },
  toshaMessageTime: {
    color: '#000000',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9E9EB',
    gap: 12,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: '#E9E9EB',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#C3C3C3',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 45,
    maxHeight: 100,
  },
  textInput: {
    fontSize: 12,
    color: '#333333',
    lineHeight: 16,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 50,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#50B848',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sourceText: {
    fontSize: 10,
    color: '#999999',
    marginTop: 2,
    fontStyle: 'italic',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  errorContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    textAlign: 'center',
  },
});
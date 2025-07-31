import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    height: 717,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: '#FFF',
    padding: 24,
    alignItems: 'center',
  },
  swipeIndicator: {
    width: 60,
    height: 7,
    borderRadius: 34,
    backgroundColor: '#ECECEC',
    marginBottom: 16,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    width: '100%',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: '-25%',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    
  },
  toshaName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Inter',
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#50B848',
    marginTop: 3,
  },
  onlineText: {
    color: '#50B848',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  toshaAvatarContainer: {
    position: 'absolute',
    right: 0,
    top: '-25%',
    width:43,
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
    height: 450,
    marginBottom: 16,
    width: '100%',
  },
  messagesContent: {
    paddingVertical: 8,
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
    maxWidth: screenWidth * 0.7,
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
    fontFamily: 'Inter',
  },
  userMessageText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  toshaMessageText: {
    color: '#333333',
    fontWeight: '500',
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
    fontFamily: 'Inter',
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  toshaMessageTime: {
    color: '#999999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C3C3C3',
    paddingHorizontal: 5,
    paddingVertical: 5,
    height: 45,
  },
  textInput: {
    fontSize: 12,
    color: '#333333',
    fontFamily: 'Inter',
  },
  sendButton: {
    width: 50,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#50B848',
  },
  sendButtonInactive: {
    backgroundColor: '#CCCCCC',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
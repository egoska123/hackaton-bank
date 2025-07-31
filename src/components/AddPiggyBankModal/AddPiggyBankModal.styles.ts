import { StyleSheet } from 'react-native';

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
    alignItems: 'flex-start',
  },
  swipeIndicator: {
    width: 60,
    height: 7,
    borderRadius: 34,
    backgroundColor: '#ECECEC',
    marginBottom: 32,
    alignSelf: 'center',
  },
  caption: {
    color: '#454545',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',

    lineHeight: 19,
  },
  titleInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 10,
    color: '#070707',
    fontFamily: 'Inter',
    fontSize: 26,
    fontWeight: '700',
    // fontStyle: 'normal' — в RN по умолчанию
    // lineHeight "normal" в вебе примерно 1.2 × fontSize
    lineHeight: 32,
    marginBottom: 24,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  amountInput: {
    width: '100%',
    height: 50,
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: '600',
    color: '#50B848',
    fontFamily: 'Inter',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  attachButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#50B848',
    marginTop: 8,
  },
  attachButtonText: {
    color: '#454545',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    // fontStyle: 'normal' — в RN по умолчанию
    // lineHeight: 'normal' в вебе примерно 1.2 × fontSize
    lineHeight: 19,
  },

  previewImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    marginBottom: 24,
    resizeMode: 'cover',
  },
  buttons: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    display: 'flex',
    alignItems: 'center',
  },
  greenButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#50B848',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  disabledButtonText: {
    color: '#999999',
  },
});
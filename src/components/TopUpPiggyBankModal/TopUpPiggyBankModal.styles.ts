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
  piggyBankInfo: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 32,
  },
  piggyBankImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 16,
  },
  piggyBankDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  piggyBankLabel: {
    color: '#454545',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    // fontStyle: 'normal' — в RN это значение по умолчанию
    // line-height: normal в вебе примерно 1.2 × fontSize
    lineHeight: 19,
  },
  piggyBankTitle: {
    color: '#000000',
    fontFamily: 'Inter',
    fontSize: 26,
    fontWeight: '700',
    // fontStyle: 'normal' — в React Native по умолчанию
    // lineHeight: 'normal' в вебе примерно 1.2 × fontSize
    lineHeight: 32,
    marginBottom: 10,
    marginTop: 8,
  },
  piggyBankAmount: {
    fontSize: 16,
    fontWeight: '400',
    color: '#454545',
    fontFamily: 'Inter',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 16,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#50B848',
    borderRadius: 20,
  },
  caption: {
    color: '#454545',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
    marginBottom: 8,
  },
  amountInput: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: '600',
    color: '#50B848',
    fontFamily: 'Inter',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  savedAmount: {
    color: '#454545',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    // fontStyle: 'normal' — в RN по умолчанию
    // line-height "normal" в вебе примерно 1.2 × fontSize
    lineHeight: 14,
  },
  targetAmount: {
    color: '#A9A9A9',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    // fontStyle: 'normal' — в RN по умолчанию
    // web-line-height: normal ≈ 1.2 × fontSize
    lineHeight: 14,
  },
  buttons: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  greenButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#50B848',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  greenButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  grayButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayButtonText: {
    color: '#454545',
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
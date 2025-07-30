import { StyleSheet } from 'react-native';
import { RotateInUpLeft } from 'react-native-reanimated';

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
  },
  textCont: {
    display: 'flex',
    gap: 8,
    marginTop: 33,
  },
  parentsListText: {
    color: '#454545',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 19,
  },
  desc: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
  },
  image: {
    width: 204,
    height: 298,
    position: 'absolute',
    transform: [
      { rotate: '-23.263deg' }
    ],
    zIndex: 1
  },
  main: {
    marginTop: 55,
    display: 'flex',
    width: '100%',
    gap: 55,
  },
  mainText: {
    display: 'flex',
    gap: 8,
  },
  earnText: {
    color: '#454545',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 19,
  },
  earn: {
    color: '#40A93D',
    fontFamily: 'Inter',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
  },
  buttonsColumn: {
    flexDirection: 'column',
    width: '100%',
    gap: 10,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    height: 71,
    paddingTop: 17,
    paddingRight: 19,
    paddingBottom: 14,
    paddingLeft: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FFF',
  },
  buttonActive: {
    borderWidth: 2,
    borderColor: '#50B848',
    marginRight: 8,
  },
  buttonInactive: {
    borderWidth: 2,
    borderColor: '#D5D5D5',
  },
  buttonTextActive: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#454545',
  },
  buttonTextInactive: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#D7D7D7',
  },
});

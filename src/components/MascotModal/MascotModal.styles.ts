// MascotModal.styles.ts
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
    padding: 24,          // этот padding учитываем в расчёте AVAILABLE_WIDTH
    alignItems: 'center',
  },
  swipeIndicator: {
    width: 60,
    height: 7,
    borderRadius: 34,
    backgroundColor: '#ECECEC',
    marginBottom: 16,
  },
  imagesContainer: {
    position: 'relative',
    overflow: 'hidden',
  },
  imageTrack: {
    flexDirection: 'row',
  },
  grass: {
    position: 'absolute',
    bottom: '-8%',
    right: '24%',
    zIndex: -1,
  },
  buttonsSlider: {
    position: 'absolute',
    top: '65%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    zIndex: 100,
    gap: '40%'
  },
  buttonSlider: {
    width: 63,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#50B848',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelProgress: {
    zIndex: 2,
  },
  disButtonSlider: {
    backgroundColor: '#D2D2D2'
  },
  mascotModalText: {
    display: 'flex',
    gap: 15,
    position: 'absolute',
    bottom: '13%'
  },
  title: {
     color: '#000',
    fontFamily: 'Inter',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 32,
  },
  description: {
    color: '#454545',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 19,
  }
});

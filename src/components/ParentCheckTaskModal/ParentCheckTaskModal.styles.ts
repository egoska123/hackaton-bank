import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    height: 717, // Стандартная высота как у других модалок
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    backgroundColor: '#FFF',
    padding: 24,
    alignItems: 'center',
    paddingBottom: 40, // Добавляю отступ внизу модалки
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
    alignItems: 'center',
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
    textAlign: 'center',
  },
  main: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
    // flex: 1,
  },
  mainText: {
    alignItems: 'center',
    marginBottom: 20,
  },
  earnText: {
    color: '#A9A9A9',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '700',
    marginBottom: 8,
  },
  earn: {
    color: '#50B848',
    fontFamily: 'Inter',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: '100%', // Фотография занимает всю доступную ширину
    height: 298,
    borderRadius: 12,
  },
  buttonsColumn: {
    width: '100%',
    gap: 16,
    // marginTop: 'auto',
    marginBottom: 60, // Добавляю отступ снизу для кнопок
  },
  button: {
    height: 60,
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  buttonCompleted: {
    backgroundColor: '#50B848',
  },
  buttonNotCompleted: {
    backgroundColor: '#FF3B30',
    marginBottom: 20,
  },
  buttonTextCompleted: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  buttonTextNotCompleted: {
    color: '#FFF',
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  xIcon: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
}); 
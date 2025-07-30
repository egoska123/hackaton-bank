import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  card: {
    height: 113,
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#FBADAD',
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 69,
    height: 79,
    borderRadius: 9,
  },
  title: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 16, // или 'normal' можно опустить
    overflow: 'hidden',
    marginBottom: 2,
  },
  progressBackground: {
    height: 16,
    borderRadius: 20,
    backgroundColor: '#DDD',
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#50B848',
  },
  amounts: {
    color: '#A9A9A9',
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginBottom: 10,
  },
  savedAmount: {
    color: '#454545',
  }
});


import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 23,
    paddingBottom: 8,
    paddingTop: 57,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 63,
    height: 63,
    borderRadius: 26,
    backgroundColor: '#F4F4F6',
    marginRight: 10,
  },
  texts: {
    flexDirection: 'column',
  },
  hello: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
  },
  name: {
    color: '#40A93D',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  dateTitle: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
  item: {
    height: 83,
    paddingHorizontal: 30,
    paddingVertical: 25,
    backgroundColor: '#FFF',
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 10,
  },
  itemTitle: {
    color: '#454545',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
  itemSubtitle: {
    color: '#A9A9A9',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
  },
  itemAmount: {
    color: '#454545',
    textAlign: 'right',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
});

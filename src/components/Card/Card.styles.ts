import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // height: 190,
    borderRadius: 21,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  leftBlock: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },
  leftBlockText: {
    display: 'flex',
  },
  balanceText: {
    color: 'rgba(255, 255, 255, 0.58)',
    fontSize: 20,
    fontWeight: '700',
  },
  amount: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
  },
  catImage: {
    position: 'absolute',
    right: '-8%',
    width: 250,
    height: 250,
    top: '8%',
  },
});

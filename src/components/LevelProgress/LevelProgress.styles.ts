import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  wrapper: {
    width: 350,
    height: 107,
    padding: 13,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#50B848',
    backgroundColor: '#FFF',
    flexDirection: 'column',
    gap: 10,
  },
  name: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  progressBar: {
    height: 16,
    backgroundColor: '#DDD',
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#50B848',
    borderRadius: 20,
  },
  levelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  levelText: {
    color: '#A9A9A9',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});
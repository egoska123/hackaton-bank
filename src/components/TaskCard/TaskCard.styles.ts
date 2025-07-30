import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 83,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 26,
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  parentsContainer: {
    borderColor: '#FBADAD',
    borderWidth: 2,
  },
  text: {
    color: '#454545',
    fontFamily: 'Inter',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 19,
    flex: 1,
    marginRight: 16,
  },
  completedContainer: { 
    borderColor: '#50B848',
    borderWidth: 2,
  },
  completedText: {
    color: '#50B848',
  },
});
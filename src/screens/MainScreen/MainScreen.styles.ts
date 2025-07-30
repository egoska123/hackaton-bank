import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    main: {
        marginTop: 31, 
        paddingHorizontal: 20,
    },
    buttons: {
    gap: 21,
    marginTop: 55,
  },
  sendButton: {
    height: 96,
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 26,
    backgroundColor: '#40A93D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sendText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  historyButton: {
    height: 96,
    paddingHorizontal: 30,
    paddingVertical: 25,
    borderRadius: 26,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
  },
  history: {
    marginTop: 26, 
    paddingHorizontal: 20,
  },
  aroowLCont: {
    width: 63,
    height: 37,
    borderRadius: 20,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    paddingTop: 9,
    justifyContent: 'center',
  },
  historyTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 26,
    marginBottom: 26,
  },
  historyTitleText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 26,
  },
});
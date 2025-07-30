import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    content: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        marginTop: 24,
        paddingHorizontal: 21,
        gap: 13,
        paddingBottom: 40,
    },
    piggyBankText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bankText: {
        color: '#000',
    fontFamily: 'Inter',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
    },
    plusIcon: {
        width: 63,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 20,
    backgroundColor: '#50B848',
    flexDirection: 'row',
    }
    
});
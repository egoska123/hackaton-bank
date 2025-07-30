import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    content: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 7,
    },
    images: {
        position: 'relative',
    },
    catImage: {
        width: 119,
        height: 173,
        zIndex: 2,
    },
    grass: {
        position: 'absolute',
        top: '87%',
        right: '-7%',
        zIndex: 1,
    },
    levelProgress: {
        zIndex: 2,
        marginTop: '10%',
    },
    listTasks: {
        width: '100%',
        paddingHorizontal: 22,
        marginTop: 21,
        display: 'flex',
    },
    parentsTasks: {
        display:'flex',
        flex: 1,
        width: '100%',
    },
    parentstext: {
        marginBottom: 26,
        color: '#000',
    fontFamily: 'Inter',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
    },
    parentsTasksList: {
        display: 'flex',
        gap: 13,
    },
    Tasks: {
        marginTop: 49,
        paddingBottom: 20,
    }
});
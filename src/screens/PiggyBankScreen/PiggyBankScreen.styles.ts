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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 18,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999999',
        textAlign: 'center',
    }
    
});
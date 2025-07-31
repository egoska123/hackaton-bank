import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    marginTop: 50,
    paddingHorizontal: 21,
    gap: 13,
    paddingBottom: 100, // Увеличил отступ снизу для лучшей прокрутки
  },
  topHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
  },
  cardSubtitle: {
    color: '#50B848',
    fontFamily: 'Inter',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
    marginTop: 4,
  },
  settingsButton: {
    width: 63,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pageHeaderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 63,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginRight: 16,
  },
  pageTitle: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 26,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'left',
    flex: 1,
  },
  historyContainer: {
    gap: 20,
  },
}); 
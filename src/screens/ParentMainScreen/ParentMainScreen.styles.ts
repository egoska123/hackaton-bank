import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 31,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#50B848',
    fontFamily: 'Inter',
    marginTop: 4,
  },
  settingsButton: {
    padding: 8,
    marginTop: 4,
  },
  cardContainer: {
    marginBottom: 24,
  },
  card: {
    height: 200,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#50B848',
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    fontFamily: 'Inter',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F4CF49',
    fontFamily: 'Inter',
  },
  buttons: {
    gap: 21,
    marginTop: 30,
  },
  topUpButton: {
    height: 70,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 26,
    backgroundColor: '#40A93D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topUpText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  navButton: {
    height: 70,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 26,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
  },
}); 
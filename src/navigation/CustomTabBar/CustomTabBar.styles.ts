import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F4F4F6',
    paddingHorizontal: 22,
    paddingBottom: 47,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 11,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  label: {
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 14,
  },
  activeTabItem: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: '#E9FACA',
  },
});

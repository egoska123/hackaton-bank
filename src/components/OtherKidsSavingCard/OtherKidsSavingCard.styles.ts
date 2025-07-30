import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  card: {
    height: 113,
    paddingVertical: 17,
    paddingLeft: 17,
    paddingRight: 20.5,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#96EF90',
    backgroundColor: '#50B848',
    justifyContent: 'center',
  },
  infoCont: {
    flexDirection: 'column',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 69,
    height: 79,
    borderRadius: 9,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 45,
    height: 65,
  },
  info: {
    flex: 1,
  },
  caption: {
    color: '#A6D2A2',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    overflow: 'hidden',
  },
  priceWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 8,
    flex: 1,
  },
  price: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
  },
  iconButton: {
    width: 54,
    height: 27,
    borderRadius: 20,
    backgroundColor: '#CAFEC6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

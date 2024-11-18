import {fonts} from '../../contants';

const {StyleSheet} = require('react-native');

const htmlstyles = StyleSheet.create({
  span: {
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  font: {
    color: '#212529',
  },
  b: {
    fontWeight: 'bold',
  },
  p: {
    marginBottom: 10,
    color: '#000',
    fontFamily: fonts.regular,
  },
  table: {
    borderWidth: 1,
    borderColor: '#cccccc',
    marginVertical: 10,
    width: '100%',
  },
  tr: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    color: 'black',
  },
  th: {
    padding: 8,
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  td: {
    padding: 8,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
});

export {htmlstyles};

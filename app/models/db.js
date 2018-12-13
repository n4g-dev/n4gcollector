import SQLite from 'react-native-sqlite-storage';

export default SQLite.openDatabase({
	name: 'appDb.db',
	createFromLocation: '~appDb.db'
},
() => {
	console.log('SQL executed fine');
},
(err) => {
	console.log(`SQL Error: ${err}`);
}
);


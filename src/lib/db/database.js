
import Dexie from 'dexie';

const db = new Dexie('shoplink');

db.version(1).stores({
  queryCache: 'id',
});

export default db;

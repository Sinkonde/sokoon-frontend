import db from './database';

const queryStorage = {

  getItem: async (key) => {
    const record = await db.queryCache.get(key);

    return record?.value ?? null;
  },

  setItem: async (key, value) => {
    await db.queryCache.put({
      id: key,
      value,
    });
  },

  removeItem: async (key) => {
    await db.queryCache.delete(key);
  },

};

export default queryStorage;
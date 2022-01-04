import { getAuth } from 'firebase-admin/auth';
import { Timestamp } from 'firebase-admin/firestore';
import { client } from '../..';

export type ListData = {
  title: string;
  description: string;
  public: boolean;
};

export const createWatchListService = async (
  authToken: string,
  data: ListData
) => {
  try {
    const user = await getAuth().verifyIdToken(authToken);

    const db = client.db('WatchLists').collection(user.uid);

    const newWatchList = {
      ...data,
      movies: [],
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    const result = await db.insertOne(newWatchList);

    return result;
  } catch (err) {
    throw err;
  }
};

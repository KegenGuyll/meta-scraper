import { getAuth } from 'firebase-admin/auth';
import { ObjectId } from 'mongodb';
import { client } from '../..';

interface List {
  _id: ObjectId;
  title: string;
  description: string;
  public: boolean;
  movies: Movie[];
}

type Movie = number

export const MovieWatchListCheckService = async (
  authToken: string,
  tmdbID: number
) => {
  try {
    const listWithMovie: any[] = [];

    const user = await getAuth().verifyIdToken(authToken);

    const db = client.db('Reviews').collection('WatchLists');

    const lists = (await db.find({ userId: user.uid }).toArray()) as unknown as List[];
    
    lists.forEach((list) => {
      list.movies.forEach((movie) => {
        if (movie === tmdbID) {
          listWithMovie.push({
            listTitle: list.title,
            listId: list._id,
          });
        }
      });
    });

    return listWithMovie;
  } catch (error) {
    throw error;
  }
};

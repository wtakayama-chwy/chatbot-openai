import { db } from '../../src/app/api/database';

export const migrate = async () => {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        content TEXT NOT NULL,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL
      );
    `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log('messages table created successfully.');
      }
    );
  });
};

export async function resetDb() {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM messages', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

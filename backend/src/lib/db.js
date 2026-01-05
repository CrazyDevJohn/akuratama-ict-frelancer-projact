import { connect } from 'mongoose';
import 'dotenv/config';

const connection = {};

const connectDb = async () => {
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await connect(process.env.DATABASE_URL)
      .then(() => {
        console.log('Connected to MongoDB successfully');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
      });

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDb;

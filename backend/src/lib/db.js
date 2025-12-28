import { connect } from 'mongoose';
import 'dotenv/config';

const connectDb = async () => {
  try {
    await connect(process.env.DATABASE_URL)
      .then(() => {
        console.log('Connected to MongoDB successfully');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
      });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDb;

import cors, { CorsOptions } from 'cors';

const allowedOrigins = ['http://localhost:4200'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    callback(null, !origin || allowedOrigins.includes(origin));
  },
  exposedHeaders: ['Authorization', 'x-refresh-token'], 
};

export default cors(corsOptions);
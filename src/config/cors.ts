import cors, { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  exposedHeaders: ['Authorization', 'x-refresh-token'], 
};

export default cors(corsOptions);

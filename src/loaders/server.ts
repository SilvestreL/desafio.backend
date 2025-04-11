import bodyParser from 'body-parser';
import { errors, isCelebrateError } from 'celebrate';
import cors from 'cors';
import { Application, Request, Response,} from 'express';
import helmet from 'helmet';
import routes from '../api/routes';

export default (app: Application) => {
  app.enable('trust proxy');
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(errors()); // celebrate

  app.use('/api', routes);

  // 404 handler
  app.use((req: Request, res: Response) => {
    const error = new Error('Not Found') as any;
    error.status = 404;
    res.status(404).json({ error: error.message });
  });

  // Validation + Error handler
  app.use((err: any, req: Request, res: Response) => {
    // Celebrate error
    if (isCelebrateError(err)) {
      return res.status(422).json({
        error: {
          message: err.message,
          details: err.details,
        },
      });
    }

    // Default
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'Internal Server Error',
      },
    });
  });
};
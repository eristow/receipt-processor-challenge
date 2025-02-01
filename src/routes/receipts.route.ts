import { Router } from 'express';
import receiptsController from '@controllers/receipts.controller';

const receiptsRouter = Router();

receiptsRouter.post('/process', receiptsController.processReceipts);

receiptsRouter.get('/:receiptId/points', receiptsController.getPoints);

export default receiptsRouter;

import { Router } from 'express';
import ReceiptsController from '@controllers/receipts.controller';

const receiptsRouter = Router();

receiptsRouter.post('/process', ReceiptsController.processReceipts);

receiptsRouter.get('/:receiptId/points', ReceiptsController.getPoints);

receiptsRouter.get('/', ReceiptsController.getAllReceipts);

export default receiptsRouter;

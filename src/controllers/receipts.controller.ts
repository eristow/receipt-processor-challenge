import { Request, Response, NextFunction } from 'express';
import receiptsService from '@services/receipts.service';
import {
  GetPointsReturn,
  ProcessReceiptDTO,
  ProcessReceiptReturn,
} from 'src/types/receipts.type';

const receiptsController = {
  processReceipts,
  getPoints,
};

async function processReceipts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // TODO: add validation for if req.body is empty (it's required)
    // TODO: add validation for req.body to be of type Receipt
    // * Return "The receipt is invalid."
    const receipt: ProcessReceiptDTO = req.body;

    const receiptId: ProcessReceiptReturn =
      await receiptsService.processReceipt(receipt);

    res.json(receiptId);
  } catch (err: any) {
    console.error(`Error while processing receipts: ${err}`);
    next(err);
  }
}

async function getPoints(req: Request, res: Response, next: NextFunction) {
  try {
    // TODO: return 404 if receipt ID not found in DB
    // * Return "No receipt found for that ID."
    const receiptId = req.params.receiptId;

    const receiptPoints: GetPointsReturn = await receiptsService.getPoints(
      receiptId
    );

    res.json(receiptPoints);
  } catch (err: any) {
    console.error(`Error while getting points: ${err}`);
    next(err);
  }
}

export default receiptsController;

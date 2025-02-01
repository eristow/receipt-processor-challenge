import {
  GetPointsReturn,
  ProcessReceiptDTO,
  ProcessReceiptReturn,
} from '@app_types/receipts.type';
import ReceiptDatabase from '@models/receipts.model';

const receiptsService = {
  processReceipt,
  getPoints,
};

async function processReceipt(
  receipt: ProcessReceiptDTO
): Promise<ProcessReceiptReturn> {
  // TODO: calculate receipt points based on given rules
  const receiptPoints = 0;

  const newReceipt = ReceiptDatabase.getInstance().addNewReceipt(
    receipt,
    receiptPoints
  );

  return { id: newReceipt.id };
}

async function getPoints(receiptId: string): Promise<GetPointsReturn> {
  const receipt = ReceiptDatabase.getInstance().getReceiptById(receiptId);

  return { points: receipt.points };
}

export default receiptsService;

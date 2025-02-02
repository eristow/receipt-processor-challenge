import { Request, Response, NextFunction } from 'express';
import ReceiptsService from '@services/receipts.service';
import { Item, ProcessReceiptDTO } from 'src/types/receipts.type';

function processReceipts(req: Request, res: Response, next: NextFunction) {
  try {
    const receipt: ProcessReceiptDTO = req.body;
    const validReceipt = validateReceipt(req.body);

    if (!validReceipt) {
      res.status(400).send('The receipt is invalid.');
      return;
    }

    const receiptId = ReceiptsService.processReceipt(receipt);

    res.json(receiptId);
  } catch (err: any) {
    console.error(`Error while processing receipts: ${err}`);
    next(err);
  }
}

// Regexes from api.yaml spec
const retailerRegex = /^[\w\s\-&]+$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}$/;
const moneyRegex = /^\d+.\d{2}$/;

function validateReceipt(receipt: ProcessReceiptDTO) {
  const receiptExists = !!receipt && Object.keys(receipt).length !== 0;

  if (!receiptExists) {
    return false;
  }

  const receiptFields = [
    'retailer',
    'purchaseDate',
    'purchaseTime',
    'total',
    'items',
  ];
  const receiptHasCorrectForm = receiptFields.every((field) =>
    receipt.hasOwnProperty(field)
  );

  const retailerIsValid = retailerRegex.test(receipt.retailer);

  const purchaseDateIsValid = dateRegex.test(receipt.purchaseDate);

  const purchaseTimeIsValid = timeRegex.test(receipt.purchaseTime);

  const totalIsValid = moneyRegex.test(receipt.total);

  const itemsIsNonEmptyArray =
    Array.isArray(receipt.items) && receipt.items.length > 0;

  const itemsHaveCorrectForm = receipt.items.every((item) =>
    validateItem(item)
  );

  const validations = [
    receiptExists,
    receiptHasCorrectForm,
    retailerIsValid,
    purchaseDateIsValid,
    purchaseTimeIsValid,
    totalIsValid,
    itemsIsNonEmptyArray,
    itemsHaveCorrectForm,
  ];

  return validations.every((validation, i) => {
    console.log(`validation ${i}: ${validation === true}`);
    return validation === true;
  });
}

function validateItem(item: Item) {
  return (
    !!item &&
    item.shortDescription &&
    item.price &&
    item.price.match(moneyRegex)
  );
}

function getPoints(req: Request, res: Response, next: NextFunction) {
  try {
    const receiptId = req.params.receiptId;

    const receiptPoints = ReceiptsService.getPoints(receiptId);

    if (!receiptPoints) {
      res.status(404).send('No receipt found for that ID.');
      return;
    }

    res.json(receiptPoints);
  } catch (err: any) {
    console.error(`Error while getting points: ${err}`);
    next(err);
  }
}

async function getAllReceipts(req: Request, res: Response, next: NextFunction) {
  try {
    const allReceipts = await ReceiptsService.getAllReceipts();

    if (!allReceipts) {
      res.status(404).send('No receipts found.');
      return;
    }

    res.json(allReceipts);
  } catch (err: any) {
    console.error(`Error while getting all receipts: ${err}`);
    next(err);
  }
}

export default {
  processReceipts,
  getPoints,
  getAllReceipts,
};

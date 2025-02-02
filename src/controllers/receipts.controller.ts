import { Request, Response, NextFunction, Router } from 'express';
import ReceiptsService from '@services/receipts.service';
import { Item, ProcessReceiptDTO } from 'src/types/receipts.type';
import { retailerRegex, dateRegex, timeRegex, moneyRegex } from '@utils/regex';
import BaseController from '@controllers/controller';

export default class ReceiptsController extends BaseController {
  public path = '/receipts';
  public router = Router();

  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.post(`${this.path}/process`, this.processReceipts.bind(this));

    this.router.get(
      `${this.path}/:receiptId/points`,
      this.getPoints.bind(this)
    );

    this.router.get(`${this.path}`, this.getAllReceipts.bind(this));
  }

  private processReceipts(req: Request, res: Response, next: NextFunction) {
    try {
      const receipt: ProcessReceiptDTO = req.body;
      console.log(this.validateReceipt);
      const validReceipt = this.validateReceipt(req.body);

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

  private validateReceipt(receipt: ProcessReceiptDTO) {
    console.log('in validateReceipt');
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
      this.validateItem(item)
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

  private validateItem(item: Item) {
    return (
      !!item &&
      item.shortDescription &&
      item.price &&
      item.price.match(moneyRegex)
    );
  }

  private getPoints(req: Request, res: Response, next: NextFunction) {
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

  private getAllReceipts(req: Request, res: Response, next: NextFunction) {
    try {
      const allReceipts = ReceiptsService.getAllReceipts();

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
}

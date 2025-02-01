import { ReceiptDBEntry, ProcessReceiptDTO } from '@app_types/receipts.type';
import { v4 as uuidv4 } from 'uuid';

export default class ReceiptDatabase {
  private static _instance: ReceiptDatabase;
  private database: Record<string, ReceiptDBEntry> = {};

  private constructor() {}

  static getInstance() {
    if (!this._instance) {
      this._instance = new ReceiptDatabase();
    }

    return this._instance;
  }

  getReceiptById(id: string): ReceiptDBEntry {
    return this.database[id];
  }

  addNewReceipt(receipt: ProcessReceiptDTO, points: number): ReceiptDBEntry {
    const receiptEntry: ReceiptDBEntry = {
      ...receipt,
      points,
      id: uuidv4(),
    };

    this.database[receiptEntry.id] = receiptEntry;

    return receiptEntry;
  }
}

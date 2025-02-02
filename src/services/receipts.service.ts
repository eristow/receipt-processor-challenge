import {
  GetPointsReturn,
  ProcessReceiptDTO,
  ProcessReceiptReturn,
  ReceiptDBEntry,
} from '@app_types/receipts.type';
import ReceiptDatabase from '@models/receipts.model';

function processReceipt(
  receipt: ProcessReceiptDTO
): ProcessReceiptReturn | null {
  const totalCents = Number(receipt.total) * 100;
  let receiptPoints = 0;

  // Regex: replace all non-alphanumeric chars with ""
  const retailerNameClean = receipt.retailer.replace(/[^0-9a-zA-Z]/g, '');
  const retailerNamePoints = retailerNameClean.length;
  console.log(`retailerNamePoints: ${retailerNamePoints}`);

  const totalNoCents = totalCents % 10 === 0;
  const totalNoCentsPoints = totalNoCents ? 50 : 0;
  console.log(`totalNoCentsPoints: ${totalNoCentsPoints}`);

  const multipleOf25 = totalCents % 25 === 0;
  const multipleOf25Points = multipleOf25 ? 25 : 0;
  console.log(`multipleOf25Points: ${multipleOf25Points}`);

  const everyTwoItems = Math.floor(receipt.items.length / 2);
  const everyTwoItemsPoints = everyTwoItems * 5;
  console.log(`everyTwoItemsPoints: ${everyTwoItemsPoints}`);

  let itemDescPoints = 0;

  receipt.items.forEach((item) => {
    const trimmedDescLength = item.shortDescription.trim().length;
    const adjustedItemPrice = Math.ceil(Number(item.price) * 0.2);
    // console.log(`adjustedItemPrice: ${adjustedItemPrice}`);

    const itemPoints = trimmedDescLength % 3 === 0 ? adjustedItemPrice : 0;

    itemDescPoints += itemPoints;
  });

  console.log(`itemDescPoints: ${itemDescPoints}`);

  const oddPurchaseDate = new Date(receipt.purchaseDate).getUTCDate() % 2 != 0;
  console.log(
    `oddPurchaseDate: ${new Date(receipt.purchaseDate).toUTCString()}`
  );

  const oddPurchaseDatePoints = oddPurchaseDate ? 6 : 0;
  console.log(`oddPurchaseDatePoints: ${oddPurchaseDatePoints}`);

  const purchaseTime2To4 = isTimeWithinRange(
    '14:00',
    '16:00',
    receipt.purchaseTime
  );
  const purchaseTime2To4Points = purchaseTime2To4 ? 10 : 0;
  console.log(`purchaseTime2To4Points: ${purchaseTime2To4Points}`);

  const pointsToAdd = [
    retailerNamePoints,
    totalNoCentsPoints,
    multipleOf25Points,
    everyTwoItemsPoints,
    itemDescPoints,
    oddPurchaseDatePoints,
    purchaseTime2To4Points,
  ];

  receiptPoints += pointsToAdd.reduce((sum, current) => sum + current, 0);

  console.log(`receiptPoints: ${receiptPoints}`);

  const newReceipt = ReceiptDatabase.getInstance().addNewReceipt(
    receipt,
    receiptPoints
  );

  if (!newReceipt) {
    return null;
  }

  return { id: newReceipt.id };
}

function isTimeWithinRange(
  startTime: string,
  endTime: string,
  checkTime: string
): boolean {
  // Hard-coded date is irrelevant
  const startDate = new Date(`01/31/2025 ${startTime}`);
  const endDate = new Date(`01/31/2025 ${endTime}`);
  const checkDate = new Date(`01/31/2025 ${checkTime}`);

  return checkDate > startDate && checkDate < endDate;
}

function getPoints(receiptId: string): GetPointsReturn | null {
  const receipt = ReceiptDatabase.getInstance().getReceiptById(receiptId);

  if (!receipt) {
    return null;
  }

  return { points: receipt.points };
}

function getAllReceipts(): ReceiptDBEntry[] | null {
  const allReceipts = ReceiptDatabase.getInstance().getAllReceipts();

  if (!allReceipts) {
    return null;
  }

  return allReceipts;
}

export default {
  processReceipt,
  getPoints,
  getAllReceipts,
};

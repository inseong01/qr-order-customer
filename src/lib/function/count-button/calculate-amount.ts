export default function calculateAmount(quantity: number, num: number) {
  const currentAmount = quantity;
  const receivedAmount = num;
  const totalAmount = currentAmount + receivedAmount;
  const limitedAmount = Math.max(1, totalAmount);

  return limitedAmount;
}

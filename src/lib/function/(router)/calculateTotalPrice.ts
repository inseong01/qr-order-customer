export function calculateTotalPrice<
  T extends { menu_price: number; quantity: number },
>(prev: number, current: T) {
  return prev + current.menu_price * current.quantity;
}

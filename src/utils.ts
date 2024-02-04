import { GAMES } from "./data";

export function getGamesFromServer() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(GAMES);
    }, 1000);
  });
}

export function priceWithCurrency(price: number) {
  return `${price} Руб.`;
}

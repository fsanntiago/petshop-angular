import { Cart } from "../models/car.models";
import { CartItem } from "../models/cart-item.model";

export class CartUtil {
  public static get(): Cart {
    // Recupera os dados do LocalStorage
    const data = localStorage.getItem("petchopcart");

    // Caso nao haja dados, returna um novo carrinho
    if (!data) {
      return new Cart();
    }

    // Caso haja dados, retorna o carrinho
    return JSON.parse(data);
  }

  public static add(
    id: string,
    product: string,
    quantity: number,
    price: number,
    image: string
  ) {
    // Obtem o carrinho
    let cart = this.get();

    // Gera o novo item
    const item = new CartItem(id, product, quantity, price, image);

    // Adiciona ao carrinho
    const hasItem = cart.items.find((cartitem) => item.id == cartitem.id);

    if (hasItem) {
      hasItem.quantity += 1;
    } else {
      cart.items.push(item);
    }

    // Salva no localStorage
    localStorage.setItem("petchopcart", JSON.stringify(cart));
  }

  public static update(cart: Cart) {
    localStorage.setItem("petchopcart", JSON.stringify(cart));
  }

  public static clear() {
    localStorage.removeItem("petchopcart");
  }
}

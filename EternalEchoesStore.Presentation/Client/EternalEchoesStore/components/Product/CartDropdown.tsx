import React from "react";

interface CartItem {
    id: number;
    productName: string;
    quantity: number;
    price: number;
}

interface CartDropdownProps {
    items: CartItem[];
    onClose: () => void;
}

const CartDropdown: React.FC<CartDropdownProps> = ({ items, onClose }) => {
    return (
        <div
            className={`absolute right-0 top-full mt-2 w-80 bg-white p-4 shadow-md dark:bg-gray-800 transition-all duration-300 transform ${
                items.length ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"
            }`}
        >
            <p className="text-gray-700 dark:text-gray-300">
                {items.length ? "Ваши товары в корзине:" : "Корзина пуста"}
            </p>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center py-2 border-b dark:border-gray-700"
                    >
                        <span>{item.productName}</span>
                        <span>{item.quantity} x {item.price.toFixed(2)}₽</span>
                        <span>{(item.quantity * item.price).toFixed(2)}₽</span>
                    </li>
                ))}
            </ul>
            <button
                className="mt-4 bg-primary text-white px-4 py-2 rounded shadow-md hover:bg-primary-dark"
                onClick={onClose}
            >
                Закрыть
            </button>
        </div>
    );
};

export default CartDropdown;

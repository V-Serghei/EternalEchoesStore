import React, { useState } from "react";
import CartDropdown from "./CartDropdown";

interface CartItem {
    id: number;
    productName: string;
    quantity: number;
    price: number;
}

interface CartProps {
    cartItems: CartItem[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
    const [cartOpen, setCartOpen] = useState(false);

    const handleMouseEnter = () => setCartOpen(true);
    const handleMouseLeave = () => setCartOpen(false);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button className="text-primary font-medium">Basket 🛒</button>
            {cartOpen && <CartDropdown items={cartItems} onClose={() => setCartOpen(false)} />}
        </div>
    );
};

export default Cart;

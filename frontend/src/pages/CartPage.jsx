import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="bg-blue-100 text-blue-700 p-4 rounded">
            Your cart is empty <Link to="/" className="font-bold underline">Go Back</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                <Link to={`/product/${item._id}`} className="flex-1 ml-4 font-semibold text-indigo-600 hover:underline">{item.title}</Link>
                <div className="w-20 font-bold">${item.price}</div>
                <select 
                  className="border rounded p-1 mx-4"
                  value={item.qty} 
                  onChange={(e) => dispatch(addToCart({...item, qty: Number(e.target.value)}))}
                >
                  {[...Array(item.stock).keys()].map(x => (
                    <option key={x+1} value={x+1}>{x+1}</option>
                  ))}
                </select>
                <button onClick={() => removeFromCartHandler(item._id)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white p-6 rounded shadow h-fit">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
        </h2>
        <div className="text-2xl font-bold mb-6">
          ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
        </div>
        <button 
          type="button" 
          disabled={cartItems.length === 0} 
          onClick={checkoutHandler}
          className="w-full bg-indigo-600 text-white py-3 rounded font-bold hover:bg-indigo-700 disabled:opacity-50"
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};
export default CartPage;
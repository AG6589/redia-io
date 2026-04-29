const fs = require('fs');
const path = require('path');

const files = {
  'frontend/src/pages/admin/ProductEditPage.jsx': `import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '../../slices/productsApiSlice';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setStock(product.stock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        title,
        price,
        image,
        brand,
        category,
        stock,
        description,
      }).unwrap();
      toast.success('Product updated');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/admin/products" className="text-slate-500 hover:text-indigo-600 mb-6 inline-block">
        Go Back
      </Link>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit Product</h1>
        {loadingUpdate && <div className="text-indigo-600 mb-4">Updating...</div>}
        {isLoading ? (
          <div className="text-slate-500">Loading...</div>
        ) : error ? (
          <div className="text-rose-500">{error?.data?.message || error.error}</div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Stock</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Image URL</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Brand</label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">
              Update Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default ProductEditPage;`,

  'frontend/src/pages/OrderDetailsPage.jsx': `import { useParams } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { useSelector } from 'react-redux';
import { CheckCircle, XCircle, CreditCard, Truck } from 'lucide-react';

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);

  if (isLoading) return <div className="text-center p-8 text-slate-500">Loading Order Details...</div>;
  if (error) return <div className="text-center p-8 text-rose-500">{error?.data?.message || error.error}</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Order #{order._id}</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <Truck className="text-indigo-600" /> Shipping
            </h2>
            <p className="mb-2"><strong className="text-slate-800">Name:</strong> {order.user.name}</p>
            <p className="mb-2"><strong className="text-slate-800">Email:</strong> {order.user.email}</p>
            <p className="mb-4"><strong className="text-slate-800">Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            {order.isDelivered ? (
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg flex items-center gap-2 font-medium">
                <CheckCircle size={18}/> Delivered on {order.deliveredAt.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-rose-50 text-rose-600 p-3 rounded-lg flex items-center gap-2 font-medium">
                <XCircle size={18}/> Not Delivered
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <CreditCard className="text-indigo-600" /> Payment
            </h2>
            <p className="mb-4"><strong className="text-slate-800">Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="bg-emerald-50 text-emerald-600 p-3 rounded-lg flex items-center gap-2 font-medium">
                <CheckCircle size={18}/> Paid on {order.paidAt.substring(0, 10)}
              </div>
            ) : (
              <div className="bg-rose-50 text-rose-600 p-3 rounded-lg flex items-center gap-2 font-medium">
                <XCircle size={18}/> Not Paid
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">Order Items</h2>
            <ul className="space-y-4">
              {order.orderItems.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-xl p-2"><img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" /></div>
                  <div className="flex-1 font-semibold text-slate-800">{item.title}</div>
                  <div className="font-medium text-slate-600">{item.qty} x \${item.price} = <span className="font-bold text-slate-900">\${(item.qty * item.price).toFixed(2)}</span></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 h-fit sticky top-24">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-slate-600"><span>Items</span><span className="font-medium">\${order.itemsPrice}</span></div>
            <div className="flex justify-between text-slate-600"><span>Shipping</span><span className="font-medium">\${order.shippingPrice}</span></div>
            <div className="flex justify-between text-slate-600"><span>Tax</span><span className="font-medium">\${order.taxPrice}</span></div>
            <div className="h-px bg-slate-100 my-2"></div>
            <div className="flex justify-between text-lg font-black text-slate-900"><span>Total</span><span>\${order.totalPrice}</span></div>
          </div>
          {!order.isPaid && (
            <div className="bg-slate-50 p-4 rounded-xl text-center font-medium text-slate-500 border border-slate-200">
              Payment Gateway placeholder
            </div>
          )}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
             <button className="w-full mt-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-colors">
               Mark as Delivered
             </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderDetailsPage;`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}
console.log('Missing pages generated.');

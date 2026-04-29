import { Link } from 'react-router-dom';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { Edit, Trash, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductList = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery({ keyword: '', pageNumber: 1 });
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        toast.success('Product created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h1 className="text-2xl font-bold text-slate-900">Manage Products</h1>
        <button onClick={createProductHandler} disabled={loadingCreate} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50">
          <Plus size={18} /> {loadingCreate ? 'Creating...' : 'Create Product'}
        </button>
      </div>

      {loadingDelete && <div className="p-4 text-center text-rose-500">Deleting...</div>}
      {isLoading ? (
        <div className="p-8 text-center text-slate-500">Loading products...</div>
      ) : error ? (
        <div className="p-8 text-rose-500">{error?.data?.message || error.error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">NAME</th>
                <th className="p-4 font-semibold">PRICE</th>
                <th className="p-4 font-semibold">CATEGORY</th>
                <th className="p-4 font-semibold">BRAND</th>
                <th className="p-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {data.products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-400">{product._id}</td>
                  <td className="p-4 font-medium">{product.title}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.brand}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <Link to={`/admin/product/${product._id}/edit`} className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors">
                      <Edit size={16} />
                    </Link>
                    <button onClick={() => deleteHandler(product._id)} className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors">
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default ProductList;
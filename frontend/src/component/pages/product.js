import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from 'react';
import { deleteProduct, getAllProduct } from '../redux/action/actionReducer';
import { Link } from 'react-router-dom';
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDotsVertical, BsPencil, BsPencilFill, BsTrash, BsTrashFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Product = () => {
    let { products, message, refresh} = useSelector(
        (state) => state.productReducer
    )
    console.log(products)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const goToEdit = (item) => {
      navigate(`/edit-product/${item.id}`, {
        state: {
          products: item,
        },
      });
    };

    const hapusProduct = (id) => {
      dispatch(deleteProduct(id))
    }

    useEffect(() =>{
        dispatch(getAllProduct())
    }, [refresh])

    return (
    <div>
        <div>
      <div className="grid col-1 relative bg-white shadow-sm border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2lg font-bold leading-6 test-gray-900 sm:truncate uppercase">
            Produk Shop TERBAIK Nih ya
          </h1>
        </div>
        <div className="mt-4 flex sm:mt-0 sm:ml-4">
          <Link to = "/create-product"
            type="button"
            className="order-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md bg-purple-500 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1"
          >
            Create
          </Link>
        </div>
      </div>
      </div>
      

        List Product CARAVAN SHOP
        <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div>
                <div key={product.id} className="group relative">
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={`http://localhost:5000/uploads/${product.image_character
                }`}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            </div>
            <button onClick={()=>goToEdit(product)}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
            <br/>
            <button onClick={()=>hapusProduct(product.id)}
             class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
            </div>
            
            
          ))}
        </div>
      </div>
    </div>
    </div>
     );
}
 
export default Product;
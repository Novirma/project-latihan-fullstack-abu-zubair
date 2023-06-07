import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../redux/action/actionReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";


const EditProduct = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const navigate = useNavigate()
    const [productById, setProductById] = useState(location.state?.products)
    const { register, handleSubmit, formState: {errors}} = useForm();

    const handleRegistration = async(data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category_id", data.category_id);
        formData.append("price", data.price);
        formData.append("gambar", data.gambar[0]);
        formData.append("id",productById.id)

        const idProduct = productById.id
        dispatch(updateProduct(formData,idProduct));
        // await axios.patch(`/dto-product/${productById.id}`,formData,{
        //     headers:{
        //     "content-type":"multipart/form-data"
        // }})
        // console.log(Array.from(formData.entries()));
        // const status = result.data.status;
        // const statustext = result.data.message;
        // const namaProd = result.data.result.name
        // console.log(status);
        // console.log(statustext)

        // dispatch(createProduct(data))
        navigate("/product")
        // // setPesan(result.data.message)
        console.log(...formData);
    }
// console.log(productById)
    const registerOptions = {
        name: { required: "Name is required"},
        description: { required: "Description is required"},
        category_id: { required: "Category is required"},
        price: { required: "Price is required"},
        gambar: { required: "Gambar is required"}
        
    }

    return(
        <div>
          <form onSubmit={handleSubmit(handleRegistration)}>
                      <div className="max-w-xl bg-white py-6 px-3 m-auto">
                        <div className="grid grid-cols-1 gap-4 max-w-xl m-auto">

                          <div className="col-span-1 space-x-4">
                            <label class="block">
                              <span
                                class="after:content-['*'] after:ml-0.5 after:text-red-500 block 
                              text-sm font-medium text-slate-700"
                              >
                                Name
                              </span>
                              <input
                              defaultValue={productById.name}
                                type="text"
                                name="name"
                                {...register(
                                  "name",
                                  registerOptions.name
                                )}
                                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300
                                 placeholder-slate-400 focus:outline-none focus:border-sky-500
                                  focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                placeholder="Name"
                              />
                            </label>
                            {errors?.name && errors.name.message}
                          </div>

                          <div className="col-span-1 space-x-4">
                            <label class="block">
                              <span
                                class="after:content-['*'] after:ml-0.5 after:text-red-500 block 
                              text-sm font-medium text-slate-700"
                              >
                                Description
                              </span>
                              <input
                                defaultValue={productById.description}
                                type="text"
                                name="description"
                                {...register(
                                  "description",
                                  registerOptions.description
                                )}
                                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300
                                 placeholder-slate-400 focus:outline-none focus:border-sky-500
                                  focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                placeholder="Description"
                              />
                            </label>
                            {errors?.description && errors.description.message}
                          </div>

                          <div className="col-span-1 space-x-4">
                            <label class="block">
                              <span
                                class="after:content-['*'] after:ml-0.5 after:text-red-500 block 
                              text-sm font-medium text-slate-700"
                              >
                                Category
                              </span>
                              <input
                                defaultValue={productById.category_id}
                                type="number"
                                name="category_id"
                                {...register(
                                  "category_id",
                                  registerOptions.category_id
                                )}
                                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300
                                 placeholder-slate-400 focus:outline-none focus:border-sky-500
                                  focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                placeholder="Category"
                              />
                            </label>
                            {errors?.category_id && errors.category_id.message}
                          </div>

                          <div className="col-span-1 space-x-4">
                            <label class="block">
                              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Price
                              </span>
                              <input
                                defaultValue={productById.price}
                                type="number"
                                name="price"
                                {...register(
                                  "price",
                                  registerOptions.price
                                )}
                                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                placeholder="Price"
                              />
                            </label>
                            {errors?.price && errors.price.message}
                          </div>

                          <div className="col-span-1 space-x-4">
                            <label class="block">
                              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                Gambar
                              </span>
                              <input
                                type="file"
                                name="gambar"
                                {...register(
                                  "gambar",
                                  registerOptions.gambar
                                )}
                                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                placeholder="Gambar"
                              />
                            </label>
                            {errors?.gambar && errors.gambar.message}
                          </div>


                        </div>
                      </div>
                      <div className="flex-row space-x-4 mt-4 text rigt">
                        <button
                          class="inline-flex justify-center rounded-md border border-transparent
                        bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 
                         focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-500 
                         focus-visible:ring-offset-2"
                        >
                          Submit
                        </button>

                        <Link to = "/product"
                          class="inline-flex justify-center rounded-md border border-transparent
                        bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 
                        focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-500 
                        focus-visible:ring-offset-2"
                          
                        >
                          Cancel
                        </Link>
                      </div>
                    </form>
        </div>
    )

}

export default EditProduct
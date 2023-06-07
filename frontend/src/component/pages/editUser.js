// import React,{Fragment, useEffect,useState} from "react";
// import {Transition, Dialog} from "@headlessui/react"
// import { useForm } from 'react-hook-form'
// import apiMethod from "../api/apiMethod";
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { editUserCustomer } from "../redux/action/actionReducer";
// import { Link } from 'react-router-dom';


// const EditUser = (props) => {
//   // console.log(props.userById)
//     let {user, message, refresh } = useSelector(state=>state.userReducer)
//     const { register, handleSubmit, reset, formState: {errors}} = useForm();
//     const params = useParams();
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const location = useLocation()
//     const[userById,setUserById] = useState(location.state?.users)

//     const handleRegistration = async(dataBody) => {
//         dataBody.id = userById.id
//         dispatch(editUserCustomer(dataBody))
//         navigate("/user")
//     }
//     // console.log(user)

//     useEffect(() => {
//       let defaultValue = {};
//       defaultValue.username = userById.username;
//       // defaultValue.password = userById.password;
//       defaultValue.firstname = userById.firstname;
//       defaultValue.lastname = userById.lastname;
//       reset({ ...defaultValue})


//     }, [])
//     console.log(userById)
//     const registerOptions = {
//         name: { required: "Name is required" },
//         email: { required: "Email is required" },
//         password: {
//           required: "Password is required",
//           minLength: {
//             value: 8,
//             message: "Password must have at least 8 characters"
//           }
//         },
//             firstname: { required: "Firstname is required" },
//             lastname: { required: "Lastname is required" },
//       };
//     return(
//         <>
//          <form onSubmit={handleSubmit(handleRegistration)}>
//                       <div className="max-w-xl bg-white py-6 px-3 m-auto">
//                         <div className="grid grid-cols-1 gap-4 max-w-xl m-auto">

//                           <div className="col-span-1 space-x-4">
//                             <label class="block">
//                               <span
//                                 class="after:content-['*'] after:ml-0.5 after:text-red-500 block 
//                               text-sm font-medium text-slate-700"
//                               >
//                                 Username
//                               </span>
//                               <input
//                               defaultValue={userById.username}
//                                 type="text"
//                                 name="username"
//                                 {...register(
//                                   "username",
//                                   registerOptions.username
//                                 )}
//                                 class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300
//                                  placeholder-slate-400 focus:outline-none focus:border-sky-500
//                                   focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
//                                 placeholder="Username"
//                               />
//                             </label>
//                             {errors?.username && errors.username.message}
//                           </div>

//                           <div className="col-span-1 space-x-4">
//                             <label class="block">
//                               <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
//                                 Password
//                               </span>
//                               <input
//                               // defaultValue={userById?.password}
//                                 type="password"
//                                 name="password"
//                                 {...register(
//                                   "password",
//                                   registerOptions.password
//                                 )}
//                                 class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
//                                 placeholder="Password"
//                               />
//                             </label>
//                             {errors?.password && errors.password.message}
//                           </div>

//                           <div className="col-span-1 space-x-4">
//                             <label class="block">
//                               <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
//                                 First Name
//                               </span>
//                               <input
//                               defaultValue={userById.firstname}
//                                 type="text"
//                                 name="firstname"
//                                 {...register(
//                                   "firstname",
//                                   registerOptions.firstname
//                                 )}
//                                 class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
//                                 placeholder="First Name"
//                               />
//                             </label>
//                             {errors?.firstname && errors.firstname.message}
//                           </div>

//                           <div className="col-span-1 space-x-4">
//                             <label class="block">
//                               <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
//                                 Last Name
//                               </span>
//                               <input
//                                 defaultValue={userById.lastname}
//                                 type="text"
//                                 name="lastname"
//                                 {...register(
//                                   "lastname",
//                                   registerOptions.lastname
//                                 )}
//                                 class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
//                                 placeholder="Last Name"
//                               />
//                             </label>
//                             {errors?.lastname && errors.lastname.message}
//                           </div>

//                         </div>
//                       </div>
//                       <div className="flex-row space-x-4 mt-4 text rigt">
//                         <button
//                           class="inline-flex justify-center rounded-md border border-transparent
//                         bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 
//                          focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-500 
//                          focus-visible:ring-offset-2"
//                         >
//                           Submit
//                         </button>

//                         <Link to = "/user"
//                           class="inline-flex justify-center rounded-md border border-transparent
//                         bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-blue-200 
//                         focus:outline-none focus-visible:ring-2  focus-visible:ring-blue-500 
//                         focus-visible:ring-offset-2"
//                         >
//                           Cancel
//                         </Link>
//                       </div>
//                     </form>
//         </>
        
           
//     )
// }

// export default EditUser

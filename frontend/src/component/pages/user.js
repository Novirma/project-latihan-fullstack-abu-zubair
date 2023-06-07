import React, { useEffect, useState, Fragment } from 'react';
import apiMethod from '../api/apiMethod';
import Content from './content';
import { Menu, Transition } from "@headlessui/react";
import { BsThreeDotsVertical, BsPencil, BsPencilFill, BsTrash, BsTrashFill } from "react-icons/bs"
import AddUser from './addUser';
import EditUser from './editUser';
import ConfirmDelete from './confirmDelete';
import { useDispatch, useSelector } from 'react-redux';
import { doRequestGetUser, getAll } from '../redux/action/actionReducer';
import { Link, useNavigate } from 'react-router-dom';


const User = () => {
    let {user, message, refresh } = useSelector(state=>state.userReducers)
    console.log(user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const[user,setUser] = useState('')
    const[userById,setUserById] = useState('')
    const[isOpen,setIsOpen] = useState(false)
    const[isEdit,setIsEdit] = useState(false)
    const[isHapus,setIsHapus] = useState(false)
    const[whatToDelete,setWhatToDelete] = useState('')

    const columns = [
        {name: '#No'},
        {name : 'username'},
        {name: 'firstname'},
        {name: 'lastname'},
        {name: 'Aksi'},
    ]


    // const GetById=async(id)=>{
    //     const result = await apiMethod.GetById(id)
    //     // console.log(result);
    //     setUserById(result.data[0])
    //     setIsEdit(true)
    // }

    const goToEdit = (item) => {
      navigate(`/edit-user/${item.id}`, {
        state: {
          users: item,
        },
      });
    };

    // const DeleteById=async(dataBody)=>{
    //   setWhatToDelete(dataBody)
    //   setIsHapus(true)
    // }

    useEffect(()=>{
        // dispatch(getAll())
        dispatch(doRequestGetUser())

        // if (message) {
        //   setTimeout(()=>{
        //     if(status === 400){
        //       toast.error(message)
        //     }else{
        //       toast.success(message)
        //     }
        //   },30)
        // }
    },[refresh, isOpen])
    console.log(user);
    return (
        <div>
        <Content title="users" isOpen={()=>{setIsOpen(true)}}>
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="border-t border-gray-200">
                {
                (columns || []).map((col) => 
                  <th
                    className="pr-6 py-2 text-left border-b border-gray-200 bg-green-200 
                    text-xs font-medium text-gray-500 uppercase tracking-winder"
                  >
                    <span className="">{col.name}</span>
                  </th>
                )
                }
              </tr>
            </thead>
            <tbody className="bg-white divide-y-8 divide-gray-100">
              {
                  (user || []).map((dt,index) =>
                  <tr key={dt.id}>
                      <td className="py-3 text-gray-900">{index+1}</td>
                      <td className="py-3 text-gray-900">{dt.username}</td>
                      <td className="py-3 text-gray-900">{dt.firstname}</td>
                      <td className="py-3 text-gray-900">{dt.lastname}</td>
                      <td className="py-3 text-gray-900">
  
                      <div className="w-full">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-red-500 
            bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white 
            focus-visible:ring-opacity-75">
              <BsThreeDotsVertical
                className="h-5 w-5 text-black hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button onClick={()=>goToEdit(dt)}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <BsPencilFill
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <BsPencil
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button onClick={()=>{setIsHapus(dt)}}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <BsTrashFill
                          className="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <BsTrash
                          className="mr-2 h-5 w-5 text-violet-400"
                          aria-hidden="true"
                        />
                      )}
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
                      </td>
                  </tr>
                  )
              }
            </tbody>
          </table>
        </Content>
        
        {
          isOpen ? (
          <AddUser show={isOpen} closeModal={() => setIsOpen(false)} />
        ) : (
          ''
        )
        }
        {/* Ternari Operator */}
        {
            isEdit ? (
                <EditUser show={isEdit} userById={userById} closeModal={() => setIsEdit(false)} />
              ) : ('')
        }
        {
            isHapus ? (
              <ConfirmDelete show={isHapus} table="User" name={whatToDelete.username} id={whatToDelete.id} closeModal={() => setIsHapus(false)}  />
            ) : ('')
        }

        </div>
    );
  };
     
 
export default User;
import axios from "../config/endpoint"

const findAll=()=>{
    return axios.get("/dto-user/users-customers-views")
}

const create=(data)=>{
    return axios.post("/dto-user",data)
}

const GetById=(id)=>{
    return axios.get(`/dto-user/${id}`)
}

const updateUserCustomerById=(dataBody)=>{
    return axios.patch(`/dto-user/updateUser/${dataBody.id}`,dataBody)
}

const deleteUserById=(id)=>{
    return axios.delete(`/dto-user/${id}`)
}

//Product Controller

const getAllProduct=()=>{
    return axios.get("/dto-product")
}

const insertProduct = (data) =>{
    return axios.post("/dto-product/create",data,{headers:{
        "Content-Type":"multipart/form-data"
    }})
}

const getProductById = (id)=>{
    return axios.get(`/dto-product/${id}`)
}

const updateProduct = (data,id) =>{
    return axios.patch(`/dto-product/${id}`,data,{
        headers:{
        "content-type":"multipart/form-data"
    }})
}

const deleteProduct = (id) => {
    return axios.delete(`/dto-product/${id}`)
}

export default{
    findAll,
    create,
    GetById,
    updateUserCustomerById,
    deleteUserById,
    getAllProduct,
    insertProduct,
    getProductById,
    updateProduct,
    deleteProduct
}
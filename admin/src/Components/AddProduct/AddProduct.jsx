import React, { useState } from 'react'
import './AddProduct.css'
import Upload_image from '../../assets/upload_img.png'

const AddProduct = () => {
// logic for Image display on the admin panel

const [image,setImage] = useState(false);   

const [productDetails,setproductDetails] = useState({   // logic for adding products details into the database
  name:"",
  image:"",
  category:"women",
  new_price:"",
  old_price:""
})

const imageHandler = (e) =>{        //logic for image display on the admin panel
setImage(e.target.files[0]);
}                                   

const changeHandler = (e)=>{      //logic for updating the data on the database, with the help of event handler we are updating the details
  setproductDetails({...productDetails,[e.target.name]:e.target.value}
  )}

 const Add_Product = async()=>{   //created a function for ADD product button using this function we will check our changeHandler function
  console.log(productDetails);
  
  
  let responseData;                   // logic for converting image into image url that can be stored in the database
  let product = productDetails;


  let formData =  new FormData();
  formData.append('product',image);

  await fetch('http://localhost:4000/upload',{
    method:'POST',
    headers:{
      Accept:'application/json',
    },
    body:formData,
  }).then((resp)=>resp.json()).then((data)=>{responseData=data})

  if (responseData.success){
    product.image = responseData.image_url;
    console.log(product);
    await fetch('http://localhost:4000/addproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(product),
    }).then((resp)=>resp.json()).then((data)=>{
      data.success?alert("Product Added Successfully"):alert("Failed")
    })
  }
 }
  
  return (
 <div className="add-product">
<div className="addproduct-itemfield">
  <p>Product Title</p>
  <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />   {/* with the help of changeHandler function we are updating the name of the product */}
 
</div>
<div className="addproduct-price">
  <div className="addproduct-itemfield">
    <p>Price</p>
    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />  {/*with the help of changeHandler function we are updating the old price of the product*/}
  </div>
  <div className="addproduct-itemfield">
    <p>Offer Price</p>
    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' /> {/* with the hellp of changeHandler function we are updating the new_price of the product*/}
  </div>
  </div>
  <div className="addproduct-itemfield">
    <p> Prodcut Category</p>
    <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'> {/* with the help of changehandler function we are updating  the category of the product.*/}                     
      <option value="women">Women</option>
      <option value="men">Men</option>
      <option value="kid">Kid</option>

    </select>
  </div>

  <div className="addproduct-itemfield">
    <label htmlFor="file-input">
      <img src={image?URL.createObjectURL(image):Upload_image}  className='addproduct-thumbnail-img'  alt="" />  {/*logic for uploaded image display is used here as well*/}
    </label>

<input onChange={imageHandler}  type="file" name='image' id='file-input'  hidden />    {/*logic for uploaded image display is used here as well*/}

  </div>
<button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>   {/*with the help of Add product function our onClick is working properly*/}
 </div>
  )
}


export default AddProduct
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { current } from "../../JS/actions/user";
import Agencys from "../Agencys";
import "./Modal.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { addPost } from "../../JS/actions/post";


const AccountModal = ({ isShowing, toggle }) => {
  const [agencyToggle, setAgencyToggle] = useState(false);
  const [file, setFile] = useState(null);
  const [url,setUrl] = useState("")
  const [uploadError, setUploadError] = useState(null);

  const location = useLocation();

  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.isLoad);

  const [post, setPost] = useState({
    name: "",
    phoneNumber: "",
    typeOfGood: "",
    address: "",
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, [dispatch]);
  const uploadImage = async () => {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "assil elabed"); // Assuming preset name is correct

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmv4km71s/upload",
        form
      )
    .then(result=>{setUrl(result.data.secure_url)})
      const updatedUser = {
        ...user,
        profilePicture: response.data.secure_url,
      };
     // dispatch(updateUser(updatedUser));
    // export const updateUser = (updatedUser) => ({
      //type: "UPDATE_USER",
      //payload: updatedUser,
    //});
      setUploadError(null);
    } catch (error) {
      console.error("Image upload error:", error);
      setUploadError("Failed to upload image. Please try again.");
    }
  };
  const domainOfGoodsOptions = [
    "Cash",
    "Checks",
    "Credit cards",
  ];
  function renderDomainOptions() {
    return domainOfGoodsOptions.map((domain) => (
      <option key={domain} value={domain}>{domain}</option>
    ));
  }

  return (
    isShowing &&
    ReactDOM.createPortal(
      <React.Fragment>
    <div
 className="modal-overlay-custom" />        
 <div          
 className="modal-wrapper-custom form"            
 aria-modal          
 aria-hidden          
 tabIndex={-1}          
 role="dialog"
         >          
 <div 
 className="modal-custom">            
 <div 
 className="modal-header-custom">              
 <div 
 className="title" >My Account</div>             
 <button               
 type="button"                
 className="modal-close-button-custom"               
 data-dismiss="modal-custom"                
 aria-label="Close"                
 onClick={toggle}
               >               
 <span
 aria-hidden="true">&times;</span>              
 </button>
             
 </div>
 
             {loadUser ? (
 <div className="text-center">
 <h3 className="mb-4">Loading...</h3>
 <div className="spinner-border text-primary" role="status">
   <span className="sr-only">Loading...</span>
 </div>
</div>
             ) : user ? (
               <div className="container mb-3">
                 <div className="row justify-content-start text-left">
                 <img
            src={url}
            alt=" Picture"
          />
          {uploadError && <div className="alert alert-danger mt-3" role="alert">
            {uploadError}
          </div>}
          <div className="d-flex justify-content-center">
            <input
              type="file"
              className="form-control form-control-lg"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button  className="btn btn-primary btn-lg ms-3" onClick={uploadImage}>Upload!</button>
          </div>

          <div className="col-md-6">
 
     
        <label htmlFor="Name">Name : </label>
        <input type="text" id="name" value={user.name || ""} onChange={(e) => handleChange(e.target.value)} className="form-control" />
      
        <label htmlFor="Phonenumber">Phone Number:</label>
        <input type="tel" value={user.phoneNumber || ""} onChange={(e) => handleChange(e.target.value)} className="form-control" />
      
      <label>Payment Method:</label>
      <div className="d-flex align-items-center">

    <select value={user.domainOfGoods || ""} onChange={(e) => handleChange(e.target.value)}>
      {renderDomainOptions()}
    </select>
  </div>

 

        <label htmlFor="Address">Address :</label>
        <input type="text" value={user.address || ""} onChange={(e) => handleChange(e.target.value)} className="form-control"/>
    
</div>

                   <button>Save</button>
                 </div>
                 {user.role === "business" ? (
                   <div>
 
                     
 <button
  
 onClick={() => setAgencyToggle(true)}>Agency</button>
 
                   
 </div>
                 ) : null}
                 <div>
                   {agencyToggle ? (
                     <Agencys
 
                       
 toggle={toggle}
 
                       
 setAgencyToggle={setAgencyToggle}
 
                       
 agencyToggle={agencyToggle}
                     />
                   ) : null}
                 </div>
 
               
 </div>
             ) : null}
           </div>
 
         
 </div>
 
       
      </React.Fragment>,
      document.body
    )
  );
};

export default AccountModal;

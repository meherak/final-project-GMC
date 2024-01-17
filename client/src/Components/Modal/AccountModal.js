import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { current } from "../../JS/actions/user";
import Agencys from "../Agencys";
import "./Modal.css";
import axios from "axios";


const AccountModal = ({ isShowing, toggle }) => {
  const [agencyToggle, setAgencyToggle] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

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
      );
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
    "Clothing",
    "Electronics",
    "Books",
    "Home and Kitchen",
    "Beauty and Personal Care",
    "Toys and Games",
    "Sports and Outdoors",
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
               <h3>Loading...</h3>
             ) : user ? (
               <div className="modal-body">
                 <div className="account-info">
                 <img
            src={user.profilePicture || "placeholder.png"}
            alt="Profile Picture"
          />
          {uploadError && <p className="error">{uploadError}</p>}
          <div>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button onClick={uploadImage}>Upload!</button>
          </div>
          <div className="info">
  <table>
    <tbody>
      <tr>
        <td>Name:</td>
        <td><input type="text" value={user.name || ""} onChange={(e) => handleChange(e.target.value)} /></td>
      </tr>
      <tr>
        <td>Phone Number:</td>
        <td><input type="tel" value={user.phoneNumber || ""} onChange={(e) => handleChange(e.target.value)} /></td>
      </tr>
      <tr>
      <td>Domain of Goods:</td>
  <td>
    <select value={user.domainOfGoods || ""} onChange={(e) => handleChange(e.target.value)}>
      {renderDomainOptions()}
    </select>
  </td>
      </tr>
      <tr>
        <td>Address:</td>
        <td><textarea value={user.address || ""} onChange={(e) => handleChange(e.target.value)} /></td>
      </tr>
    </tbody>
  </table>
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

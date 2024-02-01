import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileUpdate } from "../features/auth/authSlice";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch, user]);

  const [image, setImage] = useState("");
  const [url, seturl] = useState("");

  const uploadImage=(e)=>{
    e.preventDefault()
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","kmtmpoag")
    data.append("cloud_name","dvkslreaq")
    fetch("https://api.cloudinary.com/v1_1/dvkslreaq/image/upload",{
      method:"post",
      body:data
    })
    .then(respo=>respo.json())
    .then(data=>{
      seturl(data.url)
      dispatch(profileUpdate(data.url))
    })
    .catch(err=>console.log(err));
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <img
        src={user?.profileUrl ? user.profileUrl : ""}
        alt="profile"
        height="100px"
        />
      <h4>{user.name}</h4>
      <h4>{user.email}</h4>
      <form>
        <h3>Upload profile picture</h3>
        <div className="form-group">
          <img src={url ? url : ""} alt="" width="400px" height="250px"/> <br />
        </div>
        <div className="form-group">
          <input
            type="file"
            name="profile"
            id="profile"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <button className="btn" onClick={uploadImage}>
            Upload!
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;

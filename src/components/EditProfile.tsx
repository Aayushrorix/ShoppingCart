import React, { useEffect, useState } from 'react';
import './css/EditProfile.css';
import { useGetProfileQuery, useUpdateProfileMutation } from '../state/slices/ShoppingCartSlices';

function EditProfile() {
  const [userProfile, setUserProfile] = useState<any>({ displayName: '', profileImage: '' });
  const { data: profile } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [disableSave, setDisableSave] = useState<boolean>(true);

  const [file, setFile] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    if (profile) {
      setUserProfile(profile.data);
      setDisplayName(profile.data.displayName);
    }
  }, [profile]);

  // Handler for file input change
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisableSave(false)
    if (event.target.files) {
      setFile(event.target.files[0]);
      console.log(event.target.files[0])
    }
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisableSave(false)
    setDisplayName(event.target.value);
  }

  function handleSave() {
    const formData = new FormData();
    formData.append('displayName', displayName);
    formData.append('profileImage', file);

    updateProfile(
      formData
    );
    setDisableSave(true)
  }

  return (
    <div className="div-editprofile-main">
      <h2>Edit Profile</h2>

      <img className='user-profile-icon' src={`http://127.0.0.1:8000/media/${userProfile.profileImage}`} alt='Profile'></img>

      <div>
        <form className='profile-form'>
          <div className="input-form-name-label">Display Name</div>
          <input
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleNameChange}
            placeholder="Display Name"
            className='input-box'
          />

          <div className="input-form-name-label">Profile Image</div>
          <input className='input-box' type="file" onChange={handleFileChange} />

          <div>
            <button className='update-btn' disabled={disableSave} type="button" onClick={handleSave}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
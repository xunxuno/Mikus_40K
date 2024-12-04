// src/components/UserDetailsForm.tsx
import React, { useState, useEffect } from 'react';
import { UserDetails, fetchUserDetails, updateUserDetails } from '../../models/UserModel';
import './userDetails.css';

interface UserDetailsFormProps {
  userId: number;
}

const Profile: React.FC<UserDetailsFormProps> = ({ userId }) => {
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails(userId);
        setDetails(userDetails);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    loadUserDetails();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (details) {
      setDetails({ ...details, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (details) {
      try {
        await updateUserDetails(details);
        setIsEditing(false);
        alert('User details updated successfully!');
      } catch (error) {
        console.error('Error updating user details:', error);
      }
    }
  };

  if (!details) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className="user-details-container">
      <h3>{isEditing ? 'Edit User Details' : 'User Details'}</h3>
      <form className="user-details-form" onSubmit={handleSubmit}>
        {Object.keys(details).map((key) =>
          key !== 'user_id' ? (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key.replace('_', ' ').toUpperCase()}</label>
              <input
                type="text"
                id={key}
                name={key}
                value={details[key as keyof UserDetails]}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </div>
          ) : null
        )}
        {isEditing ? (
          <button type="submit">Save Changes</button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;

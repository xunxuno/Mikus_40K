import React, { useState, useEffect } from 'react';
import { UserDetails, fetchUserDetails, updateUserDetails } from '../../models/UserModel';
import { useNavigate } from 'react-router-dom';

interface UserDetailsFormProps {
  userId: number;
}

const Profile: React.FC<UserDetailsFormProps> = ({ userId }) => {
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails();
        if (userDetails) {
          setDetails(userDetails);
        } else {
          navigate('/user-details'); // Redirigir si no existen detalles
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/user-details'); // Redirigir si ocurre un error
      }
    };
    loadUserDetails();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (details) {
      setDetails({ ...details, [e.target.name]: e.target.value });
    }
  };

  // Asegurarnos de prevenir el envío automático de formularios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el envío del formulario de manera predeterminada
    if (details) {
      try {
        await updateUserDetails(details);
        setIsEditing(true); // Desactivar el modo de edición después de guardar
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
                value={details[key as keyof UserDetails] || ''}
                onChange={handleChange}
                readOnly={!isEditing} // Solo es editable si está en modo edición
              />
            </div>
          ) : null
        )}
        
        {/* Separación de botones para editar y guardar */}
        <div>
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)} // Cambia el estado para editar
              className="edit-button"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="save-button"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)} // Cambia el estado para cancelar la edición
                className="cancel-button"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;

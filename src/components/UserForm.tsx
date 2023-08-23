// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// const UserForm: React.FC = () => {
//   const history = useHistory();

//   // Define form state
//   const [formData, setFormData] = useState({
//     name: '',
//     phoneNumber: '',
//     email: '',
//   });

//   // Define error state
//   const [errors, setErrors] = useState({
//     name: '',
//     phoneNumber: '',
//     email: '',
//   });

//   // Handle form field changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Submit button clicked'); // Add this line


//     // Check if all required fields are filled
//     if (!formData.name || !formData.phoneNumber || !formData.email) {
//       setErrors({
//         ...errors,
//         name: !formData.name ? 'Name is required' : '',
//         phoneNumber: !formData.phoneNumber ? 'Phone number is required' : '',
//         email: !formData.email ? 'Email is required' : '',
//       });
//       return;
//     }

//     // Save user details to local storage
//     localStorage.setItem('userDetails', JSON.stringify(formData));

//     // Navigate to the second page upon successful submission
//     history.push('/second');
//     console.log('done')
//   };

//   return (
//     <div className="user-form-container">
//       <h2>User Information</h2>
//       <form className="user-form" onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           <span className="error">{errors.name}</span>
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input
//             type="text"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//           />
//           <span className="error">{errors.phoneNumber}</span>
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <span className="error">{errors.email}</span>
//         </div>
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UserForm;







import React, { useState } from 'react';
import DataGridPage from './DataGridPage'; // Import the DataGridPage component

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const [showDataGrid, setShowDataGrid] = useState(false); // Control rendering of DataGridPage

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit button clicked');

    // Check if all required fields are filled
    if (!formData.name || !formData.phoneNumber || !formData.email) {
      // Handle validation errors
      return;
    }

    // Show the DataGridPage component when the form is submitted
    setShowDataGrid(true);
  };

  return (
    <div>
      {showDataGrid ? (
        <DataGridPage />
      ) : (
        <div className="user-form-container">
          <h2>User Information</h2>
          <form className="user-form" onSubmit={handleSubmit}>
            {/* Input fields for name, phoneNumber, and email */}
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserForm;


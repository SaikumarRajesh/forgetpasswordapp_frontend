
import { useState } from 'react';
import { backendurl } from '../config';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


function Register() {

  const navigate = useNavigate();

  const initialFormData = {
    Name: '',
    email: '',
    password: ''
  };

    const [formData, setFormData] = useState(initialFormData);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${backendurl}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          setFormData(initialFormData);
          alert("User Registered successfully!");
          navigate('/')
        } else {
          const errorData = await response.json();
          if (errorData.msg === "User already exists") {
            setFormData(initialFormData);
            alert("User already exists!");
            navigate('/')
          } else {
            console.error('Registration failed:', errorData);
          }
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    };
    if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) {
      return <Navigate to={'/'} replace />;
    }
     
    return (
      <div>
      <div className='header'> <h1><b>Registration</b></h1></div>
      <div className='box'>
      <h1>Register here! <i className="fa fa-user-plus" aria-hidden="true"></i></h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            placeholder='Enter Name'
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
           required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder='Enter Email'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            placeholder='Enter password'
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" >Submit</button>
      </form>
      <br/>
        <a href='/'>If Already Registered, Go to loginpage!</a>
      </div>
      </div>
    );
  }

export default Register;

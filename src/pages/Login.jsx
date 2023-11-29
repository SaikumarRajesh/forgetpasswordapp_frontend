
import { useState } from 'react';
import { backendurl } from '../config';

function Login() {

  const initialFormData = {
    email: '',
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
        const loginresponse = await fetch(`${backendurl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
       const data =await loginresponse.json();

      if (loginresponse.status === 401) {
        alert('User not found! Register now');
        localStorage.clear();
    
    
      } else {
        alert('User Found, Password reset link emailed');
        localStorage.setItem('user',JSON.stringify(data))
      }

      } catch (error) {
        console.error('Error submitting data:', error);
      }
    
      setFormData(initialFormData) 
    };

    return (
      
    <div>
      <div className='header'><h1>User Login</h1></div>
     
      <div className="box">
        <h1>user <i className="fa fa-user-circle" aria-hidden="true"></i></h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" >Forget_Password</button>
      </form>
      <br/>
      <a href='http://localhost:5173/register'>Dont have an account? Click here to Register!</a>
      </div>
      </div>
    );
  }

export default Login;

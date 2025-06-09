import axios from 'axios';
import {useState} from 'react';

export default function Signup() {
    const {FormData, setFormData} = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    })

    const  handleChange = (e) => {
        setFormData({...FormData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("Signup successful");
      console.log(res.data);
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <select name="role" onChange={handleChange}>
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
}
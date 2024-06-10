import React, { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName ] = useState<string>('');
  const navigate = useNavigate();
  const { register} = useAuth();

  // const handleSignUp = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     navigate('/'); 
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //   }
  // };
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await register(email, password, displayName, "url"); 
          navigate('/login'); 
        } catch (error) {
          console.error('Error signing up:', error);
        }
      };

  return (

    <div className='flex py-28 items-center justify-center bg-black h-screen'>
    <Navbar />
    <div className='bg-slate-200 rounded bg-opacity-20 p-5 flex flex-col justify-center items-center'> 
        <h2 className="text-xl text-white font-bold mb-4">Register</h2>
        <input
            className="py-3 px-4 w-9/12 md:w-80 border-2 border-gray-200 rounded-lg text-md mb-3"
            type='text'
            placeholder='Email'
            onChange={(e)=>setEmail(e.target.value)}
        />
        <input 
            className="py-3 px-4 w-9/12 md:w-80 border-2 border-gray-200 rounded-lg text-md mb-3" 
            type='password'
            placeholder='Password'
            onChange={(e)=>setPassword(e.target.value)}
        />
         <input 
            className="py-3 px-4 w-9/12 md:w-80 border-2 border-gray-200 rounded-lg text-md mb-5" 
            type='text'
            placeholder='Display Name'
            onChange={(e)=>setDisplayName(e.target.value)}
        />

        <button 
            className="bg-neutral-600 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded w-56 mb-3 h-12"
            onClick={handleSignUp}
        >Register</button>
    
        <p className='text-white'>Already have an account? <Link to='/login'>Login Now</Link></p>
    </div>
    </div>
  );
};

export default Register;

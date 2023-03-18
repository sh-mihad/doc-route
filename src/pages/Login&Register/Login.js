import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthProvider';


const Login = () => {

  
    const { register, handleSubmit, formState: { errors },reset } = useForm()
   const {goolgeLogin,loging} = useContext(UserAuth)
   const navigate = useNavigate()
   const location = useLocation()
   const from = location.state?.from?.pathname || "/";
 

    const submitedLoginForm = data => {
        console.log(data)
        const email = data.email;
        const password = data.password
        loging(email,password)
        .then(res=>{
            const user = res.user;
           
            navigate(from, { replace: true });
            
        }).catch(err=>toast.error(err.message))
    }

    // google login hanlder
    const handleGoolgeLogin=()=>{
        goolgeLogin()
        .then((res)=>{
            const user = res.user
            
            reset()
            navigate(from, { replace: true });
        }).catch(err=>{
           toast.err(err.message)
        })
    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full">
                <div className="card w-full md:w-2/6 shadow-2xl bg-base-100">
                    <h1 className="text-2xl mt-5 text-center font-bold">Login now!</h1>
                    <form onSubmit={handleSubmit(submitedLoginForm)} className="card-body mb-0">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered"
                                {...register("email", {
                                    required: "Invalid Fild Emial Fild",

                                })}
                            />
                            {errors.email && <p className='text-sm mt-2 text-red-700'>{errors.email.message}</p>}
                        </div>
                       
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered"
                                {...register("password", {
                                    required: "Invalid Password Fild"
                                })}

                            />
                            {errors.password && <p className='text-sm mt-2 text-red-700'>{errors.password.message}</p>}

                        </div>
                        
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value="Login" />
                            <Link className='font-semibold mt-4  text-blue-600' to="/register">Cretae an New Accout</Link>
                        </div>
                    </form>
                   
                    <div className="divider">OR</div>
                    <div className='card-body '>
                       <button onClick={handleGoolgeLogin} className="btn btn-primary">Login With Goole</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
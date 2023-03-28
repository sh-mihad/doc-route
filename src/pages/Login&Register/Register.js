import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthProvider';



const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { goolgeLogin, createUserAccoutn, updateName } = useContext(UserAuth)
    const navigate = useNavigate()
    //2fbe1796a4bf3cd52ba5028ba7992a29

    const submitedLoginForm = data => {
        // console.log(data.photo[0])
        const name = data.name
        const email = data.email
        const password = data.password
        const mobile = data.mobile;
        const address = data.address;
        const age = data.age;
        const gender = data.gender

      

        const formData = new FormData();
         
        formData.append('image', data.photo[0]);


        fetch('https://api.imgbb.com/1/upload?key=2fbe1796a4bf3cd52ba5028ba7992a29', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    const image = result.data.display_url
                    
                    createUserAccoutn(email, password)
                        .then(res => {
                            const user = res.user
                            console.log(user);
                            updateName(name, image)
                                .then(() => {
                                    const currentUser = {
                                        name,
                                        email,
                                       
                                    }
                                    const petaintData = {
                                        name,
                                        email,
                                        password,
                                        mobile,
                                        address,
                                        age,
                                        gender,
                                        image
                                        
                                       }
                                       insertPateintData(petaintData)
                                    reset()

                                })
                                .catch(err => console.log(err.message))
                        })
                        .catch(err => {
                            console.log(err.message)
                        })
                }
            })

     


    }

    const insertPateintData =(data)=>{
        
        fetch("http://localhost:5000/pateint",{
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
          }).then(res=>res.json())
          .then(data=>console.log(data))
    }

    // google login hanlder
    const handleGoolgeLogin = () => {
        goolgeLogin()
            .then((res) => {
                const user = res.user
                // setToken(user)
                navigate("/")
            }).catch(err => {
                toast.err(err.message)
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full">
                <div className="card w-full md:w-2/6 shadow-2xl bg-base-100">
                    <h1 className="text-2xl mt-5 text-center font-bold">Register now!</h1>
                    <form onSubmit={handleSubmit(submitedLoginForm)} className="card-body mb-0">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" placeholder="Full Name" className="input input-bordered"
                                {...register("name", {
                                    required: "Invalid Name Fild",

                                })}
                            />
                            {errors.email && <p className='text-sm mt-2 text-red-700'>{errors.email.message}</p>}
                        </div>
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
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Mobile No</span>
                            </label>
                            <input type="text" placeholder="Mobile No" className="input input-bordered"
                                {...register("mobile", {
                                    required: "Invalid Name Fild",

                                })}
                            />
                            {errors.mobile && <p className='text-sm mt-2 text-red-700'>{errors.mobile.message}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" placeholder="Full Address" className="input input-bordered"
                                {...register("address", {
                                    required: "Invalid Name Fild",

                                })}
                            />
                            {errors.address && <p className='text-sm mt-2 text-red-700'>{errors.address.message}</p>}
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Age</span>
                            </label>
                            <input type="text" placeholder="Age" className="input input-bordered"
                                {...register("age", {
                                    required: "Invalid Name Fild",

                                })}
                            />
                            {errors.age && <p className='text-sm mt-2 text-red-700'>{errors.age.message}</p>}
                        </div>

                       
                        <select className="select input-bordered input w-full max-w-xs" {...register("gender")}>
                            <option value="" hidden>Select Gender </option>
                            <option value="Male">Male </option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upload Your Photo</span>
                            </label>
                            <input type="file" className="file-input w-full max-w-xs" placeholder="email" {...register("photo", {
                                required: "Upload your photo"
                            })} />

                        </div>

                        


                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value="Register" />
                            <Link className='font-semibold  mt-4 text-blue-600' to="/login">Aready have an account</Link>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <div className='card-body '>

                        <button onClick={handleGoolgeLogin} className="btn btn-primary">Login With Goole</button>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default Register;
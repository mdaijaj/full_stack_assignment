import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';


const UpdateUser = () => {
    const [userdata, setUserdata] = useState("");
    const navigate = useNavigate()
    const { id } = useParams()
    let name, value;


    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        setUserdata({ ...userdata, [name]: value })  //[] dynamic data for
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            name,
            email,
            mobile,
            age,
            interests
              } = userdata;

        let baseurl=`http://localhost:5000/api/editUserDetails/:${id}`
        const regInf = {
            method: "Put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                mobile,
                age,
                interests
            })
        }
        const res = await fetch(baseurl, regInf);
        const result = await res.json()
        console.log("result", result)
        if (res.status === 400 || !res) {
            toast.info('Invalid user details', {autoClose:1500})
        }
        else {
            toast.success('User details updated successfully', {autoClose:1500})
            navigate('/table_data')
        }
    }
    
    const colourOptions = [
        { value: 'traveling', label: 'traveling' },
        { value: 'dancing', label: 'dancing' },
        { value: 'music singing', label: 'music singing' },
        { value: 'cricket', label: 'cricket' },
        { value: 'reading', label: 'reading' },
        { value: 'learning', label: 'learning' },
    ];

    const getUserDetails=  async(id)=>{
        let baseurl=`http://localhost:5000/api/getUserDetails/${id}`
        const res = await fetch(baseurl);
        const result = await res.json()
        console.log("result", result)
        let userdata= result.data
        setUserdata(userdata)
    }

    useEffect(()=>{
        getUserDetails(id)
    }, [])
    

    return (
        <>
        <div className="">
            <NavLink to={`/userList`} className="btn btn-primary" style={{margin: "10px"}}>Achivement List</NavLink>
        </div>

        <div className="container" style={{marginTop: "10px"}}>
            <div className="mb-4 row">
                <div className="col-5 sm-4">
                    <input type="text" 
                        className="form-control" 
                        id="inputName" 
                        onChange={handleInput}
                        name='name'
                        value={userdata.name}
                        placeholder="name" />
                </div>
                <div className="col-5 sm-4">
                    <input type="text" 
                        className="form-control" 
                        name="age" 
                        onChange={handleInput} 
                        value={userdata.age}
                        id="age" 
                        placeholder="age"/>
                </div>
            </div>

            <div className="mb-4 row">
                <div className="col-5 sm-4">
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleInput}
                        name='email'
                        id="email"
                        value={userdata.email}
                        placeholder="Enter email..."
                    />
                </div>
                <div className="col-5 sm-4">
                    <input type="number" 
                        className="form-control" 
                        id="mobile" 
                        onChange={handleInput}
                        value={userdata.mobile}
                        name='mobile'
                        placeholder="Mobile*"/>
                </div>
            </div>
            <div className="mb-4 row">
                <div className="col-5 sm-4">
                {console.log("userdata", userdata)}
                    <Select 
                        // defaultValue={[userdata?.intrests[0], userdata?.intrests[1]]}
                        isMulti
                        name="ingrediants"
                        options={colourOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
            </div>

            <div className="mb-2 row">
                <div className="col-sm-2">
                    <button className="btn btn-info" onClick={handleSubmit} style={{marginRight: "25px"}}>Submit</button>
                    <button className="btn btn-danger">Cancel</button>
                </div>
            </div>
            <ToastContainer />
        </div>
        </>
    )
}

export default UpdateUser;



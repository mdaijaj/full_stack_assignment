import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';

const AddUser = () => {
    const [userdata, setUserdata] = useState({
        name: '',
        email: '',
        mobile: '',
        age: '',
        interests: []
    });
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState([]);

    const colourOptions = [
        { value: 'traveling', label: 'traveling' },
        { value: 'dancing', label: 'dancing' },
        { value: 'music singing', label: 'music singing' },
        { value: 'cricket', label: 'cricket' },
        { value: 'reading', label: 'reading' },
        { value: 'learning', label: 'learning' },
    ];

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserdata({ ...userdata, [name]: value });
    };

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        setUserdata({ ...userdata, interests: selectedOptions.map(option => option.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, mobile, age, interests } = userdata;

        const baseurl = "http://localhost:5000/api/createuserdetails";
        const regInf = {
            method: "POST",
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
        };
        const res = await fetch(baseurl, regInf);
        const result = await res.json();
        console.log("result", result);
        if (result.status === 400 || !result) {
            toast.info('Invalid user details', { autoClose: 1500 });
        } else {
            toast.success('New candidate created successfully', { autoClose: 1500 });
            navigate('/userList');
        }
    };

    return (
        <>
            <div className="">
                <NavLink to={`/userList`} className="btn btn-primary" style={{ margin: "10px" }}>Achievement List</NavLink>
            </div>

            <div className="container" style={{ marginTop: "10px" }}>
                <div className="mb-4 row">
                    <div className="col-5 sm-4">
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='name'
                            placeholder="name"
                        />
                    </div>
                    <div className="col-5 sm-4">
                        <input
                            type="text"
                            className="form-control"
                            onChange={handleInput}
                            name='email'
                            id="email"
                            placeholder="email..."
                        />
                    </div>
                </div>

                <div className="mb-4 row">
                    <div className="col-5 sm-4">
                        <input
                            type="number"
                            className="form-control"
                            id="mobile"
                            onChange={handleInput}
                            name='mobile'
                            placeholder="Mobile*"
                        />
                    </div>
                    <div className="col-5 sm-4">
                        <input
                            type="number"
                            className="form-control"
                            name="age"
                            onChange={handleInput}
                            id="age"
                            placeholder="age"
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <div className="col-5 sm-4">
                        <Select
                            defaultValue={[]}
                            isMulti
                            name="interests"
                            options={colourOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleSelectChange}
                        />
                    </div>
                </div>

                <div className="mb-2 row">
                    <div className="col-sm-2">
                        <button className="btn btn-info" onClick={handleSubmit} style={{ marginRight: "25px" }}>Submit</button>
                        <button className="btn btn-danger">Cancel</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default AddUser;

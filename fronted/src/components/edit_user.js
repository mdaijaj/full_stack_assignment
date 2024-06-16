import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';

const UpdateUser = () => {
    const [userdata, setUserdata] = useState({
        name: '',
        email: '',
        mobile: '',
        age: '',
        interests: []
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserdata({ ...userdata, [name]: value });
    };

    const handleSelectChange = (selectedOptions) => {
        setUserdata({ ...userdata, interests: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, mobile, age, interests } = userdata;

        const baseurl = `http://localhost:5000/api/editUserDetails/${id}`;
        const regInf = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                mobile,
                age,
                interests: interests.map(option => option.value)
            })
        };

        try {
            const res = await fetch(baseurl, regInf);
            if (!res.ok) {
                throw new Error('Failed to update user details');
            }
            const result = await res.json();
            toast.success('User details updated successfully', { autoClose: 1500 });
            navigate('/userList');
        } catch (error) {
            toast.error(error.message, { autoClose: 1500 });
        }
    };

    const colourOptions = [
        { value: 'traveling', label: 'traveling' },
        { value: 'dancing', label: 'dancing' },
        { value: 'music singing', label: 'music singing' },
        { value: 'cricket', label: 'cricket' },
        { value: 'reading', label: 'reading' },
        { value: 'learning', label: 'learning' },
    ];

    const getUserDetails = async (id) => {
        const baseurl = `http://localhost:5000/api/getUserDetails/${id}`;
        try {
            const res = await fetch(baseurl);
            if (!res.ok) {
                throw new Error('Failed to fetch user details');
            }
            const result = await res.json();
            const userdata = result.data;
            setUserdata({
                ...userdata,
                interests: userdata.interests.map(interest => ({ value: interest, label: interest }))
            });
        } catch (error) {
            toast.error(error.message, { autoClose: 1500 });
        }
    };

    useEffect(() => {
        getUserDetails(id);
    }, [id]);

    return (
        <>
            <div>
                <NavLink to={`/userList`} className="btn btn-primary" style={{ margin: "10px" }}>Achievement List</NavLink>
            </div>

            <div className="container" style={{ marginTop: "10px" }}>
                <div className="mb-4 row">
                    <div className="col-5 sm-4">
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='name'
                            value={userdata.name}
                            placeholder="Name" />
                    </div>
                    <div className="col-5 sm-4">
                        <input type="text"
                            className="form-control"
                            name="age"
                            onChange={handleInput}
                            value={userdata.age}
                            id="age"
                            placeholder="Age" />
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
                            placeholder="Mobile" />
                    </div>
                </div>
                <div className="mb-4 row">
                    <div className="col-5 sm-4">
                        <Select
                            isMulti
                            name="interests"
                            options={colourOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={userdata.interests}
                            onChange={handleSelectChange}
                        />
                    </div>
                </div>

                <div className="mb-2 row">
                    <div className="col-sm-2">
                        <button className="btn btn-info" onClick={handleSubmit} style={{ marginRight: "25px" }}>Submit</button>
                        <button className="btn btn-danger" onClick={() => navigate('/userList')}>Cancel</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default UpdateUser;

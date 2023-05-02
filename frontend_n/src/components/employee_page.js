import React, { useState} from 'react';


function Header() {

    const [employeeId, setId] = useState("644e1f91a1d71168d66cb67a");

    return (
        <div className="dashboard-app container">
            <form>
            <div className="form-group">
                    <label for="employeeId">ID</label>
                    <input className="form-control" id="employeeId" placeholder="Type here..." value={employeeId} onChange={(e) => {
                        setId(e.target.value);
                    }} />
                </div>
            </form>
            <a className='btn btn-warning' href={`view/${employeeId}`}>
                View Profile
            </a>
        </div>
    )
}

export default Header;
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './AddPage.css';


const AddPage = () => {
  const [formData, setFormData] = useState({
    projectname: '',
    duration: '',
    githublink: '',
    tech: '',
    othertech: '',
    members: '',
    desc: '',
    projectstatus: ''
  })

  const [errors, setErrors] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = {};

    if (!formData.projectname) formErrors = 'Project Name is required';
    if (!formData.duration) formErrors = 'Duration is required';
    if (!formData.githublink) formErrors = 'Github Link is required';
    if (!formData.tech) formErrors = 'Technology is required';
    if (!formData.members) formErrors = 'Members is required';
    if (!formData.desc) formErrors = 'Project Description is required';
    if (!formData.projectstatus) formErrors = 'Project Status is required';
    
    return formErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      // Submit form data
      console.log('Form submitted successfully', formData);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="AddPage">
      <h1 className='title-h1'>Add Project</h1>
      <form onSubmit={handleSubmit}>
        <table>
            <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="projectname" className="form-label">Project Name</label>
                    <input className="form-control" name="projectname" placeholder='Enter Project Name' value={formData.projectname} onChange={handleChange}/>
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input className="form-control" name="duration" placeholder='Enter Duration' value={formData.duration} onChange={handleChange}/>
                  </div>
                </td>
            </tr>
            <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="githublink" className="form-label">GitHub Links</label>
                    <input className="form-control" name="githublink" placeholder='Enter GitHub-Links' value={formData.githublink} onChange={handleChange} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                      <label htmlFor="tech" className="form-label">Technology</label>
                      <input className="form-control" name="tech" placeholder='Enter Technology' value={formData.tech} onChange={handleChange}/>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="othertech" className="form-label">Other Technology</label>
                    <input className="form-control" name="othertech" placeholder='Enter Technology' value={formData.othertech} onChange={handleChange}/>
                  </div>
                </td>
                <td>
                <div className="form-group">
                  <label htmlFor="occupation" className="form-label">Project Status</label>
                  <select className="form-select" name="projectstatus"  value={formData.projectstatus}>
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="delayed">Delayed</option>
                    <option value="risk">At Risk</option>
                  </select>
                </div>
                </td>
            </tr>
          </table>
             
        <div className="form-group">
          <label htmlFor="members" className="form-label">Members</label>
          <input className="form-control-2" name="members" placeholder='Enter Member Names' value={formData.members} onChange={handleChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="desc" className="form-label">Description</label>
          <input className="form-control-2" name="desc" placeholder='Enter Description' value={formData.desc} onChange={handleChange} />
        </div>
        <table>
          <td>
              <button className="btn-s" type='submit'>Submit</button>
          </td>
          <td>
              <button className="btn-c" >Cancel</button>
          </td>
        </table>
      </form>
    </div>
  );
}
export default AddPage
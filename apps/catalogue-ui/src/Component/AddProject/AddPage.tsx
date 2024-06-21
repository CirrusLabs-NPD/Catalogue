import React, { useState } from 'react'
import './AddPage.css';


function AddPage() {
  const [formData, setFormData] = useState({
    projectname: 'Enter Project Name',
    duration: 'Enter Duration',
    githublink: 'Enter GitHub-Links',
    tech: 'Enter Technology',
    othertech: 'Enter Technology',
    members: 'Enter Member Names',
    desc: 'Enter Description',
    projectstatus: 'Ongoing'
  })

  
  return (
    <div className="AddPage">
      <h1>Add Project</h1>
      <form>
        <table>
            <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="projectname" className="form-label">Project Name</label>
                    <input className="form-control" name="projectname"   value={formData.projectname} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input className="form-control" name="duration"   value={formData.duration} />
                  </div>
                </td>
            </tr>
            <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="githublink" className="form-label">GitHub Links</label>
                    <input className="form-control" name="githublink"   value={formData.githublink} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                      <label htmlFor="tech" className="form-label">Technology</label>
                      <input className="form-control" name="tech"   value={formData.tech} />
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="othertech" className="form-label">Other Technology</label>
                    <input className="form-control" name="othertech"   value={formData.othertech} />
                  </div>
                </td>
                <td>
                <div className="form-group">
                  <label htmlFor="occupation" className="form-label">Project Status</label>
                  <select className="form-select" name="projectstatus"   value={formData.projectstatus}>
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
          <input className="form-control-2" name="members"   value={formData.members} />
        </div>
        <div className="form-group">
          <label htmlFor="desc" className="form-label">Description</label>
          <input className="form-control-2" name="desc" value={formData.desc} />
        </div>
        <table>
          <td>
              <button className="btn-s" >Submit</button>
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
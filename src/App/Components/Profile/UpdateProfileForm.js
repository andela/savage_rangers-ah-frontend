import React from 'react';
import propTypes from 'prop-types';

export default function UpdateProfileForm(props) {
  const {
    profile, validator, onChange, submitProfile
  } = props;
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit profile
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Country</label>
                  <input
                    name="country"
                    type="text"
                    placeholder="Country"
                    className="form-control"
                    value={profile.country}
                    onChange={onChange}
                  />
                  {validator.message('country',
                    profile.country,
                    'required|alpha_space|between:3,20',
                    { className: 'text-danger' })}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">First name</label>
                  <input
                    name="firstName"
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={profile.firstName}
                    onChange={onChange}
                  />
                  {validator.message('First name',
                    profile.firstName,
                    'required|alpha|between:3,20',
                    { className: 'text-danger' })}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Last name</label>
                  <input
                    name="lastName"
                    type="email"
                    className="form-control"
                    placeholder="Last name"
                    value={profile.lastName}
                    onChange={onChange}
                  />
                  {validator.message('Last name', profile.lastName, 'required|alpha|between:3,20', { className: 'text-danger' })}
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    name="bio"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={profile.bio}
                    onChange={onChange}
                  />
                  {validator.message('Bio', profile.bio, 'required|string', { className: 'text-danger' })}
                </div>
                <div className="form-group">
                  <label htmlFor="adress">Address</label>
                  <input
                    name="address"
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={profile.address}
                    onChange={onChange}
                  />
                  {validator.message('Address', profile.address, 'required|string', { className: 'text-danger' })}
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select className="form-control">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="profileimage">Profile image</label>
                  <input
                    name="profileImage"
                    type="file"
                    className="form-control-file"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone number</label>
                  <input
                    name="phoneNumber"
                    type="tel"
                    className="form-control"
                    placeholder="(+250) 738392136"
                    value={profile.phoneNumber}
                    onChange={onChange}
                  />
                  {validator.message('Phone number', profile.phoneNumber, 'required|string', { className: 'text-danger' })}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={submitProfile}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UpdateProfileForm.propTypes = {
  profile: propTypes.object.isRequired,
  validator: propTypes.object.isRequired,
  onChange: propTypes.func.isRequired,
  submitProfile: propTypes.func.isRequired
};

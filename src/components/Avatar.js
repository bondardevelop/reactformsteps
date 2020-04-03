import React from "react";

const Avatar = props => {
  const { avatar } = props.values;
  const { avatarError } = props.errors;
  const onChangeAvatar = props.onChangeAvatar;
  return (
    <div>
      <h3 className="text-center">Avatar</h3>
      <div className="avatar-container">
        <img alt="Avatar" title="Avatar" src={avatar} />
      </div>
      <div className="form-group">
        <input
          type="file"
          className="form-control-file"
          id="avatar"
          name="avatar"
          onChange={onChangeAvatar}
        />
        {avatarError ? (
          <div className="invalid-feedback">{avatarError}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Avatar;

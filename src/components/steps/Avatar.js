import React from "react";
import DefaultAvatar from "../../img/default-avatar.png";

const Avatar = (props) => {
  const { values, errors, onChange } = props;

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange({
        target: {
          name: "avatar",
          value: e.target.result,
        },
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div>
      <h3 className="text-center">Avatar</h3>
      <div className="avatar-container">
        <img alt="Avatar" title="Avatar" src={values.avatar || DefaultAvatar} />
      </div>
      <div className="form-group">
        <input
          type="file"
          className="form-control-file"
          id="avatar"
          name="avatar"
          onChange={onChangeAvatar}
        />
        {errors.avatar && (
          <div className="invalid-feedback">{errors.avatar}</div>
        )}
      </div>
    </div>
  );
};

export default Avatar;

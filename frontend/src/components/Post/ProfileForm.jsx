import React from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { updateProfile } from "../../services/profile";
import { useForm, Controller } from "react-hook-form";
import "./ProfilePicture.css";

const ProfileForm = () => {
  const { currentUser } = useCurrentUser();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await updateProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("root", {
        message: "Failed to update profile. Please try again.",
      });
    }
  };

  return (
    <div>
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        {errors.root && <span className="error">{errors.root.message}</span>}
        <div className="profile-picture-container">
          <Controller
            name="profilePicture"
            control={control}
            render={({ field }) => (
              <div className="profile-picture-wrapper">
                <img
                  src={
                    field.value ||
                    "https://img.freepik.com/free-psd/cartoon-question-mark-isolated_23-2151568563.jpg?semt=ais_hybrid"
                  }
                  alt="Profile"
                  className="profile-picture"
                />

                <div className="profile-picture-overlay">UPDATE</div>
                <input
                  type="file"
                  accept="image/*"
                  className="profile-picture-input"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        field.onChange(reader.result);
                      };
                    }
                  }}
                />
              </div>
            )}
          />
        </div>
        <textarea name="bio" className="bio-edit" {...register("bio")} />
        <button
          disabled={isSubmitting}
          role="submit-button"
          id="submit"
          type="submit"
        >
          {isSubmitting ? "Saving changes..." : "Save changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;

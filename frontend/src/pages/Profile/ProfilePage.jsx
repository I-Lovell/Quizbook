import LoggedInHeader from "../../components/Post/LoggedInHeader";
import ProfilePicture from "../../components/Post/ProfilePicture";
import ProfileBio from "../../components/Post/Bio";


export const ProfilePage = () => {
  return (
    <div className="home">
      <LoggedInHeader />
      <ProfilePicture />
    </div>
  );
};

export default ProfilePage;
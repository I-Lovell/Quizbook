import LoggedInHeader from "../../components/Post/LoggedInHeader";
import ProfilePicture from "../../components/Post/ProfilePicture";
import Bio from "../../components/Post/Bio";
import "./ProfilePage.css";
import "../Background.css";


export const ProfilePage = () => {
  return (
    <div className="home">
      <div className="backim"></div>
      <LoggedInHeader />
      <div className="profile-picture-container">
      <ProfilePicture />
      <Bio />
    </div>
    </div>
  );
};

export default ProfilePage;
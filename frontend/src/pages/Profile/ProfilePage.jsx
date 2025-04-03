import LoggedInHeader from "../../components/Post/LoggedInHeader";
import ProfilePicture from "../../components/Post/ProfilePicture";
import Bio from "../../components/Post/Bio";


export const ProfilePage = () => {
  return (
    <div className="home">
      <LoggedInHeader />
      <ProfilePicture />
      <Bio />
    </div>
  );
};

export default ProfilePage;
import './index.css';
import Logo from '../../Logo';

const ProfileUser = ({ auth }: any) => {
    //TODO: Add favorite pet component
    return (
        <div className="profile-user">
            <Logo />
            <p>{auth.username}</p>
            <p>{auth.email}</p>
        </div>
    );
}

export default ProfileUser;
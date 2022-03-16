import useAuth from '../../auth/useAuth';
import './index.css';

import ProfilePetList from './ProfilePetList';
import ProfileUser from './ProfileUser';

const Profile = () => {
    const { auth } = useAuth();
    return (
        <div className="profile">
            <ProfileUser auth={auth} />
            <ProfilePetList user={ auth._id}/>
        </div>
    );
}

export default Profile;
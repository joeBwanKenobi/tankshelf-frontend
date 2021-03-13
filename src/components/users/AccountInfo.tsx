import UserProvider, { UserData } from '../contexts/user/UserProvider';

const AccountInfo = ({props}: {props: UserData}) => { 
    return (
        <div>
            { props != null &&
                <div>
                <p>{props.display_name}</p>
                <p>{props.email}</p>
                </div>
            }
        </div>
    )
}

export default AccountInfo;
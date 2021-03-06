import { useState } from "react";
import EditProfile from "../components/EditProfile";
import MyOrdersList from "../components/MyOrdersList";
import "../style/ProfileStyle.css";

const MyProfilePage = () => {
  const [editProfileActive, setEditProfileActive] = useState<boolean>(true);

  return (
    <div className="page-wrapper">
      <div className="buttonNav">
        <button onClick={() => setEditProfileActive(true)}>
          Profile Data{editProfileActive && <hr />}
        </button>
        <button onClick={() => setEditProfileActive(false)}>
          Your Orders{!editProfileActive && <hr />}
        </button>
      </div>
      <div>
        {editProfileActive && <EditProfile />}
        {!editProfileActive && <MyOrdersList />}
      </div>
    </div>
  );
};

export default MyProfilePage;

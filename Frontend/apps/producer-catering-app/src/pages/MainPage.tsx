import {
  UserContext,
  DietList,
} from "common-components";
import { useContext } from "react";
import "../style/DietComponentStyle.css";
import "../style/Pagination.css";
import "../style/Filter.css";
import "../style/NavbarStyle.css";

interface MainPageProps {
  // AddToCart: (item: string) => void;
}

const MainPage = (props: MainPageProps) => {
  const userContext = useContext(UserContext);

  const openDialog = (value: string) => {
    console.log({ value });
  }

  return (
    <DietList onDietButtonClick={openDialog}
      userContext={userContext}
      dietButtonLabel={'Edit diet'} />
  );
};

export default MainPage;

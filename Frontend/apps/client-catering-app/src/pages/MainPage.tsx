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
  AddToCart: (item: string) => void;
}

const MainPage = (props: MainPageProps) => {
  const userContext = useContext(UserContext);

  return (
    <DietList onDietButtonClick={props.AddToCart}
      userContext={userContext}
      dietButtonLabel={'Add to cart'} />
  );
};

export default MainPage;

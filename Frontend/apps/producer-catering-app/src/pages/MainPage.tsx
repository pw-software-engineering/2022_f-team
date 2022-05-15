import {
  UserContext,
  DietList,
  EditDietDialog,
  DietModel,
} from "common-components";
import { useContext, useState } from "react";
import "../style/DietComponentStyle.css";
import "../style/Pagination.css";
import "../style/Filter.css";
import "../style/NavbarStyle.css";

interface MainPageProps {
  // AddToCart: (item: string) => void;
}

const MainPage = (props: MainPageProps) => {
  const userContext = useContext(UserContext);
  const [showModal, setShowModal] = useState<boolean>(false)
  const [diet, setDiet] = useState<DietModel | null>(null);

  const openDialog = (value: string, diet: DietModel) => {
    setDiet(diet);
    setShowModal(true);
  }

  return (
    <div>
      {showModal && diet != null && (
        <EditDietDialog
          closeModal={setShowModal}
          userContext={userContext}
          diet={diet} />
      )}
      <DietList onDietButtonClick={openDialog}
        userContext={userContext}
        dietButtonLabel={'Edit diet'} />
    </div>
  );
};

export default MainPage;

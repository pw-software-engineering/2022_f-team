import {
  UserContext,
  DietList,
  EditDietDialog,
  DietModel,
  ServiceState,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import "../style/DietComponentStyle.css";
import "../style/Pagination.css";
import "../style/Filter.css";
import "../style/NavbarStyle.css";
import { EditDietModel } from "common-components/dist/models/DietModel";
import { APIservice } from "../Services/APIservice";
import { putDietDetailsConfig } from "../Services/configCreator";

interface MainPageProps {
  // AddToCart: (item: string) => void;
}

const MainPage = (props: MainPageProps) => {
  const service = APIservice();

  const userContext = useContext(UserContext);
  const [showModal, setShowModal] = useState<boolean>(false)
  const [diet, setDiet] = useState<DietModel | null>(null);

  const openDialog = (value: string, diet: DietModel) => {
    setDiet(diet);
    setShowModal(true);
  }

  const onSubmitDiet = (diet: EditDietModel) => {
    service.execute!(putDietDetailsConfig(userContext?.authApiKey!, diet.id),
      diet,
    );
    setShowModal(false);
  }

  return (
    <div>
      {showModal && diet != null && (
        <EditDietDialog
          closeModal={setShowModal}
          userContext={userContext}
          onSubmit={onSubmitDiet}
          diet={diet} />
      )}
      <DietList onDietButtonClick={openDialog}
        userContext={userContext}
        dietButtonLabel={'Edit diet'} />
    </div>
  );
};

export default MainPage;
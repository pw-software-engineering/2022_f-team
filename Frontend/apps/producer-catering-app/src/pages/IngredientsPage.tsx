import {
    UserContext,
    DietList,
    EditDietDialog,
    DietModel,
    ServiceState,
    IngredientsList,
} from "common-components";
import { useContext, useEffect, useState } from "react";
import "../style/DietComponentStyle.css";
import "../style/Pagination.css";
import "../style/Filter.css";
import "../style/NavbarStyle.css";
import { EditDietModel } from "common-components/dist/models/DietModel";
import { APIservice } from "../Services/APIservice";
import { putDietDetailsConfig } from "../Services/configCreator";

interface IngredientsPageProps {
    // AddToCart: (item: string) => void;
}

const IngredientsPage = (props: IngredientsPageProps) => {
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
            <IngredientsList
                userContext={userContext}
            />
        </div>
    );
};

export default IngredientsPage;
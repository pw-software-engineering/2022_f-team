import { useParams } from "react-router-dom";


const ComplainPage=()=>{
    const { orderId } = useParams();

    return (
        <div className="page-wrapper">
        <h1>Helo</h1>
        <p>hbdshivbhdbfvebvebvi
            kcbvhwoiebewiobvoiwe
            lwebviowebviowev
        </p>
        <h1>{orderId}</h1>
        </div>
    )
}

export default ComplainPage;
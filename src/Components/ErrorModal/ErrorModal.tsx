
import styling from "./ErrorModalStyling.module.css"

export function ErrorModal({IsVisible, CloseModal ,ErrorReason} : any ) {

    function Confirm() {

    }

    return <>
        {IsVisible && <div className={styling.modalcanvas}>
            <p>{ErrorReason}</p>
            <button className={styling.confirmbutton} onClick={CloseModal}>Confirm</button>
        </div>}
    </>
}
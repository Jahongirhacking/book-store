import { useSelector } from "react-redux"
import { IStore } from "../../types/store"
import './style.scss'

const Modal = () => {

    const {
        isActive,
        title,
        content,
        buttons
    } = useSelector((state: IStore) => state.modal)

    if (!isActive) return;

    return (
        <div className="overlay">
            <div className="modal">
                <h2 className="title">{title}</h2>
                <p>{content}</p>
                <div className="modal-btns">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default Modal
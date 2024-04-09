import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function Card({ name, email, id, onDelete, showUpdateModal, setUpdateData }) {
    function handleOnClick() {
        showUpdateModal(true, id);
        setUpdateData({ id, name, email });
    }

    return (
        <div className="border-[2px] h-[80px] flex items-center justify-around m-3 p-2 rounded-lg bg-slate-700">
            {/* image */}
            <img className="w-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png" alt="Reload" />

            {/* Name & Email */}
            <div className="flex flex-col items-center text-white">
                <h2>{name}</h2>
                <p>{email}</p>
            </div>

            {/* Edit */}
            <div>
                <CiEdit className="text-white cursor-pointer" onClick={handleOnClick} />
                <MdDeleteForever className="text-white mt-5 cursor-pointer" onClick={() => onDelete(id)} />
            </div>
        </div>
    );
}

export default Card;

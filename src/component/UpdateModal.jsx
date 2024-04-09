import { useRef } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase";

function Updatemodal({ setShowUpdateModal, contactId, onReload }) {
    const nameRef = useRef(null);
    const emailRef = useRef(null);

    const updateDataFireStore = async (contactId, name, email) => {
        try {
            const newData = {
                name: name,
                email: email
            }

            const docRef = doc(db, "contacts", contactId);
            await updateDoc(docRef, newData);

        } catch (error) {
            throw new Error("Error to update a contact.")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        updateDataFireStore(contactId, name, email);
        setShowUpdateModal(false);
        onReload();
    }


    return (
        <div>
            {/* Semi-transparent background */}
            <div className="fixed inset-0 bg-black opacity-60 z-10"></div>

            {/* Update Modal */}
            <div className="flex justify-center items-center fixed top-10 left-0 w-full h-full z-20">
                <div className="border-2 bg-white p-4 h-[400px] w-[300px] rounded-lg pt-5">
                    {/* Close Button */}
                    <div className="w-full flex justify-end ">
                        <IoIosCloseCircleOutline className="h-10 w-10" onClick={() => { setShowUpdateModal(false) }} />
                    </div>

                    {/* From */}

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center mt-5">
                            <label htmlFor="name" >Name</label>
                            <input type="text" id="name" name="name" ref={nameRef} className="flex flex-col bg-blue-400 text-black w-[200px] h-10 rounded-lg p-2" />
                        </div>
                        <div className="flex flex-col items-center mt-5 text-black">
                            <label htmlFor="email" >Email</label>
                            <input type="email" id="email" name="email" ref={emailRef} className="flex flex-col bg-blue-400 text-black w-[200px] h-10 rounded-lg p-2" />
                        </div>
                        <div className="flex flex-col items-center mt-10">
                            <button type="submit">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Updatemodal;
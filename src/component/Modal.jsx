import { addDoc, collection } from "firebase/firestore";
import { Formik, Field, Form } from "formik";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { db } from "../config/Firebase"

function Modal({ setShowModal, onReload }) {

    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            onReload();
        } catch (error) {
            throw new Error("Database network error.");
        }
    }



    return (
        <div className="h-[300px] border-2 w-full p-8 flex justify-center items-center flex-col rounded-lg gap-6">
            <IoIosCloseCircleOutline className="text-white font-bold size-8 cursor-pointer" onClick={() => setShowModal(false)} />
            <Formik
                initialValues={{ name: "", email: "" }}
                onSubmit={(values, actions) => {
                    // Handle form submission
                    console.log(values);
                    addContact(values);
                    setShowModal(false);
                    // actions.setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="flex flex-col gap-2 items-center text-black">
                            <label className="text-white" htmlFor="name">Name</label>
                            <Field className="rounded-md h-7 pl-2" type="text" name="name" />
                        </div>
                        <div className="flex flex-col gap-2 items-center text-black">
                            <label className="text-white" htmlFor="email">Email</label>
                            <Field className="rounded-md h-7 pl-2" type="email" name="email" />
                        </div>

                        <div className="flex justify-center mt-5">
                            <button className="border-2 w-[80px] bg-blue-700 text-white p-[5px] rounded-lg" type="submit" disabled={isSubmitting}>
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Modal;

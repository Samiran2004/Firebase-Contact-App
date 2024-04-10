import { useEffect, useState } from 'react';
import './App.css'
import Card from './component/Card';
import Nav from './component/Nav';
import Nocontact from './component/Nocontact';
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { db } from "./config/Firebase"
import Modal from './component/Modal';
import Updatemodal from './component/UpdateModal';


function App() {

  const [contact, setContact] = useState(null);
  const [originalContacts, setOriginalContacts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  //Get Contacts...
  const fetchData = async () => {
    try {
      const contactRef = collection(db, "contacts");
      const contactSnapShot = await getDocs(contactRef);
      const contactLists = contactSnapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setContact(contactLists);
      setOriginalContacts(contactLists); // Set originalContacts when fetching data
    } catch (error) {
      throw new Error("Database not working.")
    }
  };

  // Delete contact...

  const handleDeleteContact = async (contactId) => {
    try {
      const contactRef = doc(db, "contacts", contactId);
      await deleteDoc(contactRef);
      setContact(contact.filter(contacts => contacts.id !== contactId));
    } catch (error) {
      throw new Error("Error in delete contact...")
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleReloadData = () => {
    fetchData();
  }

  const onChangeSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setContact(originalContacts); // Reset contact to originalContacts when search value is empty
    } else {
      setContact(
        originalContacts.filter(data => data.name.toLowerCase().includes(searchValue))
      )
    }
  }

  return (
    <div className='bg-slate-800 min-h-screen'>
      <Nav />

      {/* SearchBox */}
      <div className=' flex justify-center pt-2'>
        <button onClick={() => setShowModal(true)}>
          <img className='w-8 rounded-full mr-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3LRnhfezH0hOYg1OuJCifddhiiXiMF5N22IwgzzwPw&s" alt="Reload" />
        </button>
        <input onChange={onChangeSearch} className='bg-blue-200 p-1 rounded-md text-black' type="text" placeholder='Search...' />
        <button>
          <img className='w-8 rounded-lg ml-3' src="https://t3.ftcdn.net/jpg/04/99/34/78/360_F_499347841_IXq0bLOPN4MkKAa71nP3WMQq6LVlgeTO.jpg" alt="Reload" />
        </button>
      </div>

      {showModal ? (
        <div className='flex w-[300px] h-screen items-center'><Modal setShowModal={setShowModal} onReload={handleReloadData} /></div>
      ) : contact && contact.length > 0 ? (
        /* Card Section */
        contact.map((data) => <Card key={data.id} name={data.name} email={data.email} id={data.id} onDelete={handleDeleteContact} showUpdateModal={setShowUpdateModal} setUpdateData={setUpdateData} />)
      ) : (
        <div className='h-[200px] flex justify-center items-center'>
          <Nocontact />
        </div>
      )}

      {/* Show Update modal */}
      {
        showUpdateModal ? (
          <Updatemodal setShowUpdateModal={setShowUpdateModal} contactId={updateData.id} onReload={handleReloadData} />
        ) : (
          null
        )
      }
    </div>
  );
}

export default App;

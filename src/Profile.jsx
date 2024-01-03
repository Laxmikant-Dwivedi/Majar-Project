// import { updateCurrentUser } from "firebase/auth"
import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app } from "./firebase";

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [FilePerc, setFilePerc] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formData, setformData] = useState({});
  // console.log(formData);
  // console.log(file);
  // console.log(FilePerc);


  // Firebase Storage
  // allow read;
  //     allow write: if
  //     request.resource.size < 2 * 1024 * 1024 &&
  //     request.resource.contentType.matches('image/.*')

  useEffect(() =>{
    if(file){
      handleFileUpload(file);
    }
  }, [file]);


  const handleFileUpload = (file) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
      (snapshot) =>{
          const progress = (snapshot.bytesTransferred/
          snapshot.totalBytes)*100;
          // console.log("upload is " + progress + "% done");
          setFilePerc(Math.round(progress));
      },
      (error) =>{
        setfileUploadError(true);
      },

      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) =>
            setformData({...FormData, avatar:downloadURL})
        );
      },
    );
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4"  action="">
        <input onChange={(e) => setFile(e.target.files[0])}  type="file" ref={fileRef} hidden accept='images/*'/>
        <img onClick={()=> fileRef.current.click()} 
              src={formData.avatar || currentUser.avatar} alt="" 
              className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 '
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
          <span className='font-medium text-red-500'>Failed to Upload (Size less than 2mb)</span>
          ) :
          FilePerc > 0 && FilePerc < 100 ?(
            <span className="text-slate-700">
              {`Uploading ${FilePerc}%`}
            </span>
          ):
            FilePerc === 100 ? (
              <span className="text-green-700"> Image Successfully uploaded !</span>
            ) : (
              ''
            )}
        </p>
        <input type="text" placeholder="Username" id='username'  className="border p-3 rounded-lg " />
        <input type="email" placeholder="Email" id='email'  className="border p-3 rounded-lg " />
        <input type="password" placeholder="Password" id='password'  className="border p-3 rounded-lg " />
        <button className="bg-blue-500 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-85">Update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer ">Delete account </span>
        <span className="text-red-500 cursor-pointer ">Sign out</span>
      </div>
    </div>
  )
}

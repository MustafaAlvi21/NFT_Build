import React, { useEffect, useState } from "react";

// COMPONENTS
import MyButton1 from "../../../components/MyButton1";
import {
  createPackageAPI,
  getSinglePackagesAPI,
  updatePackageAPI,
} from "../../../api/packages";
import { fileUrl } from "../../../config";
import { useLocation, useNavigate } from "react-router-dom";

const EditPackagePage = ({ toastAlert }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [isChecked, setIsChecked] = useState(false); // Default value is false

  const [data, setdata] = useState({
    packageID: "",
    // packageID2: '',
    packageName: "",
    packageURI: "",
    URI: "",
    packagePrice: "",
    packageQuantity: "",
    packageDescription: "",
    packageDescription2: "",
    packageDescription3: "",
    uniqueId: "",
    nftPdf: "",
  });

  const handleInput = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });

  };

  const updatePackage = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_id", data.packageID);
    // formData.append('packageID2', data.packageID2);
    formData.append("packageName", data.packageName);
    formData.append("packagePrice", data.packagePrice);
    formData.append("packageQuantity", data.packageQuantity);
    formData.append("packageDescription", data.packageDescription);
    formData.append("packageDescription2", data.packageDescription2);
    formData.append("packageDescription3", data.packageDescription3);
    formData.append("pdfFile", file);
    formData.append("imageFile", imageFile);
    formData.append("showQty", data.showQty);

    console.log("pdfFile", file);
    console.log("imageFile", imageFile);

    // return
    const res = await updatePackageAPI(formData);

    if (res.success) {
      navigate("/admin-packages");
    }

    toastAlert(res.message, res.success);
  };

  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const getPackageToEdit = async () => {
    const id = queryParams.get("id");
    const res = await getSinglePackagesAPI(id);

    if (res.success) {
      const dataToSet = {
        packageID: res.message._id,
        // packageID2: res.message._id,
        packageName: res.message.name,
        packageURI: res.message.URI,
        URI: res.message.URI,
        packagePrice: res.message.price,
        packageQuantity: res.message.stockQty,
        packageDescription: res.message.description,
        packageDescription2: res.message.description2,
        packageDescription3: res.message.description3,
        uniqueId: res.message.uniqueId,
        nftPdf: `${fileUrl}/${res.message.nftPdf}`,
        image: `${fileUrl}/${res.message.image}`,
        showQty: res?.message?.showQty,
      };

      setdata(dataToSet);
      //   setIsChecked(res?.message?.showQty)
    }

    console.log(res);
  };

  useEffect(() => {
    getPackageToEdit();
  }, []);



  const handleCheckboxChange = (event) => {
    // setIsChecked(event.target.checked); // true if checked, false if unchecked
    setdata({ ...data, showQty: event.target.checked })
  };


  return (
    <section className="py-8 px-4 sm:px-122">
      <div className="max-w-[430px] mx-auto">
        <form onSubmit={(e) => updatePackage(e)} action="">
          <div className="card">
            <h2 className="h2 text-center">Update Package</h2>
            {/* <div className='flex flex-col gap-2'>
                            <label htmlFor="packageID" className='font-semibold'>Package ID</label>
                            <input type="text" id='packageID' name='packageID' value={data.packageID} onChange={handleInput} required className='rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none' />
                        </div> */}
            <div className="flex flex-col gap-2">
              <label htmlFor="packageName" className="font-semibold">
                Package Name
              </label>
              <input
                type="text"
                id="packageName"
                name="packageName"
                value={data.packageName}
                onChange={handleInput}
                required
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageURI" className="font-semibold">
                Upload Pdf
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none"
              />
              {/* <input  type="file" id='packageURI' name='packageURI' value={data.nftPdf}  required className='rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none' /> */}
              <a target="_blank" href={data.nftPdf}>
                pdf url
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="packageURI" className="font-semibold">
                Upload Image
              </label>
              <input
                type="file"
                accept="jpg"
                onChange={handleImageChange}
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none"
              />
              {/* <input  type="file" id='packageURI' name='packageURI' value={data.nftPdf}  required className='rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none' /> */}
              <a target="_blank" href={data.image}>
                image url
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="packageURI" className="font-semibold">
                Package URI
              </label>
              <input
                type="text"
                id="packageURI"
                name="packageURI"
                value={data.packageURI}
                disabled
                required
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="uniqueId" className="font-semibold">   Unique Id </label>
              <input disabled type="text" id="uniqueId" name="uniqueId" value={data.uniqueId} required className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packagePrice" className="font-semibold"> Package Price </label>
              <input type="number" id="packagePrice" name="packagePrice" value={data.packagePrice} onChange={handleInput} required className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageQuantity" className="font-semibold">Package Quantity</label>
              <input type="number" id="packageQuantity" name="packageQuantity" value={data.packageQuantity} onChange={handleInput} required className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageDescription" className="font-semibold">Package Feature #1</label>
              <textarea type="text" rows={4} id="packageDescription" name="packageDescription" value={data.packageDescription} onChange={handleInput} required className="rounded-md py-1 px-2 text-black outline-none ring-0 focus:ring-0 focus:outline-none" ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageDescription2" className="font-semibold">Package Feature #2</label>
              <textarea type="text" rows={5} id="packageDescription2" name="packageDescription2" value={data.packageDescription2} onChange={handleInput} required className="rounded-md py-1 px-2 text-black outline-none ring-0 focus:ring-0 focus:outline-none" ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageDescription3" className="font-semibold">Package Feature #3</label>
              <textarea type="text" rows={6} id="packageDescription3" name="packageDescription3" value={data.packageDescription3} onChange={handleInput} required className="rounded-md py-1 px-2 text-black outline-none ring-0 focus:ring-0 focus:outline-none" ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label class="inline-flex items-center cursor-pointer">
                <label htmlFor="packageDescription" className="font-semibold">  Stock visiblity</label>
                <input onChange={(e) => handleCheckboxChange(e)} type="checkbox" checked={data?.showQty} className="sr-only peer" />
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <MyButton1 type="submit" classes={"text-2xl !py-1 w-full"} text={"Update Package"} />
            {
              console.log("----------", data)
              
            }
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditPackagePage;

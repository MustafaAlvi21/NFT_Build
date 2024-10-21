import React, { useState, useEffect } from "react";

// COMPONENTS
import MyButton1 from "../../../components/MyButton1";
import { createPackageAPI } from "../../../api/packages";
import { API_URL } from "../../../config";

const CreatePackagePage = ({ toastAlert }) => {
  const [data, setData] = useState({
    packageName: "",
    packageURI: "",
    URI: "",
    packagePrice: "",
    packageQuantity: "",
    packageDescription: "",
    uniqueId: "",
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [file, setFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const createPackage = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("packageName", data.packageName);
    formData.append("packageURI", data.packageURI);
    formData.append("URI", data.packageURI);
    formData.append("packagePrice", data.packagePrice);
    formData.append("packageQuantity", data.packageQuantity);
    formData.append("packageDescription", data.packageDescription);
    formData.append("packageDescription2", data.packageDescription2);
    formData.append("packageDescription3", data.packageDescription3);
    formData.append("uniqueId", data.uniqueId);
    formData.append("pdfFile", file);
    formData.append("imageFile", imageFile);
    formData.append("showQty", isChecked);

    console.log("nftPdf", file);
    console.log("imageFile", imageFile);

    const res = await createPackageAPI(formData);

    console.log(res);

    if (res.success) {
      setData({
        packageName: "",
        packageURI: "",
        URI: "",
        packagePrice: "",
        packageQuantity: "",
        packageDescription: "",
        uniqueId: "",
      });
      setFile(null);
      setImageFile(null);
    }

    toastAlert(res.message, res.success);
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      packageURI: `${API_URL}/packages/metadata/${prevData?.uniqueId}`,
    }));
  }, [data.uniqueId]);


  const [isChecked, setIsChecked] = useState(false); // Default value is false

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // true if checked, false if unchecked
  };


  return (
    <section className="py-8 px-4 sm:px-12">
      <div className="max-w-[430px] mx-auto">
        <form onSubmit={(e) => createPackage(e)} action="">
          <div className="card" style={{ marginTop: "100px" }}>
            <h2 className="h2 text-center">Create Package</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageName" className="font-semibold">
                Package Name
              </label>
              <input type="text" id="packageName" name="packageName" value={data.packageName} onChange={handleInput} required
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageURI" className="font-semibold"> Package URI </label>
              <input type="text" disabled id="packageURI" name="packageURI" value={data.packageURI} onChange={handleInput} required
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageURI" className="font-semibold">Upload Pdf</label>
              <input type="file" accept="application/pdf" onChange={handleFileChange}
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageURI" className="font-semibold"> Upload Image </label>
              <input type="file" accept="jpg" onChange={handleImageChange}
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="uniqueId" className="font-semibold">
                Unique Id
              </label>
              <input
                type="text"
                id="uniqueId"
                name="uniqueId"
                value={data.uniqueId}
                onChange={handleInput}
                required
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packagePrice" className="font-semibold"> Package Price </label>
              <input type="number" id="packagePrice" name="packagePrice" value={data.packagePrice} onChange={handleInput} required
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageQuantity" className="font-semibold"> Package Quantity </label>
              <input type="number" id="packageQuantity" name="packageQuantity" value={data.packageQuantity} onChange={handleInput} required
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageDescription" className="font-semibold"> Package Feature #1 </label>
              <textarea type="text" rows={4} id="packageDescription" name="packageDescription" value={data.packageDescription} onChange={handleInput} required
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageDescription2" className="font-semibold"> Package Feature #2 </label>
              <textarea type="text" rows={4} id="packageDescription2" name="packageDescription2" value={data.packageDescription2} onChange={handleInput} required
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="packageDescription3" className="font-semibold"> Package Feature #3 </label>
              <textarea type="text" rows={4} id="packageDescription3" name="packageDescription3" value={data.packageDescription3} onChange={handleInput} required
                className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label class="inline-flex items-center cursor-pointer">
                <label htmlFor="packageDescription" className="font-semibold"> Stock visiblity </label>
                <input onChange={(e) => handleCheckboxChange(e)} type="checkbox" value={isChecked} className="sr-only peer" />
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <MyButton1 type="submit" classes={"text-2xl !py-1 w-full package_blue_btn"} text={"Create Package"} />

          </div>
        </form>
      </div>
    </section>
  );
};


export default CreatePackagePage;
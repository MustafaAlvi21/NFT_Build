import React, { useEffect, useRef, useState } from 'react'
import { buyPackageAPI, getPackagesAPI, verifyUserAPI } from '../../../api/packages';
import { isValidObject } from '../../../utils/isValidObject';
import { Link } from 'react-router-dom';
import { fileUrl } from '../../../config';
import { handleImageError } from '../../../utils/imageHandler';



const AdminPackages = ({ toastAlert }) => {

  const [PackagesData, setPackagesData] = useState([])


  const getPackages = async () => {
    const res = await getPackagesAPI({ showAll: true });

    console.log(res.message);
    if (res.success) {
      setPackagesData(res.message)
    }
  }


  useEffect(() => {
    getPackages()
  }, [])


  return (
    <>
      {/* HEADLINE AND TEXT */}
      <section className='pt-12 px-4'>
        <div className='max-w-4xl mx-auto flex flex-col gap-4'>
          <h1 className='text-6xl font-bold text-color-inverted text-center'>Headline Text</h1>
          <p className='text-lg font-bold text-color-inverted text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo rem necessitatibus iste fugit architecto vero quod nihil quo dolorem accusantium, culpa vitae minus laudantium incidunt vel? Recusandae quis fugit illum.</p>
        </div>
      </section>


      <section className='px-4 sm:px-12 py-12'>
        <div className='container mx-auto'>

          <div className='grid min-[530px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 place-content-center place-items-center'>

            {
              PackagesData.map((e, index) => {
                return <React.Fragment key={index}>
                  <div className={`min-h-[300px] flex flex-col bg-card-bg h-full w-full max-w-[400px] p-4 rounded-md ${e.stockQty == 0 ? 'opacity-80' : ''}`}>
                    <img src={`${fileUrl}/${e?.image}`} className='min-h-[150px] bg-white rounded-md mb-4' onError={handleImageError} />

                    <div className='flex flex-col gap-2 h-full justify-between'>
                      <div className='flex flex-col gap-2'>
                        <h5 className='uppercase text-card-text text-lg font-semibold'>{e.name}</h5>
                        <h3 className='text-2xl font-bold text-card-text'>${e.price}</h3>

                        <p className='text-card-text text-sm'>Quantity: {e.stockQty}</p>
                        <p className='text-card-text text-sm font-semibold'>Benefit</p>
                        <p className='text-card-text text-xs mb-2'>{e.description}</p>
                        <p className='text-card-text text-sm font-semibold'>Pre-Sales Benefit Tokens right</p>
                        <p className='text-card-text text-xs mb-2'>{e.description2}</p>
                        <p className='text-card-text text-sm font-semibold'>Extra bonus</p>
                        <p className='text-card-text text-xs mb-2'>{e.description3}</p>
                      </div>

                      <Link to={`/admin-edit-package?id=${e._id}`} className='py-3 font-bold text-card-text rounded-md transition-all duration-300 text-black bg-color-unique hover:bg-color-unique/80 text-center'>Edit Package</Link>
                 
                    </div>
                  </div>

                </ React.Fragment>
              })
            }

          </div>

        </div >
      </section >

    </>
  )
}

export default AdminPackages
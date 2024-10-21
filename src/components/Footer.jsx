import { FaFacebook, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";


import logo_footer from "../assets/logo_footer-dd5e1241.svg"

import instagram from "../assets/bad/fs1-47ac3cd1.svg"
import facebook from "../assets/bad/fs2-eb41a59c.svg"
import twitter from "../assets/bad/fs3-17256f51.svg"
import linkedin from "../assets/bad/fs4-a689cd40.svg"
import { useEffect, useState } from "react";
import { fileUrl } from "../config";
import { getgeneralAPI } from "../api/platform";

// import Clonely_Terms_of_Service_24_10_02 from "Clonely_Terms_of_Service_24_10_02.pdf"

const Footer = () => {

  const [socialLinks, setsocialLinks] = useState()

  const socialLinksApi = async () => {
    const res = await getgeneralAPI()
    setsocialLinks(res.data)

    console.log("res.data");
    console.log(res.data);

  }

  useEffect(() => {
    socialLinksApi()

  }, [])



  return (
    <>
      {/* <!-------------FOOTER----------------------> */}
      <div className="bg-blue-400 py-[60px]" id="contact">
        <div className="container grid grid-cols-1 gap-5 md:gap-0 md:grid-cols-2">
          <div>

            <img src={"https://clonely.io/assets/logo_footer-dd5e1241.svg"} alt="logo_footer" />
            {/* <img src={logo_footer} alt="logo_footer" /> */}

            <div className="flex items-center gap-5 pt-8">
              {(socialLinks?.instagramLogo != "" && socialLinks?.instagramLogo != null && typeof socialLinks?.instagramLogo != "undefined") && <a href={socialLinks?.instagram}><img src={`${fileUrl}/${socialLinks?.instagramLogo}`} alt="instagram" /></a>}
              {(socialLinks?.twitterLogo != "" && socialLinks?.twitterLogo != null && typeof socialLinks?.twitterLogo != "undefined") && <a href={socialLinks?.twitter}><img src={`${fileUrl}/${socialLinks?.twitterLogo}`} alt="twitter" /></a>}
              {(socialLinks?.tiktokLogo != "" && socialLinks?.tiktokLogo != null && typeof socialLinks?.tiktokLogo != "undefined") && <a href={socialLinks?.tiktok}><img src={`${fileUrl}/${socialLinks?.tiktokLogo}`} alt="tiktok" /></a>}
              {(socialLinks?.youtubeLogo != "" && socialLinks?.youtubeLogo != null && typeof socialLinks?.youtubeLogo != "undefined") && <a href={socialLinks?.youtube}><img src={`${fileUrl}/${socialLinks?.youtubeLogo}`} alt="youtube" /></a>}
              {(socialLinks?.facebookLogo != "" && socialLinks?.facebookLogo != null && typeof socialLinks?.facebookLogo != "undefined") && <a href={socialLinks?.facebook}><img src={`${fileUrl}/${socialLinks?.facebookLogo}`} alt="facebook" /></a>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between text-black text-sm leading-4">
            <div>
              <p className="font-semibold mb-3">Legal</p>
              <ul>
                <li>
                  <a href="javascript:void(0)" onClick={() => window.open("/Clonely_Terms_of_Service_24_10_02.pdf", "_blank")}>Terms of service</a>
                </li>
                <li>
                  <a href="javascript:void(0)" onClick={() => window.open("/Privacy_Policy_for_Clonely.pdf", "_blank")}>Policy privacy</a>
                </li>
                <li>
                  <a href="javascript:void(0)" onClick={() => window.open("/Clonely_cookie_poclicy.pdf", "_blank")}>Cookie policy</a>
                </li>
                <li>
                  <a href="javascript:void(0)" onClick={() => window.open("/Clonely_Intellectual_Property.pdf", "_blank")}>Intellectual property</a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-3">Business</p>
              <ul>
                <li>
                  <a href="https://docs.clonely.io" target="_blank">Tokenomics</a>
                </li>
                <li>
                  <a href="#roadmap">Roadmap</a>
                </li>

              </ul>
            </div>

            <div>
              <p className="font-semibold mb-3">Social</p>
              <ul>
                <li>
                  <a href="javascript:void(0)" onClick={() => window.open("/Clonely_FAQ_2024_10_01.pdf", "_blank")}>FAQ</a>
                </li>
                <li>
                  <a href="mailto:support@clonely.io">Contact us</a>
                </li>

              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">Presentations</p>
              <ul>
                <li>
                  <a href="javascript:void(0)" onClick={() => window.open("/Clonely_presentation.pdf", "_blank")}>General</a>
                </li>
                <li>
                <a href="javascript:void(0)" onClick={() => window.open("/Clonely_affiliate_presentation.pdf", "_blank")}>Affiliate</a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-------footer end--> */}

    </>
  )
}

export default Footer

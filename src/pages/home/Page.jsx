import React, { useEffect, useState } from 'react'

import content from "../../content.json"

import video_svg from "../../assets/h1-2a947d90.svg"

import instagram from "../../assets/bad/insta-1a788e91.svg"
import facebook from "../../assets/bad/fb-12585dd9.svg"
import twitter from "../../assets/bad/social-3-e1a9134d.svg"
import linkedin from "../../assets/bad/social-4-6ca3bb8a.svg"

import section_2 from "../../assets/bad/sec-2-bg-68e20d91.png"

import section_3_banner from "../../assets/bad/banner-1-min-b804f897.jpg"

import product_1 from "../../assets/bad/grl1-01eba513.png"
import product_2 from "../../assets/bad/grl2-85daa331.png"

import sam1 from "../../assets/bad/t1-01-9773a285.svg"
import sam2 from "../../assets/bad/t2-9e9e9fa5.svg"
import sam3 from "../../assets/bad/t3-01-a6f71cb4.svg"

import card_icon from "../../assets/t1-01-9773a285.svg"

import feature_1 from "../../assets/bad/f1-29d32dd0.svg"
import feature_2 from "../../assets/bad/f2-1e8ed1bc.svg"
import feature_3 from "../../assets/bad/f3-9ac4ce0b.svg"
import feature_4 from "../../assets/bad/f4-04243dd3.svg"
import feature_5 from "../../assets/bad/f5-37879ae9.svg"
import feature_6 from "../../assets/bad/f6-54551a36.svg"
import feature_7 from "../../assets/bad/f7-1260f8aa.svg"
import feature_8 from "../../assets/bad/f8-1e720ffa.svg"

import feature_mid from "../../assets/bad/mid-img-13ef940e.png"

import tech_1 from "../../assets/bad/tec1-min-3181f86e.png"
import tech_2 from "../../assets/bad/tec2-min-232d556a.png"
import tech_3 from "../../assets/bad/tec3-min-2b239133.png"
import tech_4 from "../../assets/bad/tec4-min-c9bce8a0.png"
import tech_5 from "../../assets/bad/tec5-min-9ba3e05c.png"

import about from "../../assets/bad/pcs-min-d0a4c71d.png"

import roadmap_top_border from "../../assets/line-d36ba090.svg"

import roadmap_right_arrow from "../../assets/rarr-37655bd9.svg"
import roadmap_left_arrow from "../../assets/larr-08bbdd92.svg"

import video from "../../assets/bad/Clonely video v1-1cf07beb.mp4"
import { getgeneralAPI } from '../../api/platform'
import { fileUrl } from '../../config'
import { Link } from 'react-router-dom'


export const Home = () => {

  const [socialLinks, setsocialLinks] = useState()

  const socialLinksApi = async () => {
    const res = await getgeneralAPI()
    setsocialLinks(res.data)

    console.log("res.data");
    console.log(res.data);

  }

  useEffect(() => {
    var c = new Date(content.countdown.time).getTime()
      , l = setInterval(function () {
        var n = new Date().getTime()
          , s = c - n
          , o = Math.floor(s / (1e3 * 60 * 60 * 24))
          , r = Math.floor(s % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60))
          , e = Math.floor(s % (1e3 * 60 * 60) / (1e3 * 60))
          , t = Math.floor(s % (1e3 * 60) / 1e3);
        document.getElementById("countdown").innerHTML = `<div class="flex flex-col  items-center">${o} <span class="text-base font-montserrat">DAYS</span></div> <span class="">:</span>
  <div class="flex flex-col  items-center">${r} <span class="text-base font-montserrat">HRS</span></div><span class="">:</span>
    <div class="flex flex-col  items-center">${e} <span class="text-base font-montserrat">MINS</span></div><span class="">:</span>
     <div class="flex flex-col  items-center">${t} <span class="text-base font-montserrat">SECS</span></div>
  `,
          s < 0 && (clearInterval(l),
            document.getElementById("countdown").innerHTML = "EXPIRED")
      }, 1e3);

    socialLinksApi()

  }, [])


  return (
    <>
      {/* <!-------------  HERO    ------------> */}
      <div className="bg-barberry-400 hero_section relative h-[560px] lg:h-auto lg:aspect-video bg-center bg-cover bg-no-repeat flex justify-center items-center">
        <div className="">

          {/* <img src={video_svg} className="mb-14 size-full max-w-[320px] lg:max-w-[588px] mx-auto" /> */}
          <img src={"https://clonely.io/assets/h1-2a947d90.svg"} className="mb-14 size-full max-w-[320px] lg:max-w-[588px] mx-auto" />

          <h2 className="uppercase text-3xl text-white text-center font-atami mb-14">endless discreet desires</h2>
          <div className="social flex justify-center gap-[77px] px-2 md:py-0">
            {(socialLinks?.instagramLogo != "" && socialLinks?.instagramLogo != null && typeof socialLinks?.instagramLogo != "undefined") && <a href={socialLinks?.instagram}><img src={`${fileUrl}/${socialLinks?.instagramLogo}`} alt="instagram" /></a>}
            {(socialLinks?.twitterLogo != "" && socialLinks?.twitterLogo != null && typeof socialLinks?.twitterLogo != "undefined") && <a href={socialLinks?.twitter}><img src={`${fileUrl}/${socialLinks?.twitterLogo}`} alt="twitter" /></a>}
            {(socialLinks?.tiktokLogo != "" && socialLinks?.tiktokLogo != null && typeof socialLinks?.tiktokLogo != "undefined") && <a href={socialLinks?.tiktok}><img src={`${fileUrl}/${socialLinks?.tiktokLogo}`} alt="tiktok" /></a>}
            {(socialLinks?.youtubeLogo != "" && socialLinks?.youtubeLogo != null && typeof socialLinks?.youtubeLogo != "undefined") && <a href={socialLinks?.youtube}><img src={`${fileUrl}/${socialLinks?.youtubeLogo}`} alt="youtube" /></a>}
            {(socialLinks?.facebookLogo != "" && socialLinks?.facebookLogo != null && typeof socialLinks?.facebookLogo != "undefined") && <a href={socialLinks?.facebook}><img src={`${fileUrl}/${socialLinks?.facebookLogo}`} alt="facebook" /></a>}
          </div>
        </div>
      </div>
      {/* <!-------------  HERO  END  ------------> */}


      {/* <!-------------  SECTION 1   ------------> */}
      <div className="bg-barberry-400 relative">
        <h2 className="uppercase text-4xl md:text-5xl pt-5 text-center mb-14 font-atami">EXCLUSIVE LAUNCH OFFER</h2>
        <h3 className="text-2xl md:text-3xl text-center font-normal font-montserrat mb-14">{content.presale.text1}<br /><br />
        <Link to={content.secure_your_spot_now.link} className="black_btn flex justify-center self-center items-center bg-center bg-contain bg-no-repeat w-[322px] h-[63px] mx-auto uppercase text-white text-base font-semibold ">Learn more</Link>
        <br/>{content.presale.text2}<br/>
          {content.presale.text3} <strong>{content.presale.text4}</strong>
        </h3>
        <h2 className="uppercase text-4xl md:text-5xl text-center mb-14 font-atami">hurry up</h2>
        <h3 className="text-2xl md:text-3xl text-center font-montserrat mb-14 ">{content.hurryup.text1}</h3>
        <p className="uppercase text-base text-center mb-7">time to presale:</p>
        <div className="countdown-wrap font-open mb-14">
          <div id="countdown" className="font-open flex justify-center gap-[20px] md:gap-[35px] text-[2rem] md:text-[5rem]">
          </div>
        </div>
        <Link to={content.secure_your_spot_now.link} className="black_btn flex justify-center self-center items-center bg-center bg-contain bg-no-repeat w-[322px] h-[63px] mx-auto uppercase text-white text-base font-semibold mb-14">Secure your spot now</Link>
      </div>
      {/* <!-------------  SECTION 1 end  ------------> */}


      {/* <!-------------  SECTION 2   ------------> */}
      <div className="subscribe_section bg-black text-white bg-no-repeat bg-right bg-center">
        <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto">

          {/* <img src={"https://clonely.io/assets/sec-2-bg-68e20d91.png"} className="object-cover h-full w-full" /> */}
          <img src={section_2} className="object-cover h-full w-full" />

          <div className="flex justify-center">
            <div className="pt-14 pb-14 pl-6 md:pl-14 max-w-[515px]">
              <h4 className="text-2xl uppercase mb-6">{content.EXPERIENCE_PERSONALIZED.text1}<br /> {content.EXPERIENCE_PERSONALIZED.text2} </h4>
              <p className="text-xl mb-6">{content.EXPERIENCE_PERSONALIZED.text3} </p>
              <p class="text-xl font-semibold mb-11">{content.EXPERIENCE_PERSONALIZED.text4} <br />{content.EXPERIENCE_PERSONALIZED.text5} </p>
              <Link to={content.EXPERIENCE_PERSONALIZED.link} className="blue_btn flex justify-center self-center items-center bg-center bg-contain bg-no-repeat w-[322px] h-[63px]  uppercase text-black text-base font-semibold ">SUBSCRIBE NOW</Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-------------  SECTION 2 end  ------------> */}


      {/* <!-------------  SECTION 3 banner  ------------> */}

      {/* <img src={"https://clonely.io/assets/banner-1-min-b804f897.jpg"} className="w-full" /> */}
      <img src={section_3_banner} className="w-full" />

      {/* <!-------------  SECTION 3 end  ------------> */}


      {/* <!-------------  SECTION  4  ------------> */}
      <div className="products_section bg-black bg-center bg-contain pt-14 bg-no-repeat text-white pb-10">
        <div className="container mx-auto">
          <h2 className="text-barberry-400 uppercase text-4xl md:text-5xl text-center font-atami mb-10">{content.dive_deeper.heading1}</h2>
          <h3 className="text-white uppercase text-3xl text-center font-montserrat pb-10 font-light">{content.dive_deeper.heading2}</h3>
        </div>
        <div className="container max-w-screen-lg mx-auto flex flex-col md:flex-row items-center md:justify-between">
          <div className="max-w-[375px] flex flex-col items-center">

            {/* <img src={"	https://clonely.io/assets/grl1-01eba513.png"} alt="" className="mb-14" /> */}
            <img src={product_1} alt="" className="mb-14" />

            <div className="p-12 pt-0">
              <h2 className="text-[2.5rem] uppercase font-semibold font-montserrat text-center mb-6">{content.dive_deeper.FLING.heading}</h2>
              <p className="text-base mb-5 text-center">{content.dive_deeper.FLING.text1}</p>
              <p className="text-base mb-5 text-center">{content.dive_deeper.FLING.text2}</p>
              <p className="text-base mb-5 text-center">{content.dive_deeper.FLING.text3}</p>
            </div>
          </div>

          <div className="max-w-[375px] flex flex-col items-center">

            {/* <img src={"https://clonely.io/assets/grl2-85daa331.png"} alt="" className="mb-14" /> */}
            <img src={product_2} alt="" className="mb-14" />

            <div className="p-12 pt-0">
              <h2 className="text-[2.5rem] uppercase font-semibold font-montserrat text-center mb-6">{content.dive_deeper.PLAYMATE.heading}</h2>
              <p className="text-base mb-5 text-center">{content.dive_deeper.PLAYMATE.text1}</p>
              <p className="text-base mb-5 text-center">{content.dive_deeper.PLAYMATE.text2}</p>
              <p className="text-base mb-5 text-center">{content.dive_deeper.PLAYMATE.text3}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-------------  SECTION 4 end  ------------> */}


      {/* <!-------------  SECTION  5  ------------> */}
      {/* <div className="bg-barberry-400 pt-14 pb-20">
        <div className="container mx-auto">
          <div className="flex flex-wrap flex-col xl:flex-row items-center md:justify-between  gap-14 xl:gap-1">
            <div className="card_bg relative pt-14 bg-center bg-contain bg-no-repeat flex flex-col mb-10 md:mb-0 items-center min-w-[375px] min-h-[362px]">
              <img src={card_icon} alt="" className="mb-5" />
              <p className="text-center">VOLUTPAT BLANDIT<br />VOLUTPAT BLANDIT</p>
              <a href="#"
                className="card_black_btn absolute -bottom-[30px] left-0 right-0 min-w-[245px] flex justify-center self-center items-center bg-center bg-contain bg-no-repeat  h-[63px]  uppercase text-white text-base font-semibold  "
              >COMING SOON</a>
            </div>

            <div className="card_bg relative pt-14 bg-center bg-contain bg-no-repeat flex flex-col mb-10 md:mb-0 items-center min-w-[375px] min-h-[362px]">
              <img src={card_icon} alt="" className="mb-5" />
              <p className="text-center">VOLUTPAT BLANDIT<br />VOLUTPAT BLANDIT</p>
              <a href="#"
                className="card_black_btn absolute -bottom-[30px] left-0 right-0 min-w-[245px] flex justify-center self-center items-center bg-center bg-contain bg-no-repeat  h-[63px]  uppercase text-white text-base font-semibold  "
              >COMING SOON</a>
            </div>

            <div className="card_bg relative pt-14 bg-center bg-contain bg-no-repeat mb-10 md:mb-0 flex flex-col items-center min-w-[375px] min-h-[362px]">
              <img src={card_icon} alt="" className="mb-5" />
              <p className="text-center">VOLUTPAT BLANDIT<br />VOLUTPAT BLANDIT</p>
              <a href="#"
                className="card_black_btn absolute -bottom-[30px] left-0 right-0 min-w-[245px] flex justify-center self-center items-center bg-center bg-contain bg-no-repeat  h-[63px]  uppercase text-white text-base font-semibold  "
              >COMING SOON</a>
            </div>
          </div>

        </div>
      </div> */}



      <div className="bg-barberry-400 pt-14 pb-20">
        <div className="container xl mx-auto">
          <div className="flex flex-wrap flex-col xl:flex-row items-center md:justify-between  gap-14 xl:gap-1">
            <div className="relative pt-14 bg-center bg-contain bg-no-repeat flex flex-col mb-10 md:mb-0 items-center min-w-[300px] min-h-[362px]" style={{ backgroundImage: 'url(https://clonely.io/assets/border-fed734f7.svg)' }}>
              <img src={sam1} alt="" className="mb-5" />
              <p className="text-center">{content.before_features_section.card1.text1}<br />{content.before_features_section.card1.text2}</p>
              <a href={content.before_features_section.card1.link} className="absolute -bottom-[-5px] left-0 right-0 min-w-[245px] flex justify-center self-center items-center bg-center bg-contain bg-no-repeat  h-[63px]  uppercase text-white text-base font-semibold  " style={{ backgroundImage: 'url(https://clonely.io/assets/btn-black-bg2-f270dbe6.svg)' }}>{content.before_features_section.card1.text3}</a>
            </div>

            <div className="relative pt-14 bg-center bg-contain bg-no-repeat flex flex-col mb-10 md:mb-0 items-center min-w-[300px] min-h-[362px]" style={{ backgroundImage: 'url(https://clonely.io/assets/border-fed734f7.svg)' }}>
              <img src={sam2} alt="" className="mb-5" />
              <p className="text-center">{content.before_features_section.card2.text1}<br />{content.before_features_section.card2.text2}</p>
              <a href={content.before_features_section.card2.link} className="absolute -bottom-[-5px] left-0 right-0 min-w-[245px] flex justify-center self-center items-center bg-center bg-contain bg-no-repeat  h-[63px]  uppercase text-white text-base font-semibold  " style={{ backgroundImage: 'url(https://clonely.io/assets/btn-black-bg2-f270dbe6.svg)' }}>{content.before_features_section.card2.text3}</a>
            </div>

            <div className="relative pt-14 bg-center bg-contain bg-no-repeat flex flex-col mb-10 md:mb-0 items-center min-w-[300px] min-h-[362px]" style={{ backgroundImage: 'url(https://clonely.io/assets/border-fed734f7.svg)' }}>
              <img src={sam3} alt="" className="mb-5" />
              <p className="text-center">{content.before_features_section.card3.text1}<br />{content.before_features_section.card3.text2}</p>
              <a href={content.before_features_section.card3.link} className="absolute -bottom-[-5px] left-0 right-0 min-w-[245px] flex justify-center self-center items-center bg-center bg-contain bg-no-repeat  h-[63px]  uppercase text-white text-base font-semibold  " style={{ backgroundImage: 'url(https://clonely.io/assets/btn-black-bg2-f270dbe6.svg)' }}>{content.before_features_section.card3.text3}</a>
            </div>
          </div>

        </div>

      </div>
      {/* <!-------------  SECTION 5 end  ------------> */}


      {/* <!-------------  SECTION  6  ------------> */}
      <div className="bg-black pt-14 pb-20" id="features">
        <div className="container mx-auto">
          <h2 className="text-barberry-400 uppercase text-4xl md:text-5xl text-center font-atami mb-10">features</h2>
          <div className="grid grid-col-1 lg:grid-cols-3">
            <div className="flex flex-col gap-[60px] items-start lg:items-end ">

              <div className="flex flex-row-reverse lg:flex-row gap-[36px] items-center min-h-[88px]">
                <div className="text-white lg:text-right max-w-[246px]">
                  <h3 className="text-2xl font-semibold">{content.features.heading1}</h3>
                  <p className="text-base">{content.features.text1_1} <br />{content.features.text1_2}</p>
                </div>

                {/* <img src={"	https://clonely.io/assets/f1-29d32dd0.svg"} alt="icon" /> */}
                <img src={feature_1} alt="icon" />

              </div>

              <div className="flex flex-row-reverse lg:flex-row gap-[36px] items-center ">
                <div className="text-white lg:text-right max-w-[246px]">
                  <h3 className="text-2xl font-semibold">{content.features.heading2}</h3>
                  <p className="text-base">{content.features.text2_1}<br />{content.features.text2_2}</p>
                </div>

                {/* <img src={"https://clonely.io/assets/f2-1e8ed1bc.svg"} alt="icon" /> */}
                <img src={feature_2} alt="icon" />

              </div>

              <div className="flex flex-row-reverse lg:flex-row gap-[36px] items-center ">
                <div className="text-white lg:text-right max-w-[246px]">
                  <h3 className="text-2xl font-semibold">{content.features.heading3}</h3>
                  <p className="text-base"> {content.features.text3_1}</p>
                </div>

                {/* <img src={"https://clonely.io/assets/f3-9ac4ce0b.svg"} alt="icon" /> */}
                <img src={feature_3} alt="icon" />

              </div>

              <div className="flex flex-row-reverse lg:flex-row gap-[36px] items-center ">
                <div className="text-white lg:text-right max-w-[246px]">
                  <h3 className="text-2xl font-semibold">{content.features.heading4_1} <br />{content.features.heading4_2}</h3>
                  <p className="text-base">{content.features.text4}</p>
                </div>

                {/* <img src={"	https://clonely.io/assets/f4-04243dd3.svg"} alt="icon" /> */}
                <img src={feature_4} alt="icon" />

              </div>
            </div>

            <div>

              {/* <img src={"https://clonely.io/assets/mid-img-13ef940e.png"} alt="image" className="w-full" /> */}
              <img src={feature_mid} alt="image" className="w-full" />

            </div>

            <div className="flex flex-col gap-[60px] items-start j">
              <div className="flex flex-row-reverse  gap-[36px] items-center ">
                <div className="text-white text-left max-w-[246px]">
                  <h3 className="text-2xl font-semibold">{content.features.heading5}</h3>
                  <p className="text-base">{content.features.text5}</p>
                </div>

                {/* <img src={"https://clonely.io/assets/f5-37879ae9.svg"} alt="icon" /> */}
                <img src={feature_5} alt="icon" />

              </div>

              <div className="flex flex-row-reverse  gap-[36px] items-center ">
                <div className="text-white text-left max-w-[246px]">
                  <h3 className="text-2xl font-semibold">{content.features.heading6}</h3>
                  <p className="text-base">{content.features.text6}</p>
                </div>

                {/* <img src={"https://clonely.io/assets/f6-54551a36.svg"} alt="icon" /> */}
                <img src={feature_6} alt="icon" />

              </div>

              <div className="flex flex-row-reverse  lg:min-h-[104px] gap-[36px] items-center ">
                <div className="text-white text-left max-w-[246px]">
                  <h3 className="text-2xl font-semibold">{content.features.heading7}</h3>
                  <p className="text-base">{content.features.text7}</p>
                </div>
                <div className="min-w-[67px] flex justify-center">

                  {/* <img src={"https://clonely.io/assets/f7-1260f8aa.svg"} alt="icon" /> */}
                  <img src={feature_7} alt="icon" />

                </div>
              </div>

              <div className="flex flex-row-reverse lg:min-h-[136px] gap-[36px] items-center ">
                <div className="text-white text-left max-w-[246px]">
                  <h3 className="text-2xl font-semibold">{content.features.heading8}</h3>
                  <p className="text-base">{content.features.text8}</p>
                </div>

                {/* <img src={"	https://clonely.io/assets/f8-1e720ffa.svg"} alt="icon" /> */}
                <img src={feature_8} alt="icon" />

              </div>

            </div>
          </div>

        </div>
      </div>
      {/* <!-------------  SECTION 6 end  ------------> */}


      {/* <!-------------  SECTION  7  ------------> */}
      <div className="technology_section bg-black bg-no-repeat bg-right bg-center pb-[140px]">
        <div className="container mx-auto">
          <h2 className="text-barberry-400 uppercase text-4xl md:text-5xl text-center font-atami mb-10">technology</h2>
          <div className="flex justify-center md:justify-between flex-wrap gap-6 xl:gap-0">
            <div className="max-w-[211px] flex-none">
              <div className="h-[352px] w-full">
                <img src={tech_1} alt="tech_1" className="h-full w-full object-contain" />
              </div>
              <p className="text-base font-semibold text-white text-center pt-5">{content.technology.card1.text1} <br /> {content.technology.card1.text2} <br /> {content.technology.card1.text3}</p>
            </div>

            <div className="max-w-[211px] flex-none">
              <div className="h-[352px] w-full">
                <img src={tech_2} alt="tech_2" className="h-full w-full object-contain" />
              </div>
              <p className="text-base font-semibold text-white text-center pt-5">{content.technology.card2.text1}</p>
            </div>

            <div className="max-w-[211px] flex-none">
              <div className="h-[352px] w-full">
                <img src={tech_3} alt="tech_3" className="h-full w-full object-contain" />
              </div>
              <p className="text-base font-semibold text-white text-center pt-5">{content.technology.card3.text1}</p>
            </div>

            <div className="max-w-[211px] flex-none">
              <div className="h-[352px] w-full">
                <img src={tech_4} alt="tech_4" className="h-full w-full object-contain" />
              </div>
              <p className="text-base font-semibold text-white text-center pt-5">{content.technology.card4.text1}</p>
            </div>

            <div className="max-w-[211px] flex-none">
              <div className="h-[352px] w-full">
                <img src={tech_5} alt="tech_5" className="h-full w-full object-contain" />
              </div>
              <p className="text-base font-semibold text-white text-center pt-5">{content.technology.card5.text1}</p>
            </div>

          </div>
        </div>
      </div>
      {/* <!-------------  SECTION 7 end  ------------> */}


      {/* <!-------------  SECTION 8 ------------> */}
      <div className="bg-barberry-400" id="about">
        <div className="container mx-auto relative py-24">
          <div className="max-w-[421px]">
            <h2 className="text-4xl md:text-[2.5rem] uppercase font-semibold font-montserrat text-left mb-6">about us</h2>
            <p className="text-base mb-5">{content.about.text1}</p>
            <p className="text-base mb-5">{content.about.text2}</p>
          </div>
          <div className="absolute -top-[8rem] -bottom-[3.72rem] right-0 lg:right-[165px] z-50 hidden lg:flex">

            {/* <img src={"https://clonely.io/assets/pcs-min-d0a4c71d.png"} alt="image" /> */}
            <img src={about} alt="image" />

          </div>
        </div>
      </div>
      {/* <!-------------  SECTION 8 end ------------> */}


      {/* <!-------------  SECTION 9 roadmap ------------> */}
      <div className="bg-black pt-[150px] relative" id="roadmap">
        <img src={roadmap_top_border} alt="roadmap_top_border" className="absolute right-0 left-0 mx-auto top-[31px]" />
        <h2 className="text-white uppercase text-4xl md:text-5xl text-center font-atami mb-10">roadmap</h2>

        <div className="container xl mx-auto relative py-12 md:py-24 lg:px-8 z-10">
          <div className="absolute top-[0px] left-0 right-0 bottom-0 mx-auto w-[1px] h-full border border-white border-dotted hidden md:block"></div>

          <div className="flex justify-center md:justify-end">
            <div className="flex justify-center md:justify-start w-full md:w-1/2 text-white">
              <img src={roadmap_right_arrow} alt="roadmap_right_arrow" className="relative mt-[-140px] max-w-[100px] xl:max-w-none hidden lg:flex" />
              <div className="q1_bg w-full max-w-[375px] p-5 px-8  bg-contain bg-no-repeat bg-red ">
                <h3 className="text-2xl font-semibold mb-2">{content.roadmap.card1.text1}</h3>
                <ul className="list-disc pl-8 mb-6">
                  <li>{content.roadmap.card1.text2} </li>
                  <li>{content.roadmap.card1.text3} </li>
                  <li>{content.roadmap.card1.text4}</li>
                  <li>{content.roadmap.card1.text5}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <div className="flex justify-center md:justify-end  w-full md:w-1/2 text-white">
              <div className="q2_bg w-full max-w-[375px] p-5 px-8  bg-contain bg-no-repeat bg-red ">
                <h3 className="text-2xl font-semibold mb-2">{content.roadmap.card2.text1}</h3>
                <ul className="list-disc pl-8 mb-6 ">
                  <li>{content.roadmap.card2.text2}</li>
                  <li> {content.roadmap.card2.text3} </li>
                  <li>{content.roadmap.card2.text4}</li>
                  <li> {content.roadmap.card2.text5}</li>
                </ul>
              </div>
              <img src={roadmap_left_arrow} alt="roadmap_left_arrow" className="relative mt-[-140px] max-w-[100px] xl:max-w-none hidden lg:flex" />
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex justify-center md:justify-start  w-full md:w-1/2 text-white">
              <img src={roadmap_right_arrow} alt="roadmap_right_arrow" className="relative mt-[-140px] max-w-[100px] xl:max-w-none hidden lg:flex" />
              <div className="q5_bg w-full max-w-[375px] p-5 px-8  bg-contain bg-no-repeat bg-red ">
                <h3 className="text-2xl font-semibold mb-2">{content.roadmap.card3.text1}</h3>
                <ul className="list-disc pl-8 mb-6">
                  <li>{content.roadmap.card3.text2}</li>
                  <li>{content.roadmap.card3.text3}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-start">
            <div className="flex justify-center md:justify-end w-full md:w-1/2 text-white">
              <div className="q4_bg w-full max-w-[375px] p-5 px-8  bg-contain bg-no-repeat bg-red ">
                <h3 className="text-2xl font-semibold mb-2">{content.roadmap.card4.text1}</h3>
                <ul className="list-disc pl-8 mb-6 ">
                  <li>{content.roadmap.card4.text2}</li>
                  <li> {content.roadmap.card4.text3}</li>
                </ul>
              </div>
              <img src={roadmap_left_arrow} alt="roadmap_left_arrow" className="relative mt-[-140px] max-w-[100px] xl:max-w-none hidden lg:flex" />
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex justify-center md:justify-start  w-full md:w-1/2 text-white">
              <img src={roadmap_right_arrow} alt="roadmap_right_arrow" className="relative mt-[-140px] max-w-[100px] xl:max-w-none hidden lg:flex" />
              <div className="q5_bg w-full max-w-[375px] p-5 px-8  bg-contain bg-no-repeat bg-red ">
                <h3 className="text-2xl font-semibold mb-2">{content.roadmap.card5.text1}</h3>
                <ul className="list-disc pl-8 mb-6">
                  <li>{content.roadmap.card5.text2}</li>
                  <li>{content.roadmap.card5.text3}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-------------  SECTION 9 end ------------> */}


      {/* <!-------------VIDEO-----------------------> */}
      <div class="bg-black pb-10">
        <div class="container xl">
          <video width="100%" height="" controls>

            {/* <source src={"https://clonely.io/assets/Clonely video v1-1cf07beb.mp4"} type="video/mp4" /> */}
            <source src={video} type="video/mp4" />

            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      {/* <!-------------VIDEO END-----------------------> */}

    </>
  )
}

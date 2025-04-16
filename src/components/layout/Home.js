import React from "react";
import useTheme from "../../../src/hooks/useTheme";

import { Link } from "react-router-dom";
const Home = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className="relative leading-[1.8] bg-bodyBg dark:bg-bodyBg-dark z-0 __className_611e81">
      <div className="animate-preloader opacity-0 invisible fixed top-0 left-0 -z-1 w-full transition-all duration-300">
        <div className="preloader flex h-screen w-full items-center justify-center bg-whiteColor transition-all duration-700">
          <div className="w-90px h-90px border-5px border-t-blue border-r-blue border-b-blue-light border-l-blue-light rounded-full animate-spin-infinit"></div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <img
              alt="Preloader"
              loading="lazy"
              width="512"
              height="512"
              decoding="async"
              data-nimg="1"
              className="h-15 w-15 block r rounded"
              style={{
                color: "transparent",
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
              }}
              src="../../logoCodeVerse.png"
            />
          </div>
        </div>
      </div>
      <main>
        <section data-aos="fade-up">
          <div className="container2-xl bg-darkdeep1 pt-50px md:pt-20 pb-205px md:pb-35 rounded-2xl relative overflow-hidden shadow-brand">
            <div className="container grid grid-cols-1 lg:grid-cols-2 items-center">
              <div data-aos="fade-up">
                <span className="uppercase text-secondaryColor text-size-15 mb-5px md:mb-15px tracking-5px font-semibold block">
                  EDUCATION SOLUTION
                </span>
                <div>
                  <h1 className="text-3xl text-whiteColor md:text-6xl lg:text-size-50 2xl:text-6xl leading-10 md:leading-18 lg:leading-62px 2xl:leading-18 md:tracking-half lg:tracking-normal 2xl:tracking-half font-bold mb-15px">
                    Cloud-based LMS <br className="hidden md:block" />
                    Trusted by 1000+
                  </h1>
                </div>
                <p className="text-size-15 lg:text-base 2xl:text-lg mb-5 2xl:mb-30px text-whiteColor">
                  Lorem Ipsum is simply dummy text of the printing typesetting
                  industry. Lorem Ipsum has been
                </p>
                <div className="mt-30px md:mt-45px">
                  <a
                    className="text-sm md:text-size-15 font-semibold text-darkdeep2 bg-whiteColor border border-whiteColor px-5 md:px-30px py-3 md:py-4 hover:text-whiteColor hover:bg-darkblack rounded inline-block mr-6px md:mr-30px shadow-hero-action dark:bg-whiteColor-dark dark:hover:bg-whiteColor dark:text-whiteColor dark:hover:text-whiteColor-dark dark:border-none"
                    href="courses.html"
                  >
                    View Courses
                  </a>
                  <a
                    className="text-sm md:text-size-15 font-semibold text-whiteColor py-3 md:py-4 hover:text-secondaryColor inline-block"
                    href="courses.html"
                  >
                    Find out more <i className="icofont-long-arrow-right"></i>
                  </a>
                </div>
              </div>
              <div data-aos="fade-up">
                <div className="tilt relative">
                  <img
                    alt=""
                    loading="lazy"
                    width="544"
                    height="515"
                    decoding="async"
                    data-nimg="1"
                    className="w-full"
                    style={{
                      color: "transparent",
                      backgroundSize: "cover",
                      backgroundPosition: "50% 50%",
                      backgroundRepeat: "no-repeat",
                    }}
                    src="_next/about_80c7f.png"
                  />

                  <img
                    alt=""
                    loading="lazy"
                    width="453"
                    height="515"
                    decoding="async"
                    data-nimg="1"
                    className="absolute left-0 top-0 lg:top-4 right-0 mx-auto"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/about_13ec5.png"
                  />
                </div>
              </div>
            </div>
            <div>
              <img
                alt=""
                loading="lazy"
                width="20"
                height="21"
                decoding="async"
                data-nimg="1"
                className="absolute left-1/2 bottom-[15%] animate-spin-slow"
                style={{
                  color: "transparent",
                }}
                src="_next/register__29854.png"
              />

              <img
                alt=""
                loading="lazy"
                width="109"
                height="61"
                decoding="async"
                data-nimg="1"
                className="absolute left-[42%] sm:left-[65%] md:left-[42%] lg:left-[5%] top-[4%] sm:top-[1%] md:top-[4%] lg:top-[10%] animate-move-hor"
                style={{
                  color: "transparent",
                }}
                src="_next/herobanner__641bc.png"
              />

              <img
                alt=""
                loading="lazy"
                width="305"
                height="305"
                decoding="async"
                data-nimg="1"
                className="absolute right-[5%] bottom-[15%]"
                style={{
                  color: "transparent",
                }}
                src="_next/herobanner__7fb97.png"
              />

              <img
                alt=""
                loading="lazy"
                width="305"
                height="305"
                decoding="async"
                data-nimg="1"
                className="absolute top-[5%] left-[45%]"
                style={{
                  color: "transparent",
                }}
                src="_next/herobanner__7fb97.png"
              />
            </div>
          </div>
        </section>
        <div>
          <div data-aos="fade-up">
            <div className="container2-md flex flex-wrap items-center justify-center bg-white dark:bg-whiteColor-dark rounded-md mx-auto md:-translate-y-1/2 w-full shadow-brand">
              <div className="basis-1/2 md:basis-1/4 lg:basis-1/5 flex justify-center py-5 lg:py-35px 2xl:py-45px">
                <a href="#">
                  <img
                    alt=""
                    loading="lazy"
                    width="150"
                    height="49"
                    decoding="async"
                    data-nimg="1"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/brand_14917.png"
                  />
                </a>
              </div>
              <div className="basis-1/2 md:basis-1/4 lg:basis-1/5 flex justify-center py-5 lg:py-35px 2xl:py-45px">
                <a href="#">
                  <img
                    alt=""
                    loading="lazy"
                    width="133"
                    height="37"
                    decoding="async"
                    data-nimg="1"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/brand_26b86.png"
                  />
                </a>
              </div>
              <div className="basis-1/2 md:basis-1/4 lg:basis-1/5 flex justify-center py-5 lg:py-35px 2xl:py-45px">
                <a href="#">
                  <img
                    alt=""
                    loading="lazy"
                    width="151"
                    height="54"
                    decoding="async"
                    data-nimg="1"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/brand_37224.png"
                  />
                </a>
              </div>
              <div className="basis-1/2 md:basis-1/4 lg:basis-1/5 flex justify-center py-5 lg:py-35px 2xl:py-45px">
                <a href="#">
                  <img
                    alt=""
                    loading="lazy"
                    width="143"
                    height="37"
                    decoding="async"
                    data-nimg="1"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/brand_4d02b.png"
                  />
                </a>
              </div>
              <div className="basis-1/2 md:basis-1/4 lg:basis-1/5 flex justify-center py-5 lg:py-35px 2xl:py-45px">
                <a href="#">
                  <img
                    alt=""
                    loading="lazy"
                    width="87"
                    height="30"
                    decoding="async"
                    data-nimg="1"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/brand_5ee6e.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-30px gap-x-30px">
              <div
                className="relative z-0 mb-30px lg:mb-0 pb-0 md:pb-30px xl:pb-0 overflow-visible"
                data-aos="fade-up"
              >
                <div className="tilt">
                  <img
                    alt=""
                    loading="lazy"
                    width="382"
                    height="484"
                    decoding="async"
                    data-nimg="1"
                    className="md:ml-[70px]"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/about_2503a.png"
                  />

                  <img
                    alt=""
                    loading="lazy"
                    width="228"
                    height="181"
                    decoding="async"
                    data-nimg="1"
                    className="absolute right-0 sm:right-[-17px] md:right-36 lg:right-4 bottom-[91px] md:bottom-0"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/about_3bc4f.png"
                  />

                  <img
                    alt=""
                    loading="lazy"
                    width="138"
                    height="135"
                    decoding="async"
                    data-nimg="1"
                    className="absolute top-[-18px] left-[30px] animate-move-hor z-[-1]"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/about_4bc13.png"
                  />

                  <img
                    alt=""
                    loading="lazy"
                    width="234"
                    height="235"
                    decoding="async"
                    data-nimg="1"
                    className="absolute top-[30%] left-0 z-[-1]"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/about_119263.png"
                  />
                </div>
                <div className="px-10px py-3 md:py-25px border-l-4 border-primaryColor shadow-experience absolute bottom-0 left-0 bg-white dark:bg-whiteColor-dark animate-move-var w-[290px]">
                  <div className="counter flex items-center">
                    <p className="text-[40px] text-primaryColor font-bold uppercase pr-10px leading-1">
                      <span data-countup-number="25">25</span>+
                    </p>
                    <p className="text-blackColor dark:text-blackColor-dark font-bold leading-26px">
                      YEARS EXPERIENCE JUST ACHIVED
                    </p>
                  </div>
                </div>
              </div>
              <div data-aos="fade-up">
                <span className="text-sm font-semibold text-primaryColor bg-whitegrey3 px-6 py-6px mb-4 rounded-full inline-block">
                  About Us
                </span>
                <h3 className="text-3xl md:text-size-45 leading-10 md:leading-2xl font-bold text-blackColor dark:text-blackColor-dark pb-25px">
                  Welcome to the Online
                  <hr></hr>
                  <span className="relative inline-block">
                    <span className="absolute inset-x-0 bottom-0 h-[7px] bg-secondaryColor"></span>
                  </span>
                  Learning Center
                </h3>

                <p className="text-sm md:text-base leading-7 text-contentColor dark:text-contentColor-dark mb-6 pl-3 border-l-2 border-primaryColor">
                  25+Contrary to popular belief, Lorem Ipsum is not simply
                  random text roots in a piece of classNameical Latin literature
                  from 45 BC
                </p>
                <ul className="space-y-[14px]">
                  <li className="flex items-center group">
                    <i className="icofont-check px-2 py-2 text-primaryColor bg-whitegrey3 bg-opacity-40 group-hover:bg-primaryColor group-hover:text-white group-hover:opacity-100 mr-15px dark:bg-whitegrey1-dark"></i>
                    <p className="text-sm md:text-base font-medium text-blackColor dark:text-blackColor-dark">
                      Lorem Ipsum is simply dummy
                    </p>
                  </li>
                  <li className="flex items-center group">
                    <i className="icofont-check px-2 py-2 text-primaryColor bg-whitegrey3 bg-opacity-40 group-hover:bg-primaryColor group-hover:text-white group-hover:opacity-100 mr-15px dark:bg-whitegrey1-dark"></i>
                    <p className="text-sm md:text-base font-medium text-blackColor dark:text-blackColor-dark">
                      Explore a variety of fresh educational teach
                    </p>
                  </li>
                  <li className="flex items-center group">
                    <i className="icofont-check px-2 py-2 text-primaryColor bg-whitegrey3 bg-opacity-40 group-hover:bg-primaryColor group-hover:text-white group-hover:opacity-100 mr-15px dark:bg-whitegrey1-dark"></i>
                    <p className="text-sm md:text-base font-medium text-blackColor dark:text-blackColor-dark">
                      Lorem Ipsum is simply dummy text of
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="counter flex flex-wrap py-[70px] lg:py-20 gap-y-30px lg:gap-y-0">
              <div
                className="basis-full sm:basis-1/2 lg:basis-1/4"
                data-aos="fade-up"
              >
                <div className="flex gap-4">
                  <div>
                    <img
                      alt=""
                      loading="lazy"
                      width="52"
                      height="59"
                      decoding="async"
                      data-nimg="1"
                      style={{
                        color: "transparent",
                      }}
                      src="_next/counter__1739c.png"
                    />
                  </div>
                  <div>
                    <h1 className="text-size-34 leading-[1.1] text-blackColor font-bold dark:text-blackColor-dark">
                      <span data-countup-number="27">27</span>
                      <span>+</span>
                    </h1>
                    <p className="uppercase text-blackColor font-medium leading-[18px] dark:text-blackColor-dark">
                      Total Acheivment
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="basis-full sm:basis-1/2 lg:basis-1/4"
                data-aos="fade-up"
              >
                <div className="flex gap-4">
                  <div>
                    <img
                      alt=""
                      loading="lazy"
                      width="44"
                      height="52"
                      decoding="async"
                      data-nimg="1"
                      style={{
                        color: "transparent",
                      }}
                      src="_next/counter__21cf9.png"
                    />
                  </div>
                  <div>
                    <h1 className="text-size-34 leading-[1.1] text-blackColor font-bold dark:text-blackColor-dark">
                      <span data-countup-number="145">145</span>
                      <span>+</span>
                    </h1>
                    <p className="uppercase text-blackColor font-medium leading-[18px] dark:text-blackColor-dark">
                      TOTAL STUDENTS
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="basis-full sm:basis-1/2 lg:basis-1/4"
                data-aos="fade-up"
              >
                <div className="flex gap-4">
                  <div>
                    <img
                      alt=""
                      loading="lazy"
                      width="55"
                      height="55"
                      decoding="async"
                      data-nimg="1"
                      style={{
                        color: "transparent",
                      }}
                      src="_next/counter__32148.png"
                    />
                  </div>
                  <div>
                    <h1 className="text-size-34 leading-[1.1] text-blackColor font-bold dark:text-blackColor-dark">
                      <span data-countup-number="10">10</span>
                      <span>k</span>
                    </h1>
                    <p className="uppercase text-blackColor font-medium leading-[18px] dark:text-blackColor-dark">
                      tOTAL INSTRUCTOR
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="basis-full sm:basis-1/2 lg:basis-1/4"
                data-aos="fade-up"
              >
                <div className="flex gap-4">
                  <div>
                    <img
                      alt=""
                      loading="lazy"
                      width="50"
                      height="50"
                      decoding="async"
                      data-nimg="1"
                      style={{
                        color: "transparent",
                      }}
                      src="_next/counter__43d8a.png"
                    />
                  </div>
                  <div>
                    <h1 className="text-size-34 leading-[1.1] text-blackColor font-bold dark:text-blackColor-dark">
                      <span data-countup-number="214">214</span>
                      <span>+</span>
                    </h1>
                    <p className="uppercase text-blackColor font-medium leading-[18px] dark:text-blackColor-dark">
                      OVER THE WORLD
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-lightGrey10 dark:bg-lightGrey10-dark pt-50px pb-110px">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 pt-30px gap-x-30px items-center">
              <div
                className="mb-30px lg:mb-0 pb-0 md:pb-30px xl:pb-0"
                data-aos="fade-up"
              >
                <div className="relative">
                  <div>
                    <img
                      alt=""
                      loading="lazy"
                      width="83"
                      height="71"
                      decoding="async"
                      data-nimg="1"
                      className="absolute bottom-9 lg:bottom-[-50px] right-[50px] animate-move-hor"
                      style={{
                        color: "transparent",
                      }}
                      src="_next/service__shape__10156.png"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-primaryColor bg-whitegrey3 px-6 py-5px mb-5 rounded-full inline-block">
                      Populer Subject
                    </span>
                    <h3 className="text-3xl md:text-size-35 2xl:text-size-38 3xl:text-size-42 leading-10 md:leading-45px 2xl:leading-50px 3xl:leading-2xl font-bold text-blackColor dark:text-blackColor-dark pb-25px">
                      Provide It &amp; Technology <br />
                      Subject For You
                    </h3>
                    <p className="text-sm md:text-base text-contentColor dark:text-contentColor-dark mb-10px 2xl:mb-50px">
                      Construction is a general term meaning the art and science
                      to form systems organizations, and comes from Latin
                      Construction is
                    </p>
                    <p className="text-sm md:text-base leading-7 text-contentColor dark:text-contentColor-dark mb-10 pl-3 border-l-[3px] border-secondaryColor">
                      Construction is a general term meaning the art and science
                      to form systems organizations, and comes from Latin
                      Construction is a organizations, and comes from Latin
                      construction and Old
                    </p>
                    <div>
                      <a
                        className="text-size-15 text-whiteColor px-25px py-10px border hover:bg-whiteColor inline-block rounded dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor bg-secondaryColor border-secondaryColor hover:text-secondaryColor"
                        href="#"
                      >
                        Explore More{" "}
                        <i className="icofont-long-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative z-0 overflow-visible">
                <div data-aos="fade-up">
                  <img
                    alt=""
                    loading="lazy"
                    width="375"
                    height="503"
                    decoding="async"
                    data-nimg="1"
                    className="absolute sm:block xl:left-1/4 z-[-1] top-6 animate-move-var"
                    style={{
                      color: "transparent",
                    }}
                    src="_next/service__shape__bg__1247f.png"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-30px">
                  <div data-aos="fade-up">
                    <div className="">
                      <div className="p-35px group bg-whiteColor rounded-xl transition-all duration-300 shadow-dropdown-secodary hover:bg-primaryColor hover:-translate-y-5px hover:text-whiteColor dark:bg-whiteColor-dark dark:hover:bg-primaryColor">
                        <div className="-translate-y-2 flex justify-between overflow-hidden mb-0 md:mb-1 lg:mb-3">
                          <div className="relative w-20 h-[60px]">
                            <svg
                              className="absolute inline-block translate-y-3 translate-x-2 w-20 h-[60px]"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.30281 28.9536H8.45394C9.05625 28.9536 9.48648 29.5426 9.48648 30.2495V36.8465C9.48648 37.6711 9.05625 38.2602 8.45394 38.2602H6.30281C5.78654 38.2602 5.27026 37.6711 5.27026 36.8465V30.2495C5.27026 29.5426 5.78654 28.9536 6.30281 28.9536Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.7027 23.7833H15.8987C16.4257 23.7833 16.8649 24.4239 16.8649 25.3207V36.7228C16.8649 37.6196 16.4257 38.2602 15.8987 38.2602H13.7027C13.0879 38.2602 12.6487 37.6196 12.6487 36.7228V25.3207C12.6487 24.4239 13.0879 23.7833 13.7027 23.7833Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.0596 19.6471H23.2108C23.727 19.6471 24.2433 20.412 24.2433 21.1769V36.7303C24.2433 37.6227 23.727 38.2602 23.2108 38.2602H21.0596C20.4573 38.2602 20.0271 37.6227 20.0271 36.7303V21.1769C20.0271 20.412 20.4573 19.6471 21.0596 19.6471Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M28.4381 15.5109H30.5892C31.1055 15.5109 31.6217 16.1499 31.6217 17.0445V36.7265C31.6217 37.6212 31.1055 38.2602 30.5892 38.2602H28.4381C27.8357 38.2602 27.4055 37.6212 27.4055 36.7265V17.0445C27.4055 16.1499 27.8357 15.5109 28.4381 15.5109Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M26.9989 7.6293L23.05 18.137L20.3744 15.4678C15.622 19.6266 9.96272 22.5976 3.63238 24.2568C1.36694 24.9297 0.353173 21.6176 2.74495 21.0505C8.47735 19.533 13.5443 16.8156 17.8363 13.1279L15.5453 10.8879L26.9989 7.6293Z"
                                fill="#FFB31F"
                              ></path>
                            </svg>
                            <div className="service__bg__img w-20 h-[60px]">
                              <svg
                                className="w-20 h-[60px]"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M63.3775 44.4535C54.8582 58.717 39.1005 53.2202 23.1736 47.5697C7.2467 41.9192 -5.18037 32.7111 3.33895 18.4477C11.8583 4.18418 31.6595 -2.79441 47.5803 2.85105C63.5011 8.49652 71.8609 30.2313 63.3488 44.4865L63.3775 44.4535Z"
                                  fill="#5F2DED"
                                  fillOpacity="0.05"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="service__small__img w-7 h-[60px]">
                            <svg
                              className="icon__hover__img w-7 h-[60px] opacity-0 group-hover:opacity-100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.5961 10.265L19 1.33069L10.0022 3.73285L1 6.1306L7.59393 12.6627L14.1879 19.1992L16.5961 10.265Z"
                                stroke="#FFB31F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3>
                            <a
                              className="text-size-23 lg:text-lg 2xl:text-size-23 mb-2 md:-mb-1 2xl:mb-10px font-semibold hover:text-secondaryColor dark:text-whiteColor dark:hover:text-secondaryColor"
                              href="coursesd9d1.html?category=business"
                            >
                              Business Studies
                            </a>
                          </h3>
                          <p className="text-sm lg:text-xs 2xl:text-sm mb-15px lg:mb-2 2xl:mb-15px text-contentColor group-hover:text-whiteColor transition-all duration-300">
                            Construction is a general term the art and science
                            to form
                          </p>
                          <div>
                            <div className="text-sm text-black dark:text-blackColor-darkColor group-hover:text-whiteColor dark:text-blackColor-dark dark:group-hover:text-whiteColor-dark">
                              <a
                                className="text-sm font-medium hover:text-secondaryColor"
                                href="coursesd9d1.html?category=business"
                              >
                                View Subject
                                <i className="icofont-long-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-aos="fade-up">
                    <div className="md:translate-y-[30px]">
                      <div className="p-35px group bg-whiteColor rounded-xl transition-all duration-300 shadow-dropdown-secodary hover:bg-primaryColor hover:-translate-y-5px hover:text-whiteColor dark:bg-whiteColor-dark dark:hover:bg-primaryColor">
                        <div className="-translate-y-2 flex justify-between overflow-hidden mb-0 md:mb-1 lg:mb-3">
                          <div className="relative w-20 h-[60px]">
                            <svg
                              className="absolute inline-block translate-y-3 translate-x-2 w-20 h-[60px]"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                d="M28.525 44.0499H20.4753C18.7037 44.0499 17.2625 42.7046 17.2625 41.0509C17.2625 36.723 15.7895 32.4935 13.115 29.1417C11.2743 26.835 10.3045 24.0912 10.3103 21.2067C10.3172 17.7711 11.7888 14.4906 14.4541 11.9697C17.1201 9.44796 20.6146 8.03229 24.2939 7.98346C28.1232 7.9323 31.7312 9.28502 34.4566 11.7915C37.1864 14.302 38.6898 17.6547 38.6898 21.2322C38.6898 24.0423 37.7594 26.7272 35.9993 28.9965C33.2113 32.5912 31.7377 36.7597 31.7377 41.0511C31.7377 42.7046 30.2964 44.0499 28.525 44.0499ZM24.5008 10.6603C24.4454 10.6603 24.3904 10.6607 24.3349 10.6614C18.3004 10.7416 13.1927 15.5731 13.1814 21.2117C13.1767 23.5138 13.9501 25.7029 15.418 27.5424C18.4589 31.3533 20.1335 36.1507 20.1335 41.0509C20.1335 41.2278 20.2869 41.3716 20.4752 41.3716H28.5249C28.7133 41.3716 28.8665 41.2278 28.8665 41.051C28.8665 36.1921 30.5286 31.4809 33.6733 27.4265C35.0768 25.6168 35.8187 23.4749 35.8187 21.2321C35.8187 18.3773 34.6191 15.7019 32.4409 13.6987C30.3067 11.7359 27.4925 10.6603 24.5008 10.6603Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                d="M34.5884 35.3186H14.4117V37.9969H34.5884V35.3186Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                d="M23.8501 30.4466L21.4301 29.0054L24.8268 24.0417H21.5536C21.0311 24.0417 20.5498 23.7768 20.297 23.3501C20.0444 22.9235 20.0602 22.4024 20.3384 21.9897L25.0805 14.9543L27.5109 16.38L24.1519 21.3634H27.4464C27.9708 21.3634 28.4533 21.63 28.7053 22.059C28.9573 22.4879 28.9385 23.0109 28.6564 23.4232L23.8501 30.4466Z"
                                fill="#FFB31F"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                d="M25.9355 2.17908H23.0645V6.19654H25.9355V2.17908Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                d="M10.6816 6.93133L8.65027 8.8241L11.6922 11.6649L13.7235 9.77218L10.6816 6.93133Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                d="M38.3173 6.93027L35.2754 9.77112L37.3067 11.6639L40.3486 8.82304L38.3173 6.93027Z"
                                fill="#5F2DED"
                              ></path>
                            </svg>
                            <div className="service__bg__img w-20 h-[60px]">
                              <svg
                                className="w-20 h-[60px]"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M63.3775 44.4535C54.8582 58.717 39.1005 53.2202 23.1736 47.5697C7.2467 41.9192 -5.18037 32.7111 3.33895 18.4477C11.8583 4.18418 31.6595 -2.79441 47.5803 2.85105C63.5011 8.49652 71.8609 30.2313 63.3488 44.4865L63.3775 44.4535Z"
                                  fill="#5F2DED"
                                  fillOpacity="0.05"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="service__small__img w-7 h-[60px]">
                            <svg
                              className="icon__hover__img w-7 h-[60px] opacity-0 group-hover:opacity-100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.5961 10.265L19 1.33069L10.0022 3.73285L1 6.1306L7.59393 12.6627L14.1879 19.1992L16.5961 10.265Z"
                                stroke="#FFB31F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3>
                            <a
                              className="text-size-23 lg:text-lg 2xl:text-size-23 mb-2 md:-mb-1 2xl:mb-10px font-semibold hover:text-secondaryColor dark:text-whiteColor dark:hover:text-secondaryColor"
                              href="courses0ca9.html?category=art_&amp;_design"
                            >
                              Artist &amp; Design
                            </a>
                          </h3>
                          <p className="text-sm lg:text-xs 2xl:text-sm mb-15px lg:mb-2 2xl:mb-15px text-contentColor group-hover:text-whiteColor transition-all duration-300">
                            Construction is a general term the art and science
                            to form
                          </p>
                          <div>
                            <div className="text-sm text-black dark:text-blackColor-darkColor group-hover:text-whiteColor dark:text-blackColor-dark dark:group-hover:text-whiteColor-dark">
                              <a
                                className="text-sm font-medium hover:text-secondaryColor"
                                href="courses0ca9.html?category=art_&amp;_design"
                              >
                                View Subject
                                <i className="icofont-long-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-aos="fade-up">
                    <div className="">
                      <div className="p-35px group bg-whiteColor rounded-xl transition-all duration-300 shadow-dropdown-secodary hover:bg-primaryColor hover:-translate-y-5px hover:text-whiteColor dark:bg-whiteColor-dark dark:hover:bg-primaryColor">
                        <div className="-translate-y-2 flex justify-between overflow-hidden mb-0 md:mb-1 lg:mb-3">
                          <div className="relative w-20 h-[60px]">
                            <svg
                              className="absolute inline-block translate-y-3 translate-x-2 w-20 h-[60px]"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                d="M45.8483 26.6935C45.3965 26.2639 44.7953 26.0262 44.1558 26.0262C43.5164 26.0262 42.9166 26.2639 42.4634 26.6935L33.7409 34.9886C33.7306 34.9886 33.7183 34.9867 33.708 34.9867H25.1438C25.1438 34.9541 25.1458 34.9229 25.1458 34.8898C25.1458 34.2537 25.0301 33.6443 24.8165 33.0772H29.4735C29.7924 33.6951 30.4593 34.1214 31.2316 34.1214C32.314 34.1214 33.193 33.2873 33.193 32.258C33.193 31.2287 32.314 30.3946 31.2316 30.3946C30.4593 30.3946 29.7924 30.821 29.4735 31.4389H23.8321C22.7928 30.2507 21.2243 29.4949 19.4716 29.4949C17.9393 29.4949 16.5502 30.0736 15.53 31.0111L15.5281 31.0092L2.44995 43.5669H15.5486L19.0217 40.2842H33.708C34.1956 40.2842 34.6542 40.1645 35.0526 39.9548C35.325 39.8434 35.5749 39.6827 35.79 39.4776L45.8488 29.9124C46.3015 29.4832 46.5499 28.911 46.5499 28.3029C46.5499 27.6949 46.3015 27.1231 45.8483 26.6935ZM19.4716 37.1422C18.1633 37.1422 17.1034 36.1325 17.1034 34.8902C17.1034 33.6461 18.1633 32.6369 19.4716 32.6369C20.7799 32.6369 21.8397 33.6466 21.8397 34.8902C21.8397 36.1325 20.7799 37.1422 19.4716 37.1422ZM33.6664 38.9106C32.9255 38.9106 32.3253 38.3402 32.3253 37.6352C32.3253 36.9321 32.925 36.3599 33.6664 36.3599C34.4077 36.3599 35.0075 36.9321 35.0075 37.6352C35.0075 38.3402 34.4077 38.9106 33.6664 38.9106ZM36.3001 36.6749C36.133 36.2634 35.8606 35.9028 35.5127 35.6209L42.0537 29.4026C42.2727 29.7814 42.602 30.096 43.0019 30.3024L36.3001 36.6749ZM36.231 9.4762H28.4753V8.49301H36.231V9.4762ZM36.231 12.0986H28.4753V11.1155H36.231V12.0986ZM23.3048 9.4762H15.5486V8.49301H23.3044L23.3048 9.4762ZM23.3048 12.0986H15.5486V11.1155H23.3044L23.3048 12.0986ZM41.057 5.87011H39.3308V4.23132H28.589C27.7295 4.23132 26.9215 4.55004 26.3139 5.1283C26.1517 5.28253 26.0106 5.45121 25.8886 5.63014C25.7666 5.45121 25.6255 5.28253 25.4633 5.1283C24.8557 4.55004 24.0477 4.23132 23.1882 4.23132H12.4464V5.87011H10.7231V23.8991H24.0217C24.2677 24.6582 25.011 25.2103 25.8901 25.2103C26.7691 25.2103 27.5125 24.6586 27.7585 23.8991H41.057V5.87011ZM27.0455 5.82305C27.4576 5.43071 28.0059 5.2145 28.589 5.2145H38.2964L38.2797 20.6211H30.4471C29.0344 20.6211 27.6364 20.9873 26.4237 21.6644L26.407 7.29176C26.4065 6.73727 26.6329 6.21586 27.0455 5.82305ZM13.4803 5.21497H23.1877C23.7708 5.21497 24.3191 5.43118 24.7312 5.82352C25.1433 6.21586 25.3702 6.73773 25.3697 7.29223L25.353 21.6653C24.1388 20.9878 22.7413 20.6215 21.3296 20.6215H13.4803V5.21497Z"
                                fill="#5F2DED"
                              ></path>
                              <rect
                                x="15"
                                y="8.54175"
                                width="8"
                                height="0.993317"
                                fill="#FFB31F"
                              ></rect>
                              <rect
                                x="28"
                                y="8.54175"
                                width="8"
                                height="0.993317"
                                fill="#FFB31F"
                              ></rect>
                              <rect
                                x="15"
                                y="11.5198"
                                width="8"
                                height="0.993319"
                                fill="#FFB31F"
                              ></rect>
                              <rect
                                x="28"
                                y="11.5198"
                                width="8"
                                height="0.993319"
                                fill="#FFB31F"
                              ></rect>
                            </svg>
                            <div className="service__bg__img w-20 h-[60px]">
                              <svg
                                className="w-20 h-[60px]"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M63.3775 44.4535C54.8582 58.717 39.1005 53.2202 23.1736 47.5697C7.2467 41.9192 -5.18037 32.7111 3.33895 18.4477C11.8583 4.18418 31.6595 -2.79441 47.5803 2.85105C63.5011 8.49652 71.8609 30.2313 63.3488 44.4865L63.3775 44.4535Z"
                                  fill="#5F2DED"
                                  fillOpacity="0.05"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="service__small__img w-7 h-[60px]">
                            <svg
                              className="icon__hover__img w-7 h-[60px] opacity-0 group-hover:opacity-100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.5961 10.265L19 1.33069L10.0022 3.73285L1 6.1306L7.59393 12.6627L14.1879 19.1992L16.5961 10.265Z"
                                stroke="#FFB31F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3>
                            <a
                              className="text-size-23 lg:text-lg 2xl:text-size-23 mb-2 md:-mb-1 2xl:mb-10px font-semibold hover:text-secondaryColor dark:text-whiteColor dark:hover:text-secondaryColor"
                              href="courses2002.html?category=development"
                            >
                              Machine Learning
                            </a>
                          </h3>
                          <p className="text-sm lg:text-xs 2xl:text-sm mb-15px lg:mb-2 2xl:mb-15px text-contentColor group-hover:text-whiteColor transition-all duration-300">
                            Construction is a general term the art and science
                            to form
                          </p>
                          <div>
                            <div className="text-sm text-black dark:text-blackColor-darkColor group-hover:text-whiteColor dark:text-blackColor-dark dark:group-hover:text-whiteColor-dark">
                              <a
                                className="text-sm font-medium hover:text-secondaryColor"
                                href="courses2002.html?category=development"
                              >
                                View Subject
                                <i className="icofont-long-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-aos="fade-up">
                    <div className="md:translate-y-[30px]">
                      <div className="p-35px group bg-whiteColor rounded-xl transition-all duration-300 shadow-dropdown-secodary hover:bg-primaryColor hover:-translate-y-5px hover:text-whiteColor dark:bg-whiteColor-dark dark:hover:bg-primaryColor">
                        <div className="-translate-y-2 flex justify-between overflow-hidden mb-0 md:mb-1 lg:mb-3">
                          <div className="relative w-20 h-[60px]">
                            <svg
                              className="absolute inline-block translate-y-3 translate-x-2 w-20 h-[60px]"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.30281 28.9536H8.45394C9.05625 28.9536 9.48648 29.5426 9.48648 30.2495V36.8465C9.48648 37.6711 9.05625 38.2602 8.45394 38.2602H6.30281C5.78654 38.2602 5.27026 37.6711 5.27026 36.8465V30.2495C5.27026 29.5426 5.78654 28.9536 6.30281 28.9536Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.7027 23.7833H15.8987C16.4257 23.7833 16.8649 24.4239 16.8649 25.3207V36.7228C16.8649 37.6196 16.4257 38.2602 15.8987 38.2602H13.7027C13.0879 38.2602 12.6487 37.6196 12.6487 36.7228V25.3207C12.6487 24.4239 13.0879 23.7833 13.7027 23.7833Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M21.0596 19.6471H23.2108C23.727 19.6471 24.2433 20.412 24.2433 21.1769V36.7303C24.2433 37.6227 23.727 38.2602 23.2108 38.2602H21.0596C20.4573 38.2602 20.0271 37.6227 20.0271 36.7303V21.1769C20.0271 20.412 20.4573 19.6471 21.0596 19.6471Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M28.4381 15.5109H30.5892C31.1055 15.5109 31.6217 16.1499 31.6217 17.0445V36.7265C31.6217 37.6212 31.1055 38.2602 30.5892 38.2602H28.4381C27.8357 38.2602 27.4055 37.6212 27.4055 36.7265V17.0445C27.4055 16.1499 27.8357 15.5109 28.4381 15.5109Z"
                                fill="#5F2DED"
                              ></path>
                              <path
                                className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M26.9989 7.6293L23.05 18.137L20.3744 15.4678C15.622 19.6266 9.96272 22.5976 3.63238 24.2568C1.36694 24.9297 0.353173 21.6176 2.74495 21.0505C8.47735 19.533 13.5443 16.8156 17.8363 13.1279L15.5453 10.8879L26.9989 7.6293Z"
                                fill="#FFB31F"
                              ></path>
                            </svg>
                            <div className="service__bg__img w-20 h-[60px]">
                              <svg
                                className="w-20 h-[60px]"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  className="group-hover:fill-whiteColor dark:group-hover:fill-whiteColor-dark"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M63.3775 44.4535C54.8582 58.717 39.1005 53.2202 23.1736 47.5697C7.2467 41.9192 -5.18037 32.7111 3.33895 18.4477C11.8583 4.18418 31.6595 -2.79441 47.5803 2.85105C63.5011 8.49652 71.8609 30.2313 63.3488 44.4865L63.3775 44.4535Z"
                                  fill="#5F2DED"
                                  fillOpacity="0.05"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className="service__small__img w-7 h-[60px]">
                            <svg
                              className="icon__hover__img w-7 h-[60px] opacity-0 group-hover:opacity-100"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.5961 10.265L19 1.33069L10.0022 3.73285L1 6.1306L7.59393 12.6627L14.1879 19.1992L16.5961 10.265Z"
                                stroke="#FFB31F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3>
                            <a
                              className="text-size-23 lg:text-lg 2xl:text-size-23 mb-2 md:-mb-1 2xl:mb-10px font-semibold hover:text-secondaryColor dark:text-whiteColor dark:hover:text-secondaryColor"
                              href="courses2002.html?category=development"
                            >
                              Artist &amp; Design
                            </a>
                          </h3>
                          <p className="text-sm lg:text-xs 2xl:text-sm mb-15px lg:mb-2 2xl:mb-15px text-contentColor group-hover:text-whiteColor transition-all duration-300">
                            Construction is a general term the art and science
                            to form
                          </p>
                          <div>
                            <div className="text-sm text-black dark:text-blackColor-darkColor group-hover:text-whiteColor dark:text-blackColor-dark dark:group-hover:text-whiteColor-dark">
                              <a
                                className="text-sm font-medium hover:text-secondaryColor"
                                href="courses2002.html?category=development"
                              >
                                View Subject
                                <i className="icofont-long-arrow-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="pt-50px pb-10 md:pt-70px md:pb-50px lg:pt-20 2xl:pt-100px 2xl:pb-70px bg-whiteColor dark:bg-whiteColor-dark overflow-hidden">
            <div className="filter-container container">
              <div className="flex gap-15px lg:gap-30px flex-wrap lg:flex-nowrap items-center">
                <div className="basis-full lg:basis-[500px]" data-aos="fade-up">
                  <span className="text-sm font-semibold text-primaryColor bg-whitegrey3 px-6 py-6px mb-4 rounded-full inline-block">
                    Course List
                  </span>
                  <h3 className="text-3xl md:text-size-35 lg:text-size-42 2xl:text-size-47 leading-10 md:leading-45px lg:leading-12 2xl:leading-50px font-bold mb-15px text-blackColor dark:text-blackColor-dark">
                    Perfect Online <br className="hidden lg:block" />
                    Course Your Carrer
                  </h3>
                </div>
                <div className="basis-full lg:basis-[700px]">
                  <ul
                    className="filter-controllers flex flex-wrap sm:flex-nowrap justify-start lg:justify-end button-group filters-button-group"
                    data-aos="fade-up"
                  >
                    <li>
                      <button
                        data-filter="*"
                        className="is-checked dark:is-checked pr-5 md:pr-10 lg:pr-17px 2xl:pr-10 text-contentColor font-medium hover:text-primaryColor dark:text-contentColor-dark dark:hover:text-primaryColor"
                      >
                        See All
                      </button>
                    </li>
                    <li>
                      <button
                        data-filter=".filter1"
                        className="pr-5 md:pr-10 lg:pr-17px 2xl:pr-10 text-contentColor font-medium hover:text-primaryColor dark:text-contentColor-dark dark:hover:text-primaryColor"
                      >
                        Data science
                      </button>
                    </li>
                    <li>
                      <button
                        data-filter=".filter2"
                        className="pr-5 md:pr-10 lg:pr-17px 2xl:pr-10 text-contentColor font-medium hover:text-primaryColor dark:text-contentColor-dark dark:hover:text-primaryColor"
                      >
                        Engineering
                      </button>
                    </li>
                    <li>
                      <button
                        data-filter=".filter3"
                        className="pr-5 md:pr-10 lg:pr-17px 2xl:pr-10 text-contentColor font-medium hover:text-primaryColor dark:text-contentColor-dark dark:hover:text-primaryColor"
                      >
                        Featured
                      </button>
                    </li>
                    <li>
                      <button
                        data-filter=".filter4"
                        className="text-contentColor font-medium hover:text-primaryColor dark:text-contentColor-dark dark:hover:text-primaryColor"
                      >
                        Architecture
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="filter-contents flex flex-wrap sm:-mx-15px box-content mt-7 lg:mt-25px"
                data-aos="fade-up"
              >
                <div className="group w-full sm:w-1/2 lg:w-1/3 grid-item filter1 filter3">
                  <div className="sm:px-15px mb-30px">
                    <div className="p-15px bg-whiteColor shadow-brand dark:bg-darkdeep3-dark dark:shadow-brand-dark">
                      <div className="relative mb-2">
                        <a
                          className="w-full overflow-hidden rounded"
                          href="courses/1.html"
                        >
                          <img
                            alt=""
                            fetchpriority="high"
                            width="342"
                            height="214"
                            decoding="async"
                            data-nimg="1"
                            className="w-full transition-all duration-300 group-hover:scale-110"
                            style={{
                              color: "transparent",
                            }}
                            src="_next/grid_1b2a9.png"
                          />
                        </a>
                        <div className="absolute left-0 top-1 flex justify-between w-full items-center px-2">
                          <div>
                            <p className="text-xs text-whiteColor px-4 py-[3px] rounded font-semibold bg-secondaryColor">
                              Art &amp; Design
                            </p>
                          </div>
                          <button className="text-white bg-black bg-opacity-15 rounded hover:bg-primaryColor">
                            <i className="icofont-heart-alt text-base py-1 px-2"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="grid grid-cols-2 mb-3">
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-book-alt pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                23 Lesson
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-clock-time pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                1 hr 30 min
                              </span>
                            </div>
                          </div>
                        </div>
                        <h5 className="text-xl">
                          <Link
                            className="font-semibold text-blackColor mb-10px dark:text-blackColor-dark hover:text-primaryColor dark:hover:text-primaryColor leading-27px"
                            to="/courses"
                          >
                            Foundation course to understand about software
                          </Link>
                        </h5>
                        <div className="text-lg font-semibold text-primaryColor mb-4">
                          $32.00
                          <del className="text-sm text-lightGrey4 font-semibold ml-1">
                            / $67.00
                          </del>
                          <span className="ml-6 text-base font-semibold text-secondaryColor3">
                            <del>Free</del>
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 pt-15px border-t border-borderColor">
                          <div>
                            <h6>
                              <a
                                className="text-base font-bold flex items-center hover:text-primaryColor dark:text-blackColor-dark dark:hover:text-primaryColor"
                                href="instructors/1.html"
                              >
                                <img
                                  alt=""
                                  loading="lazy"
                                  width="400"
                                  height="400"
                                  decoding="async"
                                  data-nimg="1"
                                  className="w-[30px] h-[30px] rounded-full mr-[15px]"
                                  style={{
                                    color: "transparent",
                                    backgroundSize: "cover",
                                    backgroundPosition: "50% 50%",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                  src="_next/grid_small_15ce3.jpg"
                                />

                                <span className="whitespace-nowrap">
                                  Micle Jhon
                                </span>
                              </a>
                            </h6>
                          </div>
                          <div className="text-start md:text-end space-x-1">
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <span className="text-xs text-lightGrey6">
                              (44)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group w-full sm:w-1/2 lg:w-1/3 grid-item filter2 filter3">
                  <div className="sm:px-15px mb-30px">
                    <div className="p-15px bg-whiteColor shadow-brand dark:bg-darkdeep3-dark dark:shadow-brand-dark">
                      <div className="relative mb-2">
                        <a
                          className="w-full overflow-hidden rounded"
                          href="courses/2.html"
                        >
                          <img
                            alt=""
                            fetchpriority="high"
                            width="342"
                            height="214"
                            decoding="async"
                            data-nimg="1"
                            className="w-full transition-all duration-300 group-hover:scale-110"
                            style={{
                              color: "transparent",
                            }}
                            src="_next/grid_2a1d0.png"
                          />
                        </a>
                        <div className="absolute left-0 top-1 flex justify-between w-full items-center px-2">
                          <div>
                            <p className="text-xs text-whiteColor px-4 py-[3px] rounded font-semibold bg-blue">
                              Development
                            </p>
                          </div>
                          <button className="text-white bg-black bg-opacity-15 rounded hover:bg-primaryColor">
                            <i className="icofont-heart-alt text-base py-1 px-2"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="grid grid-cols-2 mb-3">
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-book-alt pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                29 Lesson
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-clock-time pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                2 hr 10 min
                              </span>
                            </div>
                          </div>
                        </div>
                        <h5 className="text-xl">
                          <a
                            className="font-semibold text-blackColor mb-10px dark:text-blackColor-dark hover:text-primaryColor dark:hover:text-primaryColor leading-27px"
                            href="courses/2.html"
                          >
                            Nidnies course to under stand about softwere
                          </a>
                        </h5>
                        <div className="text-lg font-semibold text-primaryColor mb-4">
                          $32.00
                          <del className="text-sm text-lightGrey4 font-semibold ml-1">
                            / $67.00
                          </del>
                          <span className="ml-6 text-base font-semibold text-greencolor">
                            Free
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 pt-15px border-t border-borderColor">
                          <div>
                            <h6>
                              <a
                                className="text-base font-bold flex items-center hover:text-primaryColor dark:text-blackColor-dark dark:hover:text-primaryColor"
                                href="instructors/2.html"
                              >
                                <img
                                  alt=""
                                  loading="lazy"
                                  width="400"
                                  height="400"
                                  decoding="async"
                                  data-nimg="1"
                                  className="w-[30px] h-[30px] rounded-full mr-[15px]"
                                  style={{
                                    color: "transparent",
                                    backgroundSize: "cover",
                                    backgroundPosition: "50% 50%",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                  src="_next/grid_small_26a12.jpg"
                                />

                                <span className="whitespace-nowrap">
                                  Rinis Jhon
                                </span>
                              </a>
                            </h6>
                          </div>
                          <div className="text-start md:text-end space-x-1">
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <span className="text-xs text-lightGrey6">
                              (44)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group w-full sm:w-1/2 lg:w-1/3 grid-item filter4 filter5">
                  <div className="sm:px-15px mb-30px">
                    <div className="p-15px bg-whiteColor shadow-brand dark:bg-darkdeep3-dark dark:shadow-brand-dark">
                      <div className="relative mb-2">
                        <a
                          className="w-full overflow-hidden rounded"
                          href="courses/3.html"
                        >
                          <img
                            alt=""
                            fetchpriority="high"
                            width="342"
                            height="214"
                            decoding="async"
                            data-nimg="1"
                            className="w-full transition-all duration-300 group-hover:scale-110"
                            style={{
                              color: "transparent",
                            }}
                            src="_next/grid_3fb27.png"
                          />
                        </a>
                        <div className="absolute left-0 top-1 flex justify-between w-full items-center px-2">
                          <div>
                            <p className="text-xs text-whiteColor px-4 py-[3px] rounded font-semibold bg-secondaryColor2">
                              Lifestyle
                            </p>
                          </div>
                          <button className="text-white bg-black bg-opacity-15 rounded hover:bg-primaryColor">
                            <i className="icofont-heart-alt text-base py-1 px-2"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="grid grid-cols-2 mb-3">
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-book-alt pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                25 Lesson
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-clock-time pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                1 hr 40 min
                              </span>
                            </div>
                          </div>
                        </div>
                        <h5 className="text-xl">
                          <a
                            className="font-semibold text-blackColor mb-10px dark:text-blackColor-dark hover:text-primaryColor dark:hover:text-primaryColor leading-27px"
                            href="courses/3.html"
                          >
                            Minws course to under stand about solution
                          </a>
                        </h5>
                        <div className="text-lg font-semibold text-primaryColor mb-4">
                          $40.00
                          <del className="text-sm text-lightGrey4 font-semibold ml-1">
                            / $67.00
                          </del>
                          <span className="ml-6 text-base font-semibold text-secondaryColor3">
                            <del>Free</del>
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 pt-15px border-t border-borderColor">
                          <div>
                            <h6>
                              <a
                                className="text-base font-bold flex items-center hover:text-primaryColor dark:text-blackColor-dark dark:hover:text-primaryColor"
                                href="instructors/3.html"
                              >
                                <img
                                  alt=""
                                  loading="lazy"
                                  width="400"
                                  height="400"
                                  decoding="async"
                                  data-nimg="1"
                                  className="w-[30px] h-[30px] rounded-full mr-15px"
                                  style={{
                                    color: "transparent",
                                    backgroundSize: "cover",
                                    backgroundPosition: "50% 50%",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                  src="_next/grid_small_36530.jpg"
                                />

                                <span className="whitespace-nowrap">
                                  Jane Austen
                                </span>
                              </a>
                            </h6>
                          </div>
                          <div className="text-start md:text-end space-x-1">
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <span className="text-xs text-lightGrey6">
                              (44)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group w-full sm:w-1/2 lg:w-1/3 grid-item filter4">
                  <div className="sm:px-15px mb-30px">
                    <div className="p-15px bg-whiteColor shadow-brand dark:bg-darkdeep3-dark dark:shadow-brand-dark">
                      <div className="relative mb-2">
                        <a
                          className="w-full overflow-hidden rounded"
                          href="courses/4.html"
                        >
                          <img
                            alt=""
                            fetchpriority="high"
                            width="342"
                            height="215"
                            decoding="async"
                            data-nimg="1"
                            className="w-full transition-all duration-300 group-hover:scale-110"
                            style={{ color: "transparent" }}
                            src="_next/grid_410e0.png"
                          />
                        </a>
                        <div className="absolute left-0 top-1 flex justify-between w-full items-center px-2">
                          <div>
                            <p className="text-xs text-whiteColor px-4 py-[3px] rounded font-semibold bg-greencolor2">
                              Web Design
                            </p>
                          </div>
                          <button className="text-white bg-black bg-opacity-15 rounded hover:bg-primaryColor">
                            <i className="icofont-heart-alt text-base py-1 px-2"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="grid grid-cols-2 mb-3">
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-book-alt pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                36 Lesson
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-clock-time pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                3 hr 40 min
                              </span>
                            </div>
                          </div>
                        </div>
                        <h5 className="text-xl">
                          <a
                            className="font-semibold text-blackColor mb-10px dark:text-blackColor-dark hover:text-primaryColor dark:hover:text-primaryColor leading-27px"
                            href="courses/4.html"
                          >
                            Design course to under stand about solution
                          </a>
                        </h5>
                        <div className="text-lg font-semibold text-primaryColor mb-4">
                          $40.00
                          <del className="text-sm text-lightGrey4 font-semibold ml-1">
                            / $67.00
                          </del>
                          <span className="ml-6 text-base font-semibold text-secondaryColor3">
                            <del>Free</del>
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 pt-15px border-t border-borderColor">
                          <div>
                            <h6>
                              <a
                                className="text-base font-bold flex items-center hover:text-primaryColor dark:text-blackColor-dark dark:hover:text-primaryColor"
                                href="instructors/4.html"
                              >
                                <img
                                  alt=""
                                  loading="lazy"
                                  width="400"
                                  height="400"
                                  decoding="async"
                                  data-nimg="1"
                                  className="w-[30px] h-[30px] rounded-full mr-15px"
                                  style={{
                                    color: "transparent",
                                    backgroundSize: "cover",
                                    backgroundPosition: "50% 50%",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                  src="_next/grid_small_4cf21.jpg"
                                />

                                <span className="whitespace-nowrap">
                                  Micle Robin
                                </span>
                              </a>
                            </h6>
                          </div>
                          <div className="text-start md:text-end space-x-1">
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <span className="text-xs text-lightGrey6">
                              (44)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group w-full sm:w-1/2 lg:w-1/3 grid-item filter1 filter3">
                  <div className="sm:px-15px mb-30px">
                    <div className="p-15px bg-whiteColor shadow-brand dark:bg-darkdeep3-dark dark:shadow-brand-dark">
                      <div className="relative mb-2">
                        <a
                          className="w-full overflow-hidden rounded"
                          href="courses/5.html"
                        >
                          <img
                            alt=""
                            fetchpriority="high"
                            width="342"
                            height="215"
                            decoding="async"
                            data-nimg="1"
                            className="w-full transition-all duration-300 group-hover:scale-110"
                            style={{ color: "transparent" }}
                            src="_next/grid_5d230.png"
                          />
                        </a>
                        <div className="absolute left-0 top-1 flex justify-between w-full items-center px-2">
                          <div>
                            <p className="text-xs text-whiteColor px-4 py-[3px] rounded font-semibold bg-orange">
                              Business
                            </p>
                          </div>
                          <button className="text-white bg-black bg-opacity-15 rounded hover:bg-primaryColor">
                            <i className="icofont-heart-alt text-base py-1 px-2"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="grid grid-cols-2 mb-3">
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-book-alt pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                36 Lesson
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-clock-time pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                3 hr 40 min
                              </span>
                            </div>
                          </div>
                        </div>
                        <h5 className="text-xl">
                          <a
                            className="font-semibold text-blackColor mb-10px dark:text-blackColor-dark hover:text-primaryColor dark:hover:text-primaryColor leading-27px"
                            href="courses/5.html"
                          >
                            Data course to under stand about solution
                          </a>
                        </h5>
                        <div className="text-lg font-semibold text-primaryColor mb-4">
                          $40.00
                          <del className="text-sm text-lightGrey4 font-semibold ml-1">
                            / $67.00
                          </del>
                          <span className="ml-6 text-base font-semibold text-secondaryColor3">
                            <del>Free</del>
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 pt-15px border-t border-borderColor">
                          <div>
                            <h6>
                              <a
                                className="text-base font-bold flex items-center hover:text-primaryColor dark:text-blackColor-dark dark:hover:text-primaryColor"
                                href="instructors/5.html"
                              >
                                <img
                                  alt=""
                                  loading="lazy"
                                  width="400"
                                  height="400"
                                  decoding="async"
                                  data-nimg="1"
                                  className="w-[30px] h-[30px] rounded-full mr-15px"
                                  style={{
                                    color: "transparent",
                                    backgroundSize: "cover",
                                    backgroundPosition: "50% 50%",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                  src="_next/grid_small_1c55c.jpg"
                                />

                                <span className="whitespace-nowrap">
                                  Ch. Dickens
                                </span>
                              </a>
                            </h6>
                          </div>
                          <div className="text-start md:text-end space-x-1">
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <span className="text-xs text-lightGrey6">
                              (44)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group w-full sm:w-1/2 lg:w-1/3 grid-item filter2 filter5">
                  <div className="sm:px-15px mb-30px">
                    <div className="p-15px bg-whiteColor shadow-brand dark:bg-darkdeep3-dark dark:shadow-brand-dark">
                      <div className="relative mb-2">
                        <a
                          className="w-full overflow-hidden rounded"
                          href="courses/6.html"
                        >
                          <img
                            alt=""
                            fetchpriority="high"
                            width="342"
                            height="215"
                            decoding="async"
                            data-nimg="1"
                            className="w-full transition-all duration-300 group-hover:scale-110"
                            style={{ color: "transparent" }}
                            src="_next/grid_6e0fe.png"
                          />
                        </a>
                        <div className="absolute left-0 top-1 flex justify-between w-full items-center px-2">
                          <div>
                            <p className="text-xs text-whiteColor px-4 py-[3px] rounded font-semibold bg-secondaryColor">
                              Art &amp; Design
                            </p>
                          </div>
                          <button className="text-white bg-black bg-opacity-15 rounded hover:bg-primaryColor">
                            <i className="icofont-heart-alt text-base py-1 px-2"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="grid grid-cols-2 mb-3">
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-book-alt pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                30 Lesson
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div>
                              <i className="icofont-clock-time pr-5px text-primaryColor text-lg"></i>
                            </div>
                            <div>
                              <span className="text-sm text-black dark:text-blackColor-dark">
                                3 hr 40 min
                              </span>
                            </div>
                          </div>
                        </div>
                        <h5 className="text-xl">
                          <a
                            className="font-semibold text-blackColor mb-10px dark:text-blackColor-dark hover:text-primaryColor dark:hover:text-primaryColor leading-27px"
                            href="courses/6.html"
                          >
                            Big data to under stand about solution pacage
                          </a>
                        </h5>
                        <div className="text-lg font-semibold text-primaryColor mb-4">
                          $40.00
                          <del className="text-sm text-lightGrey4 font-semibold ml-1">
                            / $67.00
                          </del>
                          <span className="ml-6 text-base font-semibold text-secondaryColor3">
                            <del>Free</del>
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 pt-15px border-t border-borderColor">
                          <div>
                            <h6>
                              <a
                                className="text-base font-bold flex items-center hover:text-primaryColor dark:text-blackColor-dark dark:hover:text-primaryColor"
                                href="instructors/6.html"
                              >
                                <img
                                  alt=""
                                  loading="lazy"
                                  width="400"
                                  height="400"
                                  decoding="async"
                                  data-nimg="1"
                                  className="w-[30px] h-[30px] rounded-full mr-15px"
                                  style={{
                                    color: "transparent",
                                    backgroundSize: "cover",
                                    backgroundPosition: "50% 50%",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                  src="_next/grid_small_1c55c.jpg"
                                />

                                <span className="whitespace-nowrap">
                                  Ge. Orwell
                                </span>
                              </a>
                            </h6>
                          </div>
                          <div className="text-start md:text-end space-x-1">
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <i className="icofont-star text-size-15 text-yellow"></i>
                            <span className="text-xs text-lightGrey6">
                              (44)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-register bg-cover bg-center bg-no-repeat lg:mb-150px">
          <div className="overlay bg-blueDark bg-opacity-90 py-20 lg:pt-[90px] lg:pb-0 relative z-0">
            <div>
              <img
                alt=""
                loading="lazy"
                width="96"
                height="89"
                decoding="async"
                data-nimg="1"
                className="absolute top-0 left-0 lg:left-[8%] 2xl:top-10 animate-move-hor block z--1"
                style={{ color: "transparent" }}
                src="_next/register__15b6b.png"
              />

              <img
                alt=""
                loading="lazy"
                width="20"
                height="21"
                decoding="async"
                data-nimg="1"
                className="absolute top-1/2 left-3/4 md:left-2/3 lg:left-1/2 2xl:left-[8%] md:top animate-spin-slow block z--1"
                style={{ color: "transparent" }}
                src="_next/register__29854.png"
              />

              <img
                alt=""
                loading="lazy"
                width="125"
                height="122"
                decoding="async"
                data-nimg="1"
                className="absolute top-20 lg:top-3/4 md:top-14 right-20 md:right-20 lg:right-[90%] animate-move-var block z--1"
                style={{ color: "transparent" }}
                src="_next/register__36466.png"
              />
            </div>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-12 pt-30px gap-x-30px">
                <div
                  className="mb-30px lg:mb-0 pb-0 md:pb-30px xl:pb-0 lg:col-start-1 lg:col-span-7"
                  data-aos="fade-up"
                >
                  <div className="relative">
                    <span className="text-sm font-semibold text-primaryColor bg-whitegrey3 px-6 py-5px mb-5 rounded-full inline-block">
                      Registration
                    </span>
                    <h3 className="text-3xl md:text-[35px] 2xl:text-size-42 leading-[45px] 2xl:leading-2xl font-bold text-whiteColor pb-25px">
                      Register Your
                      <span className="relative after:w-full after:h-[7px] after:bg-secondaryColor after:absolute after:left-0 after:bottom-2 md:after:bottom-4 z-0 after:z-[-1]">
                        Account
                      </span>
                      Get free access to
                      <span className="text-yellow1">60000 </span> online course
                    </h3>
                    <div className="flex gap-x-5 items-center">
                      <div>
                        <button
                          data-url="https://www.youtube.com/watch?v=vHdclsdkp28"
                          className="lvideo relative w-15 h-15 md:h-20 md:w-20 lg:w-15 lg:h-15 2xl:h-70px 2xl:w-70px 3xl:h-20 3xl:w-20 bg-secondaryColor rounded-full flex items-center justify-center"
                        >
                          <span className="animate-buble absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-[180px] h-[180px] border-secondaryColor rounded-full"></span>
                          <span className="animate-buble2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-[180px] h-[180px] border-secondaryColor rounded-full"></span>
                          <img
                            alt=""
                            loading="lazy"
                            width="16"
                            height="20"
                            decoding="async"
                            data-nimg="1"
                            style={{ color: "transparent" }}
                            src="_next/videoaa7c.png"
                          />
                        </button>
                      </div>
                      <div>
                        <p className="text-size-15 md:text-[22px] lg:text-lg 2xl:text-[22px] leading-6 md:leading-9 lg:leading-8 2xl:leading-9 font-semibold text-white">
                          Learn Something new &amp; Build Your Career From
                          Anywhere In The World
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-visible lg:col-start-8 lg:col-span-5 relative z-1 lg:-mb-150px">
                  <form
                    className="p-35px pt-10 bg-lightGrey10 dark:bg-lightGrey10-dark rounded shadow-experience"
                    data-aos="fade-up"
                  >
                    <h3 className="text-xl text-blackColor dark:text-blackColor-dark font-semibold mb-5 font-inter">
                      Fill Your Registration
                    </h3>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-15px py-3 bg-lightGrey8 text-base mb-25px focus:outline-none"
                    />
                    <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-30px">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-15px py-3 bg-lightGrey8 text-base mb-25px focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Phone"
                        className="w-full px-15px py-3 bg-lightGrey8 text-base mb-25px focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address"
                      className="w-full px-15px py-3 bg-lightGrey8 text-base mb-25px focus:outline-none"
                    />
                    <textarea
                      placeholder="Comment"
                      className="w-full px-15px pb-3 pt-5 bg-lightGrey8 text-base mb-25px h-[155px] placeholder:text-blackColor"
                      cols="30"
                      rows="10"
                    ></textarea>
                    <div>
                      <button
                        type="submit"
                        className="text-size-15 text-whiteColor px-25px py-10px border hover:bg-whiteColor inline-block rounded dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor bg-primaryColor border-primaryColor hover:text-primaryColor"
                      >
                        Sign Up
                        <i className="icofont-long-arrow-right"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container pb-100px pt-90px">
            <div className="mb-5 md:mb-10">
              <div className="relative" data-aos="fade-up">
                <div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-primaryColor bg-whitegrey3 px-6 py-6px mb-4 rounded-full inline-block">
                      Pricing Plan
                    </span>
                  </div>
                </div>
                <h3
                  className="text-3xl md:text-[35px] lg:text-size-42 font-bold text-blackColor dark:text-blackColor-dark text-center"
                  data-aos="fade-up"
                >
                  <span className="inline-block text-3xl md:text-[35px] lg:text-size-42 leading-10 md:leading-45px 2xl:leading-13.5">
                    Choose The Best Package <br />
                    For your Learning
                  </span>
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-30px">
              <div data-aos="fade-up">
                <div className="p-10 pt-50px transition duration-300 bg-lightGrey10 hover:bg-whiteColor hover:shadow-plan rounded-lg dark:bg-lightGrey10-dark dark:hover:bg-whiteColor-dark">
                  <div className="relative mb-55px">
                    <h3 className="text-size-28 font-semibold text-blackColor leading-45px mb-15px uppercase dark:text-blackColor-dark">
                      free
                    </h3>
                    <h6 className="text-5xl text-blackColor font-medium mb-15px dark:text-blackColor-dark">
                      <span className="text-size-58 pr-1">$</span>0
                      <span className="text-size-22 text-contentColor dark:text-contentColor-dark">
                        / month
                      </span>
                    </h6>
                    <p className="text-blackColor dark:text-blackColor-dark">
                      Perfect for startup
                    </p>
                    <img
                      alt=""
                      loading="lazy"
                      width="203"
                      height="102"
                      decoding="async"
                      data-nimg="1"
                      className="absolute top-0 right-0 -translate-y-30px"
                      style={{ color: "transparent" }}
                      src="_next/price__1c6b1.png"
                    />
                  </div>
                  <div>
                    <ul className="flex flex-col gap-y-30px mb-30px">
                      <li>
                        <i className="icofont-check text-whiteColor bg-secondaryColor px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          2 user
                        </span>
                      </li>
                      <li>
                        <i className="icofont-check text-whiteColor bg-secondaryColor px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Learning Scope
                        </span>
                      </li>
                      <li>
                        <i className="icofont-close text-whiteColor bg-lightGrey6 px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Team collaboration
                        </span>
                      </li>
                      <li>
                        <i className="icofont-check text-whiteColor bg-lightGrey6 px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Export HTML code
                        </span>
                      </li>
                      <li>
                        <i className="icofont-check text-whiteColor bg-secondaryColor px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Upload Your Logo
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <button
                      type=""
                      className="text-size-15 text-whiteColor px-25px py-10px border hover:bg-whiteColor inline-block rounded dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor w-full bg-primaryColor border-primaryColor hover:text-primaryColor"
                    >
                      Get Started
                    </button>
                    <p className="text-size-15 text-contentColor dark:text-contentColor-dark mt-6 text-center font-medium">
                      No creadit card required
                    </p>
                  </div>
                </div>
              </div>
              <div data-aos="fade-up">
                <div className="p-10 pt-50px transition duration-300 bg-lightGrey10 hover:bg-whiteColor hover:shadow-plan rounded-lg dark:bg-lightGrey10-dark dark:hover:bg-whiteColor-dark">
                  <div className="relative mb-55px">
                    <h3 className="text-size-28 font-semibold text-blackColor leading-45px mb-15px uppercase dark:text-blackColor-dark">
                      basic
                    </h3>
                    <h6 className="text-5xl text-blackColor font-medium mb-15px dark:text-blackColor-dark">
                      <span className="text-size-58 pr-1">$</span>29
                      <span className="text-size-22 text-contentColor dark:text-contentColor-dark">
                        / month
                      </span>
                    </h6>
                    <p className="text-blackColor dark:text-blackColor-dark">
                      Perfect for startup
                    </p>
                    <img
                      alt=""
                      loading="lazy"
                      width="203"
                      height="107"
                      decoding="async"
                      data-nimg="1"
                      className="absolute top-0 right-0 -translate-y-30px"
                      style={{ color: "transparent" }}
                      src="_next/price__2414a.png"
                    />
                  </div>
                  <div>
                    <ul className="flex flex-col gap-y-30px mb-30px">
                      <li>
                        <i className="icofont-check text-whiteColor bg-secondaryColor px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          5 user
                        </span>
                      </li>
                      <li>
                        <i className="icofont-check text-whiteColor bg-secondaryColor px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Learning Scope
                        </span>
                      </li>
                      <li>
                        <i className="icofont-close text-whiteColor bg-lightGrey6 px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Team collaboration
                        </span>
                      </li>
                      <li>
                        <i className="icofont-check text-whiteColor bg-lightGrey6 px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Export HTML code
                        </span>
                      </li>
                      <li>
                        <i className="icofont-check text-whiteColor bg-secondaryColor px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Upload Your Logo
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <button
                      type=""
                      className="text-size-15 text-whiteColor px-25px py-10px border hover:bg-whiteColor inline-block rounded dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor w-full bg-secondaryColor border-secondaryColor hover:text-secondaryColor"
                    >
                      Get Started
                    </button>
                    <p className="text-size-15 text-contentColor dark:text-contentColor-dark mt-6 text-center font-medium">
                      No creadit card required
                    </p>
                  </div>
                </div>
              </div>
              <div data-aos="fade-up">
                <div className="p-10 pt-50px transition duration-300 bg-lightGrey10 hover:bg-whiteColor hover:shadow-plan rounded-lg dark:bg-lightGrey10-dark dark:hover:bg-whiteColor-dark">
                  <div className="relative mb-55px">
                    <h3 className="text-size-28 font-semibold text-blackColor leading-45px mb-15px uppercase dark:text-blackColor-dark">
                      pro
                    </h3>
                    <h6 className="text-5xl text-blackColor font-medium mb-15px dark:text-blackColor-dark">
                      <span className="text-size-58 pr-1">$</span>59
                      <span className="text-size-22 text-contentColor dark:text-contentColor-dark">
                        / month
                      </span>
                    </h6>
                    <p className="text-blackColor dark:text-blackColor-dark">
                      Perfect for startup
                    </p>
                    <img
                      alt=""
                      loading="lazy"
                      width="203"
                      height="102"
                      decoding="async"
                      data-nimg="1"
                      className="absolute top-0 right-0 -translate-y-30px"
                      style={{ color: "transparent" }}
                      src="_next/price__34b2f.png"
                    />
                  </div>
                  <div>
                    <ul className="flex flex-col gap-y-30px mb-30px">
                      <li>
                        <i className="icofont-check text-whiteColor bg-secondaryColor px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          10 user
                        </span>
                      </li>
                      <li>
                        <i className="icofont-check text-whiteColor bg-secondaryColor px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Learning Scope
                        </span>
                      </li>
                      <li>
                        <i className="icofont-close text-whiteColor bg-lightGrey6 px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Team collaboration
                        </span>
                      </li>
                      <li>
                        <i className="icofont-check text-whiteColor bg-lightGrey6 px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Export HTML code
                        </span>
                      </li>
                      <li>
                        <i className="icofont-check text-whiteColor bg-secondaryColor px-1 py-3px mr-15px rounded-full text-xs"></i>
                        <span className="text-lg text-deepblue font-medium dark:text-deepblue-dark">
                          Upload Your Logo
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <button
                      type=""
                      className="text-size-15 text-whiteColor px-25px py-10px border hover:bg-whiteColor inline-block rounded dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor w-full bg-primaryColor border-primaryColor hover:text-primaryColor"
                    >
                      Get Started
                    </button>
                    <p className="text-size-15 text-contentColor dark:text-contentColor-dark mt-6 text-center font-medium">
                      No creadit card required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-lightGrey10 dark:dark:bg-lightGrey10-dark relative">
          <div>
            <img
              alt=""
              loading="lazy"
              width="96"
              height="88"
              decoding="async"
              data-nimg="1"
              className="absolute top-[110px] left-[216px] animate-move-hor z-1"
              style={{ color: "transparent" }}
              src="_next/about_695c1.png"
            />
            <img
              alt=""
              loading="lazy"
              width="20"
              height="20"
              decoding="async"
              data-nimg="1"
              className="absolute top-[320px] left-[162px] md:left-[262px] lg:left-[318px] 2xl:left-[162px] animate-spin-slow z-1"
              style={{ color: "transparent" }}
              src="_next/about_779a3.png"
            />
            <img
              alt=""
              loading="lazy"
              width="125"
              height="123"
              decoding="async"
              data-nimg="1"
              className="absolute top-[430px] left-[156px] md:top-[630px] md:left-[476px] lg:top-[433px] lg:left-[196px] 2xl:top-[400px] 2xl:left-[156px] animate-move-var z-1"
              style={{ color: "transparent" }}
              src="_next/about_9d231.png"
            />
          </div>
          <div className="container pt-20 pb-20 2xl:pt-30 2xl:pb-90px">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
              <div
                className="lg:col-start-1 lg:col-span-1 md:col-start-1 md:col-span-2"
                data-aos="fade-up"
              >
                <div className="relative">
                  <span className="text-sm font-semibold text-primaryColor bg-whitegrey3 px-6 py-6px mb-4 rounded-full inline-block">
                    Course List
                  </span>
                  <h3
                    className="text-3xl md:text-[35px] lg:text-size-42 font-bold text-blackColor dark:text-blackColor-dark"
                    data-aos="fade-up"
                  >
                    <span className="inline-block text-3xl md:text-[35px] lg:text-size-42 leading-10 md:leading-45px 2xl:leading-13.5">
                      What They Say About us
                    </span>
                  </h3>
                  <p className="text-sm md:text-base text-contentColor mt-5 mb-5 2xl:mb-45px dark:text-contentColor-dark">
                    Construction is a general term meaning the art and science
                    to form systems organizations and comes from Latin
                    Construction is
                  </p>
                  <div>
                    <a
                      className="text-size-15 text-whiteColor px-25px py-10px border hover:bg-whiteColor inline-block rounded dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor bg-secondaryColor border-secondaryColor hover:text-secondaryColor"
                      href="#"
                    >
                      Explore More
                      <i className="icofont-long-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div data-aos="fade-up">
                <div className="bg-whiteColor px-25px py-50px mb-22px relative dark:bg-whiteColor-dark">
                  <p className="text-base lg:text-sm 2xl:text-base text-contentColor dark:text-contentColor-dark">
                    “The other hand we denounce righteou indg ation men who are
                    so beguiled and demoraliz by the the mo ment.Dislike men who
                    so development co”
                  </p>
                  <div className="text-xl lg:text-3xl text-whiteColor bg-primaryColor w-10 h-10 lg:w-15 lg:h-15 flex items-center justify-center absolute top-0 left-0 md:-translate-y-1/2 md:-translate-x-1/2 z-20">
                    <i className="icofont-quote-left"></i>
                  </div>
                  <span className="w-0 h-0 border-l-12 border-r-12 border-t-15 border-l-transparent border-r-transparent border-t-whiteColor absolute bottom-[-14px] left-[27px] dark:border-t-whiteColor-dark"></span>
                </div>
                <div className="flex items-center gap-5 2xl:gap-20">
                  <div>
                    <img
                      alt=""
                      loading="lazy"
                      width="80"
                      height="80"
                      decoding="async"
                      data-nimg="1"
                      className="w-20 h-20 rounded-full"
                      style={{
                        color: "transparent",
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat",
                      }}
                      src="_next/about_54e79.png"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl lg:text-lg 2xl:text-xl font-semibold text-blackColor dark:text-blackColor-dark">
                      Robind Jon
                    </h4>
                    <p className="text-base lg:text-size-15 2xl:text-base text-lightGrey9 dark:text-lightGrey9-dark">
                      Desginer TechBoot
                    </p>
                  </div>
                </div>
              </div>
              <div data-aos="fade-up">
                <div className="bg-whiteColor px-25px py-50px mb-22px relative dark:bg-whiteColor-dark">
                  <p className="text-base lg:text-sm 2xl:text-base text-contentColor dark:text-contentColor-dark">
                    “The other hand we denounce righteou indg ation men who are
                    so beguiled and demoraliz by the the mo ment.Dislike men who
                    so development co”
                  </p>
                  <div className="text-xl lg:text-3xl text-whiteColor bg-primaryColor w-10 h-10 lg:w-15 lg:h-15 flex items-center justify-center absolute top-0 left-0 md:-translate-y-1/2 md:-translate-x-1/2 z-20">
                    <i className="icofont-quote-left"></i>
                  </div>
                  <span className="w-0 h-0 border-l-12 border-r-12 border-t-15 border-l-transparent border-r-transparent border-t-whiteColor absolute bottom-[-14px] left-[27px] dark:border-t-whiteColor-dark"></span>
                </div>
                <div className="flex items-center gap-5 2xl:gap-20">
                  <div>
                    <img
                      alt=""
                      loading="lazy"
                      width="80"
                      height="80"
                      decoding="async"
                      data-nimg="1"
                      className="w-20 h-20 rounded-full"
                      style={{
                        color: "transparent",
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat",
                      }}
                      src="_next/about_54e79.png"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl lg:text-lg 2xl:text-xl font-semibold text-blackColor dark:text-blackColor-dark">
                      Robind Jon
                    </h4>
                    <p className="text-base lg:text-size-15 2xl:text-base text-lightGrey9 dark:text-lightGrey9-dark">
                      Desginer TechBoot
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container py-100px">
            <div className="mb-5 md:mb-10" data-aos="fade-up">
              <div className="relative text-center">
                <div>
                  <div>
                    <span className="text-sm font-semibold text-primaryColor bg-whitegrey3 px-6 py-6px mb-4 rounded-full inline-block">
                      News &amp; Blogs
                    </span>
                  </div>
                </div>
                <h3
                  className="text-3xl md:text-[35px] lg:text-size-42 font-bold text-blackColor dark:text-blackColor-dark"
                  data-aos="fade-up"
                >
                  <span className="inline-block text-3xl md:text-[35px] lg:text-size-42 leading-10 md:leading-45px 2xl:leading-13.5">
                    Leatest News &amp; Blog
                  </span>
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-30px">
              <div
                className="lg:col-start-1 lg:col-span-8 group shadow-blog"
                data-aos="fade-up"
              >
                <div className="overflow-hidden relative">
                  <img
                    alt=""
                    loading="lazy"
                    width="756"
                    height="409"
                    decoding="async"
                    data-nimg="1"
                    className="w-full group-hover:scale-110 transition-all duration-300"
                    style={{
                      color: "transparent",
                      backgroundSize: "cover",
                      backgroundPosition: "50% 50%",
                      backgroundRepeat: "no-repeat",
                    }}
                    src="_next/blog_180cf.png"
                  />

                  <div className="text-base md:text-3xl leading-5 md:leading-9 font-semibold text-white px-15px py-5px md:px-6 md:py-2 bg-primaryColor rounded text-center absolute top-5 left-5">
                    20
                    <br />
                    Oct
                  </div>
                </div>
                <div className="p-5 md:p-35px md:pt-10">
                  <h3 className="text-2xl md:text-4xl leading-30px md:leading-45px font-bold text-blackColor hover:text-primaryColor pb-25px dark:text-blackColor-dark dark:hover:text-primaryColor">
                    <a href="blogs/1.html">
                      It is a long established fact that a reader will be
                      Standard Part
                    </a>
                  </h3>
                  <p className="text-base text-contentColor dark:text-contentColor-dark mb-30px">
                    A wonderful serenity has taken possssion of my entire souing
                    like these sweet morning spring whch enjoy with my whole
                    heart I am alone, and feel the charm of existenceths spot
                    whch was create For the bliss of souls like mineing am so
                    happy my dear frend so absori bed in the exquste sens of
                    mere. A wonderful serenity has taken posseson of my entire
                    soung like these sweet mornngs spring whch enjoy …
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11">
                        <img
                          alt=""
                          loading="lazy"
                          width="44"
                          height="45"
                          decoding="async"
                          data-nimg="1"
                          className="rounded-full"
                          style={{ color: "transparent" }}
                          src="_next/blog_2760e.png?url=%2F_next%2Fstatic%2Fmedia%2Fblog_2.d0ed972a.png&amp;w=96&amp;q=75"
                        />
                      </div>
                      <div className="text-sm md:text-lg text-darkdeep5 dark:text-darkdeep5-dark">
                        By:
                        <span className="text-blackColor dark:text-blackColor-dark">
                          Mirnsdo Jons
                        </span>
                      </div>
                    </div>
                    <div>
                      <ul className="flex gap-1">
                        <li>
                          <a
                            href="#"
                            className="text-sm md:text-size-15 w-5 h-5 md:w-[39px] md:h-[39px] flex items-center justify-center border border-borderColor text-darkdeep4 hover:text-primaryColor dark:border-borderColor-dark rounded"
                          >
                            <i className="icofont-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm md:text-size-15 w-5 h-5 md:w-[39px] md:h-[39px] flex items-center justify-center border border-borderColor text-darkdeep4 hover:text-primaryColor dark:border-borderColor-dark rounded"
                          >
                            <i className="icofont-youtube-play"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm md:text-size-15 w-5 h-5 md:w-[39px] md:h-[39px] flex items-center justify-center border border-borderColor text-darkdeep4 hover:text-primaryColor dark:border-borderColor-dark rounded"
                          >
                            <i className="icofont-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="text-sm md:text-size-15 w-5 h-5 md:w-[39px] md:h-[39px] flex items-center justify-center border border-borderColor text-darkdeep4 hover:text-primaryColor dark:border-borderColor-dark rounded"
                          >
                            <i className="icofont-twitter"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-start-9 lg:col-span-4">
                <div className="flex flex-col gap-y-30px">
                  <div className="group shadow-blog" data-aos="fade-up">
                    <div className="overflow-hidden relative">
                      <img
                        alt=""
                        loading="lazy"
                        width="381"
                        height="229"
                        decoding="async"
                        data-nimg="1"
                        className="w-full group-hover:scale-110 transition-all duration-300"
                        style={{ color: "transparent" }}
                        src="_next/blog_32bc2.png"
                      />

                      <div className="text-base md:text-2xl leading-5 md:leading-30px font-semibold text-white px-15px py-5px md:px-22px md:py-7px bg-primaryColor rounded text-center absolute top-5 left-5">
                        22
                        <br />
                        Nov
                      </div>
                    </div>
                    <div className="px-5 py-25px">
                      <h3 className="text-2xl md:text-size-28 leading-30px md:leading-35px font-bold text-blackColor hover:text-primaryColor dark:text-blackColor-dark dark:hover:text-primaryColor">
                        <a href="blogs/2.html">
                          It is a long established fact that a reader will be
                          Standard Part
                        </a>
                      </h3>
                    </div>
                  </div>
                  <div className="group shadow-blog" data-aos="fade-up">
                    <div className="overflow-hidden relative">
                      <img
                        alt=""
                        loading="lazy"
                        width="381"
                        height="229"
                        decoding="async"
                        data-nimg="1"
                        className="w-full group-hover:scale-110 transition-all duration-300"
                        style={{
                          color: "transparent",
                          backgroundSize: "cover",
                          backgroundPosition: "50% 50%",
                          backgroundRepeat: "no-repeat",
                        }}
                        src="_next/blog_40f36.png"
                      />

                      <div className="text-base md:text-2xl leading-5 md:leading-30px font-semibold text-white px-15px py-5px md:px-22px md:py-7px bg-primaryColor rounded text-center absolute top-5 left-5">
                        15
                        <br />
                        Dec
                      </div>
                    </div>
                    <div className="px-5 py-25px">
                      <h3 className="text-2xl md:text-size-28 leading-30px md:leading-35px font-bold text-blackColor hover:text-primaryColor dark:text-blackColor-dark dark:hover:text-primaryColor">
                        <a href="blogs/3.html">
                          It is a long established fact that a reader will be
                          Standard Part
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="fixed top-[100px] 3xl:top-[300px] transition-all duration-300 right-[-50px] hover:right-0 z-xl">
          <button
            className="theme-controller w-90px h-10 bg-primaryColor dark:bg-whiteColor-dark rounded-l-lg2 text-whiteColor px-10px flex items-center dark:shadow-theme-controller"
            onClick={toggleTheme}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-10px w-5 block dark:hidden"
              viewBox="0 0 512 512"
            >
              <path
                d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              ></path>
            </svg>
            <span className="text-base block dark:hidden">Dark</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="hidden mr-10px w-5 dark:block"
              viewBox="0 0 512 512"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
              ></path>
              <circle
                cx="256"
                cy="256"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
              ></circle>
            </svg>
            <span className="text-base hidden dark:block">Light</span>
          </button>
        </div>
      </main>
      <div>
        <button className="scroll-up w-50px h-50px leading-50px text-center text-primaryColor bg-white hover:text-whiteColor hover:bg-primaryColor rounded-full fixed right-5 bottom-[60px] shadow-scroll-up z-medium text-xl dark:text-whiteColor dark:bg-primaryColor dark:hover:text-whiteColor-dark hidden">
          <i className="icofont-rounded-up"></i>
        </button>
      </div>

      <div>
        <div>
          <div className="fixed-shadow left-[-250px]"></div>
        </div>
        <div>
          <div className="fixed-shadow right-[-250px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

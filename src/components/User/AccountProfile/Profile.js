
import React, { useState } from 'react';
import './Profile.css'; // Import CSS chung

const profileData = {
    user: {
      name: "Nguyễn Thành Long",
      username: "longnt108",
      location: "TP. Đà Nẵng - Vietnam",
      joinDate: "24/11/2020",
      avatar: "https://placehold.co/50/008080/FFFFFF?text=NTL",
      frameAvatar: "https://s3-sgn09.fptcloud.com/codelearnstorage/files/attachfiles/Fr_go1_319445bca2aa4c558e8dff6febe11306.png",
      progress: {
        current: 17,
        total: 51,
        percentage: 33.3333,
      },
      mutualFriends: 0,
      education: [
        {
          period: "01/01/2020 - 24/11/2020",
          institution: "FPT University",
          major: "IT",
        },
      ],
      socialLinks: [
        { platform: "Facebook", url: "https://www.facebook.com/datnguyentien1009", icon: "https://codelearn.io/images/facebook-icon.svg", color: "#37599E" },
        { platform: "LinkedIn", url: "", icon: "https://codelearn.io/images/linkedin-icon.svg", color: "#0077B5" },
        { platform: "Twitter", url: "", icon: "https://codelearn.io/images/twitter-icon.svg", color: "#00A2F9" },
      ],
    },
    courses: [
      {
        title: "Foundation course to understand about software",
        image: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
        progress: 15,
        rating: 4.3,
        students: 27232,
      },
    ],
    competitions: [
      {
        title: "FPT SOFTWARE ACADEMY DANANG – CODEWAR 2023 – BREAK YOUR LIMITS",
        image: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
        participants: 183,
        totalParticipants: 229,
        likes: 0,
        totalLikes: 650,
        date: "28/09/2023 - 28/09/2023",
        status: "Ended",
      },
    ],
    practice: {
      totalPoints: 0,
      easy: { points: 0, count: 0 },
      medium: { points: 0, count: 0 },
      hard: { points: 0, count: 0 },
      joined: 0,
    },
    discussions: {
      topics: 0,
      reviews: 0,
      likes: 0,
      comments: 0,
    },
    activities: {
      days: Array(35).fill({}).map((_, i) => ({
        day: i < 31 ? i + 1 : "",
        active: i === 0 || i === 5 ? true : false,
      })),
    },
  };
function Profile({}) {
    const [selectedTab, setSelectedTab] = useState('tab-0');
    const handleTabClick = (tabId) => {
        setSelectedTab(tabId);
      };
      const hasCompletedCourses = profileData?.courses?.some(course => course?.progress === 100) || false;

  if (!profileData || !profileData.courses) {
    return <div>Không có dữ liệu khóa học</div>; // Hiển thị thông báo khi profileData hoặc courses không tồn tại
  }
    return (
<div className="container-custom">
    <div className="justify-center">
      <nav className="w-full py-5">
        <div className="breadcrumbs">
          <a href="/" className="breadcrumb">Trang chủ</a>
          <div className="separator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="chevron-right"
              viewBox="0 0 24 24"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </div>
          <span className="breadcrumb">Hồ sơ</span>
        </div>
      </nav>
    </div>
    <div className="grid-container">
      <div className="profile-card">
        <div className="profile-content">
          <div className="mantine-Group-root mantine-9830cw">
            <a href="/profile/undefined" className="pointer-events-none">
              <div className="avatar-wrapper">
                <img
                  className="frame-avatar"
                  alt="frame-avatar"
                  src={profileData.user.frameAvatar}
                />
                <img
                  className="avatar"
                  src={profileData.user.avatar}
                  alt="avatar"
                />
              </div>
            </a>
          </div>
          <span className="name">{profileData.user.name}</span>
          <a href="/userlevel/exphistory/5264836">
            <div className="progress-bar">
              <div className="progress">
                <div
                  role="progressbar"
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={profileData.user.progress.percentage}
                  className="progress-bar-fill"
                  style={{ width: `${profileData.user.progress.percentage}%` }}
                />
              </div>
              <img
                src="/images/lp.png"
                className="progress-icon"
                alt="progress icon"
              />
              <div className="progress-text">
                {profileData.user.progress.current}/{profileData.user.progress.total}
              </div>
            </div>
          </a>
          <div className="friends">
            <div>{profileData.user.mutualFriends} mutual friend </div>
            <button className="friend-button" type="button" data-button="true">
              <span>Add friend</span>
            </button>
          </div>
          <div className="divider-horizontal" role="separator" />
          <div className="info-section">
            <div className="info-title">Information</div>
          </div>
          <div className="info-details">
            <div className="grid">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user"
                viewBox="0 0 24 24"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx={12} cy={7} r={4} />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
              <span data-tooltip-id="global-tooltip" data-tooltip-place="top" data-tooltip-content={profileData.user.username}>
                {profileData.user.username}
              </span>
            </div>
            <div className="grid">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-map-pin"
                viewBox="0 0 24 24"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx={12} cy={11} r={3} />
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
              </svg>
              <span>{profileData.user.location}</span>
            </div>
            <div className="grid">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-calendar"
                viewBox="0 0 24 24"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <rect x={4} y={5} width={16} height={16} rx={2} />
                <line x1={16} y1={3} x2={16} y2={7} />
                <line x1={8} y1={3} x2={8} y2={7} />
                <line x1={4} y1={11} x2={20} y2={11} />
                <line x1={11} y1={15} x2={12} y2={15} />
                <line x1={12} y1={15} x2={12} y2={18} />
              </svg>
              <span>{profileData.user.joinDate}</span>
            </div>
          </div>
          <div className="divider-horizontal" role="separator" />
          <div className="skills-section">
            <div className="skills-title">Skill</div>
            <div className="skills-details" />
          </div>
          <div className="divider-horizontal" role="separator" />
          <div className="intro-section">
            <div className="intro-title">Introduce</div>
            <span>
              <div data-tooltip-content="" data-tooltip-id="global-tooltip" className="raw-text" />
            </span>
          </div>
          <div className="divider-horizontal" role="separator" />
          <div className="experience-section">
            <div className="experience-title">Experience</div>
            <div />
          </div>
          <div className="divider-horizontal" role="separator" />
          <div className="education-section">
            <div className="education-title">Education</div>
            <div className="timeline">
              {profileData.user.education.map((edu, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-bullet" />
                  <div className="timeline-body">
                    <div className="timeline-title">
                      <div>
                        <div>{edu.period}</div>
                      </div>
                    </div>
                    <div className="timeline-content">
                      <span data-tooltip-id="global-tooltip" data-tooltip-content={edu.institution} data-tooltip-place="top">
                        {edu.institution}
                      </span>
                      <span data-tooltip-id="global-tooltip" data-tooltip-content="" data-tooltip-place="top">
                        {edu.major}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="timeline-item">
                <div className="timeline-bullet" />
                <div className="timeline-body">
                  <div className="timeline-content" />
                </div>
              </div>
            </div>
          </div>
          <div className="divider-horizontal" role="separator" />
          <div className="social-section">
            <div className="social-title">Social network</div>
            {profileData.user.socialLinks.map((link, index) => (
              <div key={index} className="social-details">
                <div style={{ backgroundColor: link.color }} className="p-2 rounded-full">
                  <div className="image-root">
                    <figure className="image-figure">
                      <div className="image-wrapper">
                        <img src={link.icon} alt={link.icon} className="image" />
                      </div>
                    </figure>
                  </div>
                </div>
                <a title={link.url} target="_blank" href={link.url} rel="noopener noreferrer">
                  {link.url || ""}
                </a>
              </div>
            ))}
          </div>
          <div className="divider-horizontal" role="separator" />
          <div className="certificate-section">
            <div className="certificate-title">Certificate</div>
            <div className="certificate-details" />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="learning-section">
          <div className="title-section">
            <div className="title">Study <span className="count">({profileData.courses.length})</span></div>
            <div className="tabs">
            <div className="tabs-list" role="tablist" aria-orientation="horizontal">
            <button
              className={`tab ${selectedTab === 'tab-0' ? 'active' : ''}`}
              type="button"
              data-active={selectedTab === 'tab-0'}
              role="tab"
              id="tab-0"
              aria-selected={selectedTab === 'tab-0'}
              tabIndex={selectedTab === 'tab-0' ? 0 : -1}
              onClick={() => handleTabClick('tab-0')}
            >
              <span className="tab-label">All courses </span>
            </button>
            <button
              className={`tab ${selectedTab === 'tab-2' ? 'active' : ''}`}
              type="button"
              data-active={selectedTab === 'tab-2'}
              role="tab"
              id="tab-2"
              aria-selected={selectedTab === 'tab-2'}
              tabIndex={selectedTab === 'tab-2' ? 0 : -1}
              onClick={() => handleTabClick('tab-2')}
            >
              <span className="tab-label">Studying</span>
            </button>
            <button
              className={`tab ${selectedTab === 'tab-3' ? 'active' : ''}`}
              type="button"
              data-active={selectedTab === 'tab-3'}
              role="tab"
              id="tab-3"
              aria-selected={selectedTab === 'tab-3'}
              tabIndex={selectedTab === 'tab-3' ? 0 : -1}
              onClick={() => handleTabClick('tab-3')}
            >
              <span className="tab-label">Complete </span>
            </button>
          </div>
            </div>
          </div>
          <div className="course-grid">
          {selectedTab === 'tab-0' && (
          profileData.courses.map((course, index) => (
            <a key={index} href="course/1">
              <div className="course-card">
                <div>
                  <div className="image-root">
                    <figure className="image-figure">
                      <div className="image-wrapper">
                        <img src={course.image} alt="course" className="image" />
                      </div>
                    </figure>
                  </div>
                </div>
                <div className="course-details">
                  <span className="course-title">{course.title}</span>
                  <div className="course-info">
                    <div className="star-ratings" title={`${course.rating} Stars`}>
                        <svg className="star-grad">
                          <defs>
                            <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" style={{ stopColor: "rgb(249, 191, 10)", stopOpacity: 1 }} />
                              <stop offset="30%" style={{ stopColor: "rgb(249, 191, 10)", stopOpacity: 1 }} />
                              <stop offset="30%" style={{ stopColor: "rgb(203, 211, 227)", stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: "rgb(203, 211, 227)", stopOpacity: 1 }} />
                            </linearGradient>
                          </defs>
                        </svg>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="star-container">
                            <svg viewBox="0 0 28 27" className={`widget-svg ${i < Math.floor(course.rating) ? '' : i === Math.floor(course.rating) && course.rating % 1 !== 0 ? 'multi-widget-selected' : ''}`}>
                              <path
                                className="star"
                                d="M13.0866 1.04906C13.439 0.258573 14.561 0.258571 14.9134 1.04906L18.1853 8.38939C18.3307 8.71542 18.6387 8.93926 18.9937 8.97673L26.9859 9.82026C27.8466 9.9111 28.1933 10.9782 27.5504 11.5576L21.5804 16.9377C21.3152 17.1767 21.1976 17.5388 21.2716 17.888L22.9391 25.7497C23.1187 26.5963 22.2109 27.2558 21.4612 26.8234L14.4996 22.8082C14.1904 22.6298 13.8096 22.6298 13.5004 22.8082L6.53877 26.8234C5.78907 27.2558 4.88134 26.5963 5.06091 25.7497L6.72838 17.888C6.80245 17.5388 6.68476 17.1767 6.4196 16.9377L0.449621 11.5576C-0.193292 10.9782 0.153429 9.9111 1.01411 9.82026L9.00627 8.97673C9.36125 8.93926 9.66935 8.71542 9.81468 8.38939L13.0866 1.04906Z"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-users"
                        viewBox="0 0 24 24"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx={9} cy={7} r={4} />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                      </svg>
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <span>{course.progress}%</span>
                  </div>
                </div>
                <div className="course-progress">
                  <div className="progress-root">
                    <div
                      role="progressbar"
                      aria-valuemax={100}
                      aria-valuemin={0}
                      aria-valuenow={course.progress}
                      className="progress-bar"
                      data-striped="true"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </a>
          ))
        )}
        {selectedTab === 'tab-2' && (
          profileData.courses.map((course, index) => (
            <a key={index} href="course/1">
              <div className="course-card">
                <div>
                  <div className="image-root">
                    <figure className="image-figure">
                      <div className="image-wrapper">
                        <img src={course.image} alt="course" className="image" />
                      </div>
                    </figure>
                  </div>
                </div>
                <div className="course-details">
                  <span className="course-title">{course.title}</span>
                  <div className="course-info">
                  <div className="star-ratings" title={`${course.rating} Stars`}>
                        <svg className="star-grad">
                          <defs>
                            <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" style={{ stopColor: "rgb(249, 191, 10)", stopOpacity: 1 }} />
                              <stop offset="30%" style={{ stopColor: "rgb(249, 191, 10)", stopOpacity: 1 }} />
                              <stop offset="30%" style={{ stopColor: "rgb(203, 211, 227)", stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: "rgb(203, 211, 227)", stopOpacity: 1 }} />
                            </linearGradient>
                          </defs>
                        </svg>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="star-container">
                            <svg viewBox="0 0 28 27" className={`widget-svg ${i < Math.floor(course.rating) ? '' : i === Math.floor(course.rating) && course.rating % 1 !== 0 ? 'multi-widget-selected' : ''}`}>
                              <path
                                className="star"
                                d="M13.0866 1.04906C13.439 0.258573 14.561 0.258571 14.9134 1.04906L18.1853 8.38939C18.3307 8.71542 18.6387 8.93926 18.9937 8.97673L26.9859 9.82026C27.8466 9.9111 28.1933 10.9782 27.5504 11.5576L21.5804 16.9377C21.3152 17.1767 21.1976 17.5388 21.2716 17.888L22.9391 25.7497C23.1187 26.5963 22.2109 27.2558 21.4612 26.8234L14.4996 22.8082C14.1904 22.6298 13.8096 22.6298 13.5004 22.8082L6.53877 26.8234C5.78907 27.2558 4.88134 26.5963 5.06091 25.7497L6.72838 17.888C6.80245 17.5388 6.68476 17.1767 6.4196 16.9377L0.449621 11.5576C-0.193292 10.9782 0.153429 9.9111 1.01411 9.82026L9.00627 8.97673C9.36125 8.93926 9.66935 8.71542 9.81468 8.38939L13.0866 1.04906Z"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-users"
                        viewBox="0 0 24 24"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx={9} cy={7} r={4} />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                      </svg>
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <span>{course.progress}%</span>
                  </div>
                </div>
                <div className="course-progress">
                  <div className="progress-root">
                    <div
                      role="progressbar"
                      aria-valuemax={100}
                      aria-valuemin={0}
                      aria-valuenow={course.progress}
                      className="progress-bar"
                      data-striped="true"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </a>
          ))
        )}
        {selectedTab === 'tab-3' && (
          hasCompletedCourses ? (
            profileData.courses
              .filter(course => course.progress === 100)
              .map((course, index) => (
                <a key={index} href="course/1">
                  <div className="course-card">
                    <div>
                      <div className="image-root">
                        <figure className="image-figure">
                          <div className="image-wrapper">
                            <img src={course.image} alt="course" className="image" />
                          </div>
                        </figure>
                      </div>
                    </div>
                    <div className="course-details">
                      <span className="course-title">{course.title}</span>
                      <div className="course-info">
                      <div className="star-ratings" title={`${course.rating} Stars`}>
                        <svg className="star-grad">
                          <defs>
                            <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" style={{ stopColor: "rgb(249, 191, 10)", stopOpacity: 1 }} />
                              <stop offset="30%" style={{ stopColor: "rgb(249, 191, 10)", stopOpacity: 1 }} />
                              <stop offset="30%" style={{ stopColor: "rgb(203, 211, 227)", stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: "rgb(203, 211, 227)", stopOpacity: 1 }} />
                            </linearGradient>
                          </defs>
                        </svg>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="star-container">
                            <svg viewBox="0 0 28 27" className={`widget-svg ${i < Math.floor(course.rating) ? '' : i === Math.floor(course.rating) && course.rating % 1 !== 0 ? 'multi-widget-selected' : ''}`}>
                              <path
                                className="star"
                                d="M13.0866 1.04906C13.439 0.258573 14.561 0.258571 14.9134 1.04906L18.1853 8.38939C18.3307 8.71542 18.6387 8.93926 18.9937 8.97673L26.9859 9.82026C27.8466 9.9111 28.1933 10.9782 27.5504 11.5576L21.5804 16.9377C21.3152 17.1767 21.1976 17.5388 21.2716 17.888L22.9391 25.7497C23.1187 26.5963 22.2109 27.2558 21.4612 26.8234L14.4996 22.8082C14.1904 22.6298 13.8096 22.6298 13.5004 22.8082L6.53877 26.8234C5.78907 27.2558 4.88134 26.5963 5.06091 25.7497L6.72838 17.888C6.80245 17.5388 6.68476 17.1767 6.4196 16.9377L0.449621 11.5576C-0.193292 10.9782 0.153429 9.9111 1.01411 9.82026L9.00627 8.97673C9.36125 8.93926 9.66935 8.71542 9.81468 8.38939L13.0866 1.04906Z"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                        <div className="flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-users"
                            viewBox="0 0 24 24"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx={9} cy={7} r={4} />
                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                          </svg>
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <span>{course.progress}%</span>
                      </div>
                    </div>
                    <div className="course-progress">
                      <div className="progress-root">
                        <div
                          role="progressbar"
                          aria-valuemax={100}
                          aria-valuemin={0}
                          aria-valuenow={course.progress}
                          className="progress-bar"
                          data-striped="true"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </a>
              ))
          ) : (
            <div className="no-results" style={{textAlign:'center'}}>No results found</div>
          )
        )}
          </div>
        </div>
        <div className="competition-section">
          <div className="title-section">
            <div className="title">Competition <span className="count">({profileData.competitions.length})</span></div>
            <div className="tabs">
              <div className="tabs-list" role="tablist" aria-orientation="horizontal">
                <button className="tab active" type="button" data-active="true" role="tab" id="tab-2" aria-selected="true" tabIndex={0}>
                  <span className="tab-label">Currently participating</span>
                </button>
                <button className="tab" type="button" role="tab" id="tab-3" aria-selected="false" tabIndex={-1}>
                  <span className="tab-label">Ended</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mb-5 mt-4">
            {profileData.competitions.map((comp, index) => (
              <div key={index} className="competition-card">
                <div className="competition-details">
                  <div className="competition-image">
                    <div className="image-root">
                      <figure className="image-figure">
                        <div className="image-wrapper">
                          <img src={comp.image} alt="" className="image" />
                        </div>
                      </figure>
                    </div>
                  </div>
                  <div className="competition-info">
                    <a href="/fights/detail/442">
                      <span>{comp.title}</span>
                    </a>
                    <div className="competition-stats">
                      <div className="group">
                        <div className="image-root">
                          <figure className="image-figure">
                            <div className="image-wrapper">
                              <img src="https://codelearn.io/images/users-alt.png" alt="users-alt" className="image" />
                            </div>
                          </figure>
                        </div>
                        <div>
                          <strong>{comp.participants}</strong>/{comp.totalParticipants}
                        </div>
                      </div>
                      <div className="group">
                        <div className="image-root">
                          <figure className="image-figure">
                            <div className="image-wrapper">
                              <img src="https://codelearn.io/images/heart.png" alt="heart" className="image" />
                            </div>
                          </figure>
                        </div>
                        <strong>{comp.likes}/{comp.totalLikes}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="competition-meta">
                    <div>{comp.date}</div>
                    <div>{comp.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <div className="pagination-controls">
              <span>Showing 1 - 1 of 1 records</span>
              <div className="pagination-buttons">
                <button type="button" disabled data-disabled="true">
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button type="button" disabled data-disabled="true">
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.219 8l3.3 3.3-.943.943L5.333 8l4.243-4.243.943.943-3.3 3.3z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button type="button" aria-current="page" data-active="true">
                  1
                </button>
                <button type="button" disabled data-disabled="true">
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.781 8l-3.3-3.3.943-.943L10.667 8l-4.243 4.243-.943-.943 3.3-3.3z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button type="button" disabled data-disabled="true">
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="learning-section">
          <div className="title-section">
            <div className="title">Practice</div>
          </div>
          <div className="practice-grid">
            <div className="practice-item">
              <div style={{fontWeight:'700',fontSize:'38px'}}>{profileData.practice.totalPoints}</div>
              <div style={{fontWeight:'700',color: '#2563eb'}}>Total score</div>
            </div>
            <div className="practice-item">
              <div>{profileData.practice.easy.points} <span>point</span></div>
              <div>{profileData.practice.easy.count} Easy lesson</div>
            </div>
            <div className="practice-item">
              <div>{profileData.practice.medium.points} <span>point</span></div>
              <div>{profileData.practice.medium.count} Average post</div>
            </div>
            <div className="practice-item">
              <div>{profileData.practice.hard.points} <span>point</span></div>
              <div>{profileData.practice.hard.count} Difficult lesson</div>
            </div>
          </div>
          <div className="practice-history">
            <div className="practice-history-header">Participated ({profileData.practice.joined})</div>
            <div className="practice-history-body">
              <div>No results found</div>
            </div>
            <div className="flex justify-center hidden">
              {/* <div>{profileData.practice.joined}</div> */}
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="discussion-section">
            <div className="title-section">
              <div className="title">Discuss</div>
            </div>
            <div className="discussion-grid">
              <div className="discussion-item">
                <div className="image-root">
                  <figure className="image-figure">
                    <div className="image-wrapper">
                      <img src="https://codelearn.io/images/cv/topic_1.png" alt="Chủ đề" className="image" />
                    </div>
                  </figure>
                </div>
                <div>{profileData.discussions.topics} Topic</div>
              </div>
              <div className="discussion-item">
                <div className="image-root">
                  <figure className="image-figure">
                    <div className="image-wrapper">
                      <img src="https://codelearn.io/images/cv/vote_1.png" alt="Đánh giá" className="image" />
                    </div>
                  </figure>
                </div>
                <div>{profileData.discussions.reviews} Evaluate</div>
              </div>
              <div className="discussion-item">
                <div className="image-root">
                  <figure className="image-figure">
                    <div className="image-wrapper">
                      <img src="https://codelearn.io/images/cv/like_1.png" alt="Lượt thích" className="image" />
                    </div>
                  </figure>
                </div>
                <div>{profileData.discussions.likes} Likes</div>
              </div>
              <div className="discussion-item">
                <div className="image-root">
                  <figure className="image-figure">
                    <div className="image-wrapper">
                      <img src="https://codelearn.io/images/cv/comment_1.png" alt="Bình luận" className="image" />
                    </div>
                  </figure>
                </div>
                <div>{profileData.discussions.comments} Comment</div>
              </div>
            </div>
          </div>
          <div className="activity-section">
            <div className="title-section">
              <div className="title">Activite</div>
            </div>
            <div className="activity-grid">
              <div>T2</div>
              <div>T3</div>
              <div>T4</div>
              <div>T5</div>
              <div>T6</div>
              <div>T7</div>
              <div>CN</div>
              {profileData.activities.days.map((day, index) => (
                <div key={index}>
                  <div className={`activity-day ${day.active ? (index === 0 ? 'active-1' : 'active-2') : ''}`}>
                    {day.day}
                  </div>
                </div>
              ))}
            </div>
            <div className="activity-footer">
              Activite
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
    
}

export default Profile;
import React, { useState } from 'react';
import './Blog.css';

const mockData = [
  {
    id: 1,
    title: "Hướng Dẫn Code Game Rắn Săn Mồi Trong C++",
    image: "https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/huong-dan-lam-game-ran-san-moi-trong-cpp-63721179615.8205.jpg",
    description: "Rắn săn mồi là một phần tuổi thơ của đa số các lập trình viên. Tại sao chúng ta không thử code lại tựa game này và trải nghiệm thêm một lần nữa nhỉ?",
    tags: ["tutorial", "laptrinh"],
    author: "nguyenvanhieuvn",
    authorProfile: "/profile/63441",
    date: "18/05/2024",
    rating: { value: 5, count: 10 },
    isFeatured: true,
    link: "https://codelearn.iohttps://codelearn.io/sharing/huong-dan-code-game-ran-san-moi"
  },
  {
    id: 2,
    title: "Học C++ Làm Được Gì Cho Đời?",
    image: "https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/hoc-cpp-thi-lam-duoc-gi-63720748434.143.jpg",
    description: "Bài viết này sẽ chỉ cho bạn thấy C++ là một ngôn ngữ lập trình 'siêu chất' với vô vàn ưu điểm vượt trội về hiệu năng so với các ngôn ngữ khác.",
    tags: ["coding", "cpp"],
    author: "nguyenvanhieuvn",
    authorProfile: "/profile/63441",
    date: "18/05/2024",
    rating: { value: 5, count: 9 },
    isFeatured: false,
    link: "https://codelearn.io/sharing/hoc-cpp-lam-duoc-gi-cho-doi"
  },
  {
    id: 3,
    title: "5 Thuật Toán Tìm Kiếm Mọi LTV Nên Biết",
    image: "https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/5-thuat-toan-tim-kiem-moi-ltv-nen-biet-63750183565.6445.jpg",
    description: "Bài viết này sẽ trình bày ngắn gọn về năm thuật toán tìm kiếm cùng với việc triển khai chúng trong C ++ và Java.",
    tags: ["algorithm", "thuattoan", "laptrinh"],
    author: "phanhtrinh",
    authorProfile: "/profile/600133",
    date: "18/05/2024",
    rating: { value: 5, count: 4 },
    isFeatured: false,
    link: "https://codelearn.io/sharing/5-thuat-toan-tim-kiem-moi-ltv-nen-biet"
  },
  {
    id: 4,
    title: "1001 Nguồn Học Cấu Trúc Dữ Liệu Và Giải Thuật Cực Hiệu Quả",
    image: "https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/nguon-hoc-cau-truc-du-lieu-va-giai-thuat-63751397121.1255.jpg",
    description: "Mình bắt đầu gia nhập Amazon dưới vai trò Thực tập sinh Kỹ thuật Phát triển Phần mềm trong 6 tháng kể từ tháng 2 năm 2021. Hôm nay, mình sẽ chia sẻ tất cả các tài nguyên quan trọng mà mình đã theo học về Cấu trúc dữ liệu và Giải thuật trong thời gian qua.",
    tags: ["algorithm", "data", "structure"],
    author: "phanhtrinh",
    authorProfile: "/profile/600133",
    date: "18/05/2024",
    rating: { value: 5, count: 10 },
    isFeatured: false,
    link: "https://codelearn.io/sharing/nguon-hoc-cau-truc-du-lieu-va-giai-thuat"
  },
  {
    id: 5,
    title: "Giải Mã Các Button Phổ Biến Trong Thiết Kế UI",
    image: "https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/how-the-shape-of-a-button-can-influence-user-perception-63722197428.1169.png",
    description: "Các nút xuất hiện rất nhiều xung quanh chúng ta trong các thiết kế UI. Mỗi nút bạn thấy sẽ mang một hình dáng khác nhau. Ý nghĩa đằng sau nó là gì?",
    tags: ["tips", "frontend", "UIUX"],
    author: "3ron",
    authorProfile: "/profile/3305",
    date: "20/05/2024",
    rating: { value: 4.3, count: 6 },
    isFeatured: false,
    link: "https://codelearn.io/sharing/cac-button-pho-bien-trong-thiet-ke-ui"
  },
  {
    id: 6,
    title: "Tạo một trái tim LTV đập bum ba là bum bằng CSS",
    image: "https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/tao-trai-tim-bang-css-63780423827.0622.jpg",
    description: "Vậy là một mùa Valentine lại về. Thiệp hoa quà bánh thì thường quá rồi, IT là vua của các nghề thì mình cũng phải có món quà thật là độc lạ chứ đúng không anh em?",
    tags: ["css"],
    author: "phanhtrinh",
    authorProfile: "/profile/600133",
    date: "20/05/2024",
    rating: { value: 5, count: 4 },
    isFeatured: false,
    link: "https://codelearn.io/sharing/tao-trai-tim-bang-css"
  },
  {
    id: 7,
    title: "4 Ngôn Ngữ Bạn Không Nên Lựa Chọn Năm 2021",
    image: "https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/4-ngon-ngu-khong-nen-hoc-nam-2021-63744832314.7951.jpg",
    description: "Bài viết này chỉ mang tính chất tham khảo để bạn có cái nhìn đa chiều trong ma trận ngôn ngữ lập trình hiện nay.",
    tags: ["laptrinh", "program"],
    author: "bugfixed",
    authorProfile: "/profile/304216",
    date: "18/05/2024",
    rating: { value: 5, count: 18 },
    isFeatured: false,
    link: "https://codelearn.io/sharing/4-ngon-ngu-khong-nen-hoc-nam-2021"
  },
  {
    id: 8,
    title: "Trợ Lý Ảo Đang Phát Triển Như Thế Nào?",
    image: "https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/tro-ly-ao-dang-phat-trien-nhu-the-nao-63729828686.616.jpg",
    description: "Các hãng công nghệ lớn toàn cầu đang chạy đua để chứng minh trợ lý ảo với sự hỗ trợ của AI có thể hiểu đầy đủ và trò chuyện với con người trong một vài năm tới.",
    tags: ["assistant", "voice", "ai"],
    author: "hung*****@gmail.com",
    authorProfile: "/profile/1429199",
    date: "18/05/2024",
    rating: { value: 5, count: 3 },
    isFeatured: false,
    link: "https://codelearn.io/sharing/tro-ly-ao-dang-phat-trien-nhu-the-nao"
  },
  {
    id: 9,
    title: "S.O.L.I.D - Nguyên Tắc Cơ Bản Trong Coding",
    image: "https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/solid-nguyen-tac-co-ban-trong-coding-63724164255.4249.jpeg",
    description: "Có một nguyên tắc cơ bản trong lập trình gọi là SOLID, nếu áp dụng thuần thục, ta thề hứa và đảm bảo con sẽ thành “thánh code”",
    tags: ["coding", "coder", "hoc", "lap", "trinh"],
    author: "giaosucan",
    authorProfile: "/profile/501797",
    date: "18/05/2024",
    rating: { value: 5, count: 4 },
    isFeatured: false,
    link: "https://codelearn.io/sharing/solid-nguyen-tac-co-ban-trong-coding"
  },
  {
    id: 10,
    title: "Bóc Tem Em Kali Linux - Phần 1",
    image: "https://s3-sgn09.fptcloud.com/codelearnstorage/Upload/Blog/boc-tem-kali-linux-phan-1-63726600975.9788.jpg",
    description: "Trước đây hay xài Ubuntu, nhưng dạo này mới thấy có em Kali Linux, hệ điều hành Linux cho giới hacker, bảo mật nên quyết định tải về vọc thử",
    tags: ["linux", "networking", "hacker"],
    author: "giaosucan",
    authorProfile: "/profile/501797",
    date: "18/05/2024",
    rating: { value: 5, count: 1 },
    isFeatured: false,
    link: "https://codelearn.io/sharing/boc-tem-em-kali-linux-phan-1"
  },
];

const FeaturedArticle = ({ title, image, description, tags, author, authorProfile, date, rating, link }) => (
    <div className="w-full relative border-solid shadow-md rounded-md">
      <div className="mantine-Image-root mantine-yxmaw9" style={{ width: "100%" }}>
        <figure className="mantine-qenwvq mantine-Image-figure">
          <div className="mantine-1iugybl mantine-Image-imageWrapper">
            <img src={image} alt={title} className="mantine-zimgu0 mantine-Image-image" style={{ objectFit: "fill", width: "100%", height: "30.75rem" }} />
          </div>
        </figure>
      </div>
      <div className="flex flex-col justify-between" style={{ minHeight: "30.5rem" }}>
        <div className="space-y-4 mt-4">
          <a href={link} className="hover:underline cursor-pointer">
            <div className="mantine-Text-root font-semibold text-2xl mantine-18v78gt">{title}</div>
          </a>
          <span className="text-base mt-2" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", wordBreak: "break-word" }}>
            {description}
          </span>
          <div className="flex gap-3 mt-4">
            {tags.map(tag => (
              <div key={tag} className="bg-[#EBEBEB] flex items-center px-3 rounded-md py-1 border border-[#ddd]">
                <a href={`https://codelearn.io/sharing/tags/${tag}`} className="text-[#898980] text-xs">{tag}</a>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[#4B5563] text-sm">
            <div className="flex gap-1 items-center justify-center">
              <a target="_blank" className="text-primary font-semibold hover:underline truncate max-w-[100px] lg:max-w-[200px]" href={authorProfile}>{author}</a>
            </div>
            <span className="w-[1px] h-4 bg-[#a5adba]" />
            {date}
            <span className="w-[1px] h-4 bg-[#a5adba]" />
            <div className="flex items-center gap-1">
              <div className="star-ratings" title={`${rating.value} Stars`} style={{ position: "relative", boxSizing: "border-box", display: "inline-block" }}>
                <svg className="star-grad" style={{ position: "absolute", zIndex: 0, width: 0, height: 0, visibility: "hidden" }}>
                  <defs>
                    <linearGradient id="starGrad741799532692599" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" className="stop-color-first" style={{ stopColor: "rgb(249, 191, 10)", stopOpacity: 1 }} />
                      <stop offset="0%" className="stop-color-first" style={{ stopColor: "rgb(249, 191, 10)", stopOpacity: 1 }} />
                      <stop offset="0%" className="stop-color-final" style={{ stopColor: "rgb(203, 211, 227)", stopOpacity: 1 }} />
                      <stop offset="100%" className="stop-color-final" style={{ stopColor: "rgb(203, 211, 227)", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                </svg>
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="star-container" style={{ position: "relative", display: "inline-block", verticalAlign: "middle", paddingRight: 3, paddingLeft: index > 0 ? 3 : 0 }}>
                    <svg viewBox="0 0 28 27" className="widget-svg" style={{ width: 16, height: 16, transition: "transform 0.2s ease-in-out" }}>
                      <path className="star" d="M13.0866 1.04906C13.439 0.258573 14.561 0.258571 14.9134 1.04906L18.1853 8.38939C18.3307 8.71542 18.6387 8.93926 18.9937 8.97673L26.9859 9.82026C27.8466 9.9111 28.1933 10.9782 27.5504 11.5576L21.5804 16.9377C21.3152 17.1767 21.1976 17.5388 21.2716 17.888L22.9391 25.7497C23.1187 26.5963 22.2109 27.2558 21.4612 26.8234L14.4996 22.8082C14.1904 22.6298 13.8096 22.6298 13.5004 22.8082L6.53877 26.8234C5.78907 27.2558 4.88134 26.5963 5.06091 25.7497L6.72838 17.888C6.80245 17.5388 6.68476 17.1767 6.4196 16.9377L0.449621 11.5576C-0.193292 10.9782 0.153429 9.9111 1.01411 9.82026L9.00627 8.97673C9.36125 8.93926 9.66935 8.71542 9.81468 8.38939L13.0866 1.04906Z" style={{ fill: "rgb(249, 191, 10)", transition: "fill 0.2s ease-in-out" }} />
                    </svg>
                  </div>
                ))}
              </div>
              <span className="text-xs">{rating.value} <span className="text-[#a5adba]">({rating.count})</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

const RegularArticle = ({ title, image, description, tags, author, authorProfile, date, rating, link, isSideArticle }) => (
  <div className={`mantine-Paper-root mantine-Card-root flex py-3 pl-3 gap-6 ${isSideArticle ? 'flex-col' : 'flex-col lg:flex-row'} mantine-nfyde3`}>
    <div className={`mantine-Image-root ${isSideArticle ? 'w-full' : 'lg:max-w-[260px] lg:min-w-[260px] w-full'} mantine-yxmaw9`} style={{ width: "100%" }}>
      <figure className="mantine-qenwvq mantine-Image-figure">
        <div className="mantine-1iugybl mantine-Image-imageWrapper">
          <img src={image} alt={title} className="mantine-1ecoqyu mantine-Image-image" style={{ objectFit: "fill", width: "100%", height: "10.25rem" }} />
        </div>
      </figure>
    </div>
    <div className="space-y-2">
      <a href={link} className="hover:underline cursor-pointer">
        <span className="text-lg font-semibold" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", wordBreak: "break-word" }}>
          {title}
        </span>
      </a>
      <span className="mt-1 text-[#111111] text-base min-h-[48px]" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", wordBreak: "break-word" }}>
        {description}
      </span>
      <div className="flex gap-3 mt-2">
        {tags.map(tag => (
          <div key={tag} className="bg-[#EBEBEB] flex items-center px-3 rounded-md py-1 border border-[#ddd]">
            <a href={`https://codelearn.io/sharing/tags/${tag}`} className="text-[#898980] text-xs">{tag}</a>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[#4B5563] text-sm">
        <div className="flex gap-1 items-center justify-center">
          <a target="_blank" className="text-primary font-semibold hover:underline truncate max-w-[100px] lg:max-w-[200px]" href={authorProfile}>{author}</a>
        </div>
        <span className="w-[1px] h-4 bg-[#a5adba]" />
        {date}
        <span className="w-[1px] h-4 bg-[#a5adba]" />
        <div className="flex items-center gap-1">
          <div className="star-ratings" title={`${rating.value} Stars`} style={{ position: "relative", boxSizing: "border-box", display: "inline-block" }}>
            <svg className="star-grad" style={{ position: "absolute", zIndex: 0, width: 0, height: 0, visibility: "hidden" }}>
              <defs>
                <linearGradient id="starGrad741799532692599" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className="stop-color-first" style={{ stopColor: "rgb(249, 191, 10)", stopOpacity: 1 }} />
                  <stop offset="0%" className="stop-color-first" style={{ stopColor: "rgb(249, 191, 10)", stopOpacity: 1 }} />
                  <stop offset="0%" className="stop-color-final" style={{ stopColor: "rgb(203, 211, 227)", stopOpacity: 1 }} />
                  <stop offset="100%" className="stop-color-final" style={{ stopColor: "rgb(203, 211, 227)", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="star-container" style={{ position: "relative", display: "inline-block", verticalAlign: "middle", paddingRight: 3, paddingLeft: index > 0 ? 3 : 0 }}>
                <svg viewBox="0 0 28 27" className="widget-svg" style={{ width: 16, height: 16, transition: "transform 0.2s ease-in-out" }}>
                  <path className="star" d="M13.0866 1.04906C13.439 0.258573 14.561 0.258571 14.9134 1.04906L18.1853 8.38939C18.3307 8.71542 18.6387 8.93926 18.9937 8.97673L26.9859 9.82026C27.8466 9.9111 28.1933 10.9782 27.5504 11.5576L21.5804 16.9377C21.3152 17.1767 21.1976 17.5388 21.2716 17.888L22.9391 25.7497C23.1187 26.5963 22.2109 27.2558 21.4612 26.8234L14.4996 22.8082C14.1904 22.6298 13.8096 22.6298 13.5004 22.8082L6.53877 26.8234C5.78907 27.2558 4.88134 26.5963 5.06091 25.7497L6.72838 17.888C6.80245 17.5388 6.68476 17.1767 6.4196 16.9377L0.449621 11.5576C-0.193292 10.9782 0.153429 9.9111 1.01411 9.82026L9.00627 8.97673C9.36125 8.93926 9.66935 8.71542 9.81468 8.38939L13.0866 1.04906Z" style={{ fill: "rgb(249, 191, 10)", transition: "fill 0.2s ease-in-out" }} />
                </svg>
              </div>
            ))}
          </div>
          <span className="text-xs">{rating.value} <span className="text-[#a5adba]">({rating.count})</span></span>
        </div>
      </div>
    </div>
  </div>
);


const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const featuredArticle = mockData.find(article => article.isFeatured);
  const regularArticles = mockData.filter(article => !article.isFeatured);

  const sideArticles = regularArticles.slice(0, 3);

  const remainingArticles = regularArticles.slice(3);
  const articlesPerPage = 4;
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = remainingArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Tính tổng số trang cho danh sách bên dưới
  const totalPages = Math.ceil(remainingArticles.length / articlesPerPage);

  // Xử lý nhấp nút phân trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pb-10">
      <div className="Container_xl__FJY2Y mx-auto">
        <div className="mantine-xg7kom">
          <nav className="mantine-Breadcrumbs-root mantine-o3gyy4">
            <a href="/" className="mantine-Breadcrumbs-breadcrumb">Trang chủ</a>
            <svg viewBox="0 0 24 24" className="icon icon-tabler icon-tabler-chevron-right mantine-i6hryh">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
            <span className="mantine-Breadcrumbs-breadcrumb">Chia sẻ</span>
          </nav>
        </div>
        <div className="mt-5">
          <div className="mantine-Input-wrapper SharingIndex_input__nV63D">
            <input placeholder="Tìm kiếm bài viết" type="text" className="mantine-Input-input mantine-11z98i8" />
          </div>
        </div>
        <div className="mt-5">
          {/* Phần đầu: Bài nổi bật bên trái + 3 bài bên phải với chiều cao đồng đều */}
          <div className="flex flex-col lg:flex-row gap-6 equal-height-wrapper">
            {/* Cột trái: Bài nổi bật */}
            {featuredArticle && (
              <div className="w-full lg:w-1/2">
                <FeaturedArticle {...featuredArticle} />
              </div>
            )}
            {/* Cột phải: 3 bài viết */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-col gap-4">
                {sideArticles.map(article => (
                  <RegularArticle key={article.id} {...article} isSideArticle={true} />
                ))}
              </div>
            </div>
          </div>
          {/* Phần danh sách bên dưới */}
          <div className="space-y-5 mt-6">
            {currentArticles.map(article => (
              <RegularArticle key={article.id} {...article} isSideArticle={false} />
            ))}
          </div>
          {/* Phân trang */}
          {remainingArticles.length > 0 && (
            <div className="mt-11">
              <div className="mantine-Group-root mantine-1ii6byu">
                <button
                  className={`mantine-UnstyledButton-root mantine-Button-root mantine-Pagination-control mantine-1fa6ylq ${currentPage === 1 ? 'mantine-1au6lox' : ''}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <div className="mantine-1wpc1xj mantine-Button-inner">
                    <span className="mantine-1ryt1ht mantine-Button-label">Previous</span>
                  </div>
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={`mantine-UnstyledButton-root mantine-Button-root mantine-Pagination-control mantine-1fa6ylq ${currentPage === index + 1 ? 'mantine-1au6lox' : ''}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    <div className="mantine-1wpc1xj mantine-Button-inner">
                      <span className="mantine-1ryt1ht mantine-Button-label">{index + 1}</span>
                    </div>
                  </button>
                ))}
                <button
                  className={`mantine-UnstyledButton-root mantine-Button-root mantine-Pagination-control mantine-1fa6ylq ${currentPage === totalPages ? 'mantine-1au6lox' : ''}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <div className="mantine-1wpc1xj mantine-Button-inner">
                    <span className="mantine-1ryt1ht mantine-Button-label">Next</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
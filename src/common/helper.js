export const formatCurrency = (value) => {
    return (value || 0).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };
  

  export const getDiscountedPrice = (price, discount) => {
    if (!price || !discount) return price || 0;
    return price * (1 - discount / 100);
  };
  

  export const formatDuration = (minutes) => {
    if (!minutes || minutes <= 0) return "0 phút";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours} giờ` : ""} ${mins > 0 ? `${mins} phút` : ""}`.trim();
  };
  
  export const formatNumber = (value) => {
    return (value || 0).toLocaleString("vi-VN");
  };
  
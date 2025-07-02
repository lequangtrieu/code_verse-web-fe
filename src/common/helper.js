import dayjs from "dayjs";

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
    if (!minutes || minutes <= 0) return "0 min";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours} hr` : ""} ${mins > 0 ? `${mins} min` : ""}`.trim();
};

export const formatNumber = (value) => {
    return (value || 0).toLocaleString("vi-VN");
};

export const formatDate = (dateString) => {
    return dayjs(dateString).format('MMM DD, YYYY'); // Example format: 'Sep 29, 2024'
};
  
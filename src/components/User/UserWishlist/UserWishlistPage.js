import { Card } from "antd";

const UserWishlistPage = () => {
  return (
    <div className="w-full h-full pt-2">
      <Card className="w-full shadow-lg" title="Wishlist">
        <p className="text-gray-500">Your wishlist is currently empty.</p>
      </Card>
    </div>
  );
};

export default UserWishlistPage;

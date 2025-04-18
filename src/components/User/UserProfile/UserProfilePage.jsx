import ProfileItem from "./ProfileItem";

const UserProfilePage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Profile</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      <div className="space-y-2">
        <ProfileItem label="First Name" value="Tien" />
        <ProfileItem label="Last Name" value="Tu" />
        <ProfileItem label="Username" value="tutien" />
        <ProfileItem label="Email" value="tutien@example.com" />
        <ProfileItem label="Phone Number" value="+55 669 4456 25987" />
        <ProfileItem label="Registration Date" value="20, January 2024 9:00 PM" />
        <ProfileItem label="Role" value="Student" />
        <div className="flex items-start mb-4">
          <span className="w-40 text-sm text-gray-500">Biography</span>
          <p className="text-base font-medium text-gray-800">
            Hello, it's really a pain to be followed. I am sorry for the elders, we accuse the chosen one, they do not know that the work repels the laborious, so we can abandon it by just enduring the pleasures and seek the pleasures of life. There is no way to bear it, it prevents the body as if it were something else!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

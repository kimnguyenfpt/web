import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser.user);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <div className="flex flex-col items-center space-y-4">
          {/* Custom Avatar */}
          <img
            src="/img/cunn.jpg"  
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md object-cover"
          />
          <h1 className="text-4xl font-bold text-gray-800 text-center">Hồ Sơ Của Bạn</h1>
        </div>

        {user ? (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-lg text-gray-800">
                <span className="font-medium">Tên đăng nhập: </span> {user.username}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-lg text-gray-800">
                <span className="font-medium">Email: </span> {user.email}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500 font-semibold text-lg mt-6">
            Bạn chưa đăng nhập.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;

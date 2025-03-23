import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminGameForm = () => {
  
      const navigate = useNavigate();
      if (!window.localStorage.getItem("LoginAdmin")) {
        navigate("/loginadmin")
      }
  const [gameData, setGameData] = useState({
    name: '',
    surname: '',
    price: '',
    desc: '',
    link: '',
    release: '',
    platforms: '',
    genre: '',
    developers: '',
    publishers: '',
    inCart: false,
    selected: false,
    isHovered: false,
    isLiked: false,
    rating: '',
    cover: '',
    footage: ''
  });

  const [loading, setLoading] = useState(false);  // حالة التحميل
  const [error, setError] = useState(null);  // تخزين الأخطاء

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGameData({
      ...gameData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost/Game-Store-E-Commerce-main/src/admain/AddGame/index.php", {
        method: "POST",
    
        body: JSON.stringify({
          ...gameData,
          price: Number(gameData.price), 
          rating: Number(gameData.rating),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert('✅ Game added successfully!');
      setGameData({  // إعادة تعيين الحقول بعد الإضافة
  
        name: '',
        surname: '',
        price: '',
        desc: '',
        link: '',
        release: '',
        platforms: '',
        genre: '',
        developers: '',
        publishers: '',
        inCart: false,
        selected: false,
        isHovered: false,
        isLiked: false,
        rating: '',
        cover: '',
        footage: ''
      });

    } catch (error) {
      setError("❌ Failed to add game. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add New Game</h1>

        {error && <p className="text-red-500 text-center">{error}</p>} {/* عرض رسالة الخطأ */}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {['name', 'surname', 'price', 'rating'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type={field === 'price' || field === 'rating' ? 'number' : 'text'}
                    id={field}
                    name={field}
                    value={gameData[field]}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {['release', 'platforms', 'genre', 'developers', 'publishers'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type={field === 'release' ? 'date' : 'text'}
                    id={field}
                    name={field}
                    value={gameData[field]}
                    onChange={handleChange}
                    className="mt-1 w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {['link', 'cover', 'footage'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">{field} URL</label>
                <input
                  type="url"
                  id={field}
                  name={field}
                  value={gameData[field]}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder={`https://example.com/${field}`}
                />
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="desc"
              name="desc"
              rows="4"
              value={gameData.desc}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}`}
            >
              {loading ? "Adding..." : "Add Game"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminGameForm;

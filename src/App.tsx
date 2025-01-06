import React, { useState } from "react";

interface Keyword {
  id: number;
  keyword: string;
  searchVolume: number;
  competition: "Low" | "Medium" | "High";
}

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateMockKeywords = (query: string): Keyword[] => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      keyword: `${query} ${
        [
          "tool",
          "guide",
          "tips",
          "tricks",
          "hacks",
          "ideas",
          "examples",
          "strategies",
          "solutions",
          "how to",
          "tutorial",
          "best practices",
          "checklist",
          "resources",
          "strategies",
          "approaches",
          "insights",
          "reviews",
          "recommendations",
          "FAQS",
        ][i % 20]
      }`,
      searchVolume: Math.floor(Math.random() * 10000) + 1000,
      competition: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)] as
        | "Low"
        | "Medium"
        | "High",
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const mockKeywords = generateMockKeywords(query);
      setKeywords(mockKeywords);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min- bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Free AI Keyword Research Tool
        </h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a keyword or phrase..."
              className="flex-1 px-6 py-4 text-lg text-gray-700 outline-none"
              aria-label="Search keyword"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-8 py-4 hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300"
            >
              {isLoading ? "Generating..." : "Search"}
            </button>
          </div>
        </form>

        {keywords.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {keywords.map((keyword) => (
                <div
                  key={keyword.id}
                  className="p-4 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {keyword.keyword}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        keyword.competition === "Low"
                          ? "bg-green-100 text-green-700"
                          : keyword.competition === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {keyword.competition}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Search Volume: {keyword.searchVolume.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

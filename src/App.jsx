
import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [dynamicInsights, setDynamicInsights] = useState([]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("https://maven-backend-j2mj.onrender.com/upload/", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setResponse(data);
      setDynamicInsights(data.dynamic_insights || []);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Maven Copilot</h1>
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>

        {response && (
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Top Suppliers</h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {response.top_suppliers.map((item, idx) => (
                  <li key={idx}>
                    {item["Supplier Name"]}: ${item["Potential Savings"].toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Outliers</h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {response.outliers.map((item, idx) => (
                  <li key={idx}>
                    {item["Supplier Name"]} - {item["Item Name"]} ({item["CY vs PY WAP USD (Fiscal)"]})
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
              <h2 className="text-lg font-semibold mb-2">Recommended Actions</h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {response.actions.map((action, idx) => (
                  <li key={idx}>
                    <strong>{action.type}</strong>:{" "}
                    {action.supplier || action.note} {action.savings && `- ${action.savings}`}
                  </li>
                ))}
              </ul>
            </div>

            {dynamicInsights.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                <h4 className="font-semibold mb-2">🤖 AI-Generated Insights</h4>
                <ul className="list-disc pl-5 text-sm space-y-2">
                  {dynamicInsights.map((insight, idx) => (
                    <li key={idx}>
                      <strong>{insight.type}:</strong> {insight.insight_text} <br />
                      <em>{insight.recommended_action}</em>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

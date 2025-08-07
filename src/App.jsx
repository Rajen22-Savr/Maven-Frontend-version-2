
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [response, setResponse] = useState(null);
  const [copilotReply, setCopilotReply] = useState("");
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [dynamicInsights, setDynamicInsights] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setFilename(uploadedFile.name);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("https://maven-backend-j2mj.onrender.com/upload/", formData);
    setResponse(res.data);
    setDynamicInsights(res.data.dynamic_insights || []);
    setCopilotReply("I’ve reviewed the file. What would you like help with?");
  };

  const handleCopilotSubmit = () => {
    if (copilotPrompt.trim() === "") return;
    setCopilotReply("🧠 Maven is thinking... (not yet connected to backend)");
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Maven Copilot</h1>
        <p className="text-sm text-gray-400">Your AI assistant for procurement insights</p>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Upload + Insights */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">📁 Upload Procurement File</h2>
              <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 rounded w-full mb-2"
              />
              {filename && <p className="text-sm text-gray-600">Uploaded: {filename}</p>}
              <button
                onClick={handleUpload}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Generate Insights
              </button>
            </div>

            {response && (
              <>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">📊 Top Suppliers by Savings</h4>
                  <ul className="list-disc pl-5 text-sm">
                    {response.top_suppliers.map((item, idx) => (
                      <li key={idx}>
                        {item["Supplier Name"]}: ${item["Potential Savings"].toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">🚩 Pricing Outliers</h4>
                  <ul className="list-disc pl-5 text-sm">
                    {response.outliers.map((item, idx) => (
                      <li key={idx}>
                        {item["Item Name"]} ({item["Supplier Name"]}) – ${item["CY vs PY WAP USD (Fiscal)"]}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold mb-2">🔧 Recommended Actions</h4>
                  <ul className="list-disc pl-5 text-sm">
                    {response.actions.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.type}:</strong>{" "}
                        {item.supplier || item.note || "Review strategy"}
                      </li>
                    ))}
                  </ul>
                </div>

                {dynamicInsights.length > 0 && (
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h4 className="font-semibold mb-2">🤖 AI-Generated Insights</h4>
                    <ul className="list-disc pl-5 text-sm space-y-2">
                      {dynamicInsights.map((insight, idx) => (
                        <li key={idx}>
                          <strong>{insight.type}:</strong> {insight.insight_text}
                          <br />
                          <em>{insight.recommended_action}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Copilot */}
          <div className="flex flex-col bg-white rounded-lg shadow p-4 space-y-4">
            <div className="font-semibold text-lg">🤝 Copilot</div>
            <div className="text-sm text-gray-800 flex-1">
              <p><strong>Maven:</strong> {copilotReply}</p>
            </div>
            <div className="mt-auto">
              <input
                type="text"
                value={copilotPrompt}
                onChange={(e) => setCopilotPrompt(e.target.value)}
                placeholder="Ask Maven anything..."
                className="w-full border p-2 rounded text-sm mb-2"
              />
              <button
                onClick={handleCopilotSubmit}
                className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700"
              >
                Ask Copilot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

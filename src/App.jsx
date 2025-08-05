
// Maven Copilot Version 2
// Adds: AI Copilot Chat Response, Enhanced Layout, System Reply Simulation

import React, { useState, useEffect } from "react";

export default function MavenCopilotV2() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [copilotReply, setCopilotReply] = useState("");

  //useEffect(() => {
    //setResponse({
     // top_suppliers: [
       // { "Supplier Name": "ZAPP (GB) LTD", "Potential Savings": 66329 },
       // { "Supplier Name": "CARPENTER TECH CORP", "Potential Savings": 52333 }
      //],
      //outliers: [
       // { "Supplier Name": "SIGNICAST", "Item Name": "Sleeve", "CY vs PY WAP USD (Fiscal)": 13537 },
        //{ "Supplier Name": "YARDE METALS", "Item Name": "Cap", "CY vs PY WAP USD (Fiscal)": -360 }
      //],
      //actions: [
       // { type: "Renegotiate Pricing", supplier: "ZAPP (GB) LTD" },
        //{ type: "Consolidate Tail Spend", supplier: "YARDE METALS" },
        //{ type: "Rationalize Materials", note: "3 suppliers showing overlap in stainless parts" }
      //]
    //});
  //}, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

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
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handlePrompt = () => {
    if (!prompt.trim()) return;
    setCopilotReply("Great question. Based on your current data, here are the top 3 supplier consolidation opportunities: ZAPP (GB) LTD, SIGNICAST, and YARDE METALS. Consider combining contracts for volume leverage.");
  };

  return (
    <div className="h-screen flex bg-gray-50 text-gray-800 font-sans">
      <aside className="w-64 bg-blue-900 text-white p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Maven Copilot</h1>
          <nav className="mt-6 space-y-3 text-sm">
            <a href="#" className="block hover:text-blue-300">📊 Dashboard</a>
            <a href="#" className="block hover:text-blue-300">📁 Upload</a>
            <a href="#" className="block hover:text-blue-300">🧠 Copilot</a>
          </nav>
        </div>
        <div className="text-xs text-blue-300">© 2025 Maven</div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 shadow-sm">
          <h2 className="text-lg font-semibold">Spend Intelligence Dashboard</h2>
        </header>

        <section className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-md font-bold mb-3">📤 Upload Spend or Contract File</h3>
            <div className="flex gap-4">
              <input type="file" onChange={handleFileChange} className="border px-3 py-2 rounded w-full" />
              <button onClick={handleUpload} className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800">
                Submit
              </button>
            </div>
          </div>

          {response && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-semibold mb-2">💰 Top Suppliers by Potential Savings</h4>
                <ul className="list-disc pl-5 text-sm">
                  {response.top_suppliers.map((item, idx) => (
                    <li key={idx}>{item["Supplier Name"]}: ${Number(item["Potential Savings"]).toLocaleString()}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-semibold mb-2">📉 Unit Price Outliers</h4>
                <ul className="list-disc pl-5 text-sm">
                  {response.outliers.map((item, idx) => (
                    <li key={idx}>{item["Supplier Name"]}, {item["Item Name"]}: ${Number(item["CY vs PY WAP USD (Fiscal)"]).toFixed(2)}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
                <h4 className="font-semibold mb-2">🔧 Recommended Actions</h4>
                <ul className="list-disc pl-5 text-sm">
                  {response.actions.map((item, idx) => (

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
                    <li key={idx}><strong>{item.type}</strong>: {item.supplier || item.note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        <footer className="bg-white border-t p-4 space-y-2">
          <label className="block text-sm font-medium mb-1">🧠 Ask Maven Copilot</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. What are top 3 consolidation opportunities?"
              className="border px-3 py-2 rounded w-full"
            />
            <button
              onClick={handlePrompt}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Ask
            </button>
          </div>
          {copilotReply && (
            <div className="text-sm mt-2 bg-indigo-50 border border-indigo-200 p-3 rounded">
              <strong>Maven:</strong> {copilotReply}
            </div>
          )}
        </footer>
      </main>
    </div>
  );
}

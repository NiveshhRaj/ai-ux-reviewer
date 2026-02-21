import { useEffect, useState } from "react";
import axios from "axios";

function Status() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/status")
      .then(res => setStatus(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">System Status</h1>

      {status && (
        <div className="space-y-2">
          <p>Server: {status.server}</p>
          <p>Database: {status.database}</p>
          <p>LLM: {status.llm}</p>
        </div>
      )}
    </div>
  );
}

export default Status;

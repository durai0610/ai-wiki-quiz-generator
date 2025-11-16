import React, { useEffect, useState } from "react";
import { getHistory, getQuizById } from "../services/api";
import HistoryTable from "../components/HistoryTable";
import QuizDisplay from "../components/QuizDisplay";
import Spinner from "../components/Spinner";

export default function HistoryTab() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistory();
      setRows(data);
    } catch (err) {
      setError(err.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleShowDetails = async (id) => {
    setModalLoading(true);
    setModalData(null);
    try {
      const q = await getQuizById(id);
      setModalData(q);
    } catch (err) {
      alert(err.message || "Failed to fetch quiz details");
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Past Quizzes</h3>
        <div>
          <button 
            onClick={fetchHistory} 
            className="px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-600 text-white"
          >
            Reload
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner size={18} />
      ) : (
        <>
          {error && <div className="text-red-600">{error}</div>}
          <HistoryTable rows={rows} onShowDetails={handleShowDetails} />
        </>
      )}

      {/* Modal */}
      { (modalLoading || modalData) && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalData(null)} />
          <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-6 relative z-20 overflow-auto max-h-[80vh]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold">Quiz Details</h4>
              <button 
                onClick={() => setModalData(null)} 
                className="text-white bg-red-500 px-3 py-1 rounded"
              >
                Close
              </button>
            </div>

            {modalLoading && <Spinner size={18} />}
            {modalData && <QuizDisplay data={modalData} takeModeEnabled={true} />}
          </div>
        </div>
      )}
    </div>
  );
}

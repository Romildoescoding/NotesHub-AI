import { useEffect, useState } from "react";

interface Trend {
  status: string;
  percentage: number;
}

export default function useNotesInsights() {
  const [insights, setInsights] = useState([]);
  const [trend, setTrend] = useState<null | Trend>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setIsFetching(true);
        const res = await fetch(`/api/notes/insights`);
        const data = await res.json();

        // NextResponse.json({
        //   status: "success",
        //   data: chartData,
        //   trend,
        // });

        if (data.status !== "success") throw new Error(data.message);

        setInsights(data.data);
        setTrend(data.trend);
      } catch (error) {
        console.error("❌ Note fetch failed:", error.message);
        setInsights([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchInsights();
  }, []);

  return { insights, trend, isFetching };
}

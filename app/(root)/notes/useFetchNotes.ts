import { useEffect, useState } from "react";

export default function useFetchNotes() {
  const [notes, setNotes] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsFetching(true);
        const res = await fetch(`/api/notes`);
        const data = await res.json();

        if (data.status !== "success") throw new Error(data.message);

        setNotes(data.data);
      } catch (error) {
        console.error("❌ Note fetch failed:", error.message);
        setNotes([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchNotes();
  }, []);

  return { notes, isFetching };
}

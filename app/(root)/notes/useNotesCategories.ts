import { useEffect, useState } from "react";

interface Category {
  category: string;
  Notes: number;
}

export default function useNotesCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsFetching(true);
        const res = await fetch(`/api/notes/insights`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await res.json();

        // NextResponse.json({
        //   status: "success",
        //   data: chartData,
        //   trend,
        // });

        if (data.status !== "success") throw new Error(data.message);
        setCategories(data.data);
      } catch (error) {
        console.error("❌ Note fetch failed:", error.message);
        setCategories([]);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isFetching };
}

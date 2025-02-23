//format for the data should be like
//  const chartData = [
//   { month: "January", Notes: 4 },
//   { month: "February", Notes: 7 },
//   { month: "March", Notes: 2 },
//   { month: "April", Notes: 11 },
//   { month: "May", Notes: 6 },
//   { month: "June", Notes: 3 },
// ];

// and also i need to fetch the data of this month to the previous month like trendinUp or trendingDown whatever you know..

import dbConnect from "@/app/_lib/dbConnect";
import Notes from "@/app/models/NotesModel";
import { NextResponse } from "next/server";
import moment from "moment";
import { verifySession } from "@/app/_lib/session";

export async function GET() {
  try {
    await dbConnect();

    // Fetch all notes
    const notes = await Notes.find().sort({ createdAt: 1 }); // Sort by oldest first

    if (notes.length === 0) {
      return NextResponse.json({
        status: "success",
        data: [],
        trend: null,
      });
    }

    // Extract the latest note's month
    const currentYear = moment().year();
    const latestNoteMonth = moment(notes[notes.length - 1].createdAt).month(); // 0 = Jan, 11 = Dec

    // Initialize an array for counting notes per month
    const monthCounts = Array(latestNoteMonth + 1).fill(0);

    notes.forEach((note) => {
      const noteDate = moment(note.createdAt);
      if (
        noteDate.year() === currentYear &&
        noteDate.month() <= latestNoteMonth
      ) {
        monthCounts[noteDate.month()]++;
      }
    });

    // Generate chart data only up to the latest note's month
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const chartData = months
      .slice(0, latestNoteMonth + 1)
      .map((month, index) => ({
        month,
        Notes: monthCounts[index],
      }));

    // Calculate the trend (last two months)
    const lastMonthCount = monthCounts[latestNoteMonth - 1] || 0;
    const currentMonthCount = monthCounts[latestNoteMonth] || 0;

    let trend = null;
    if (latestNoteMonth > 0) {
      if (lastMonthCount > 0) {
        const percentageChange =
          ((currentMonthCount - lastMonthCount) / lastMonthCount) * 100;
        trend = {
          status: percentageChange > 0 ? "up" : "down",
          percentage: Math.abs(percentageChange.toFixed(2)),
        };
      } else {
        trend = { status: "empty", percentage: 0 };
      }
    }

    return NextResponse.json({
      status: "success",
      data: chartData,
      trend,
    });
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    return NextResponse.json(
      { status: "error", message: "Error fetching notes" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    // Parse request body
    const body = await req.json();
    const { categories } = body; // Optional filter

    // Fetch all notes
    const decoded = await verifySession();
    const { user } = decoded;
    const notes = await Notes.find({ uploaderEmail: user?.email });

    if (notes.length === 0) {
      return NextResponse.json({
        status: "success",
        data: [],
      });
    }

    // Count notes per category
    const categoryCounts = {};

    notes.forEach((note) => {
      note.tags.forEach((tag) => {
        const category = tag.category;
        if (!categoryCounts[category]) {
          categoryCounts[category] = 0;
        }
        categoryCounts[category]++;
      });
    });

    // Convert to the required format and get the top 5 categories
    const chartData = Object.entries(categoryCounts)
      .map(([category, count]) => ({
        category,
        Notes: count,
      }))
      .sort((a, b) => b.Notes - a.Notes) // Sort by Notes count (descending)
      .slice(0, 5); // Get top 5 categories

    return NextResponse.json({
      status: "success",
      data: chartData,
    });
  } catch (error) {
    console.error("❌ Error fetching category-wise notes:", error);
    return NextResponse.json(
      { status: "error", message: "Error fetching category-wise notes" },
      { status: 500 }
    );
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      Allow: "GET, POST, OPTIONS",
    },
  });
}

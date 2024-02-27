"use client";
import { useEffect, useState } from "react";

export default function Vartext() {
  const [exampleService, setExampleService] = useState("photographer");
  const services = [
    "banquet",
    "DJ",
    "lighting tech",
    "caterer",
    "florist",
    "event planner",
    "videographer",
    "makeup artist",
    "hair stylist",
    "wedding coordinator",
    "transportation",
    "decorator",
    "entertainer",
    "sound engineer",
    "security",
    "bartender",
    "waitstaff",
    "valet service",
    "cleaning service",
  ];
  const [bgcolor, setBgcolor] = useState("#FFA500");
  const bgcolors = [
    "#FFD700", // Gold
    "#FF6347", // Tomato
    "#FF4500", // Orange Red
    "#FF69B4", // Hot Pink
    "#FFC0CB", // Pink
    "#DC143C", // Crimson
    "#FF0000", // Red
    "#FF7F50", // Coral
    "#FF8C00", // Dark Orange
    "#FFDAB9", // Peachpuff
    "#FFFF00", // Yellow
    "#ADFF2F", // Green Yellow
    "#00FF00", // Lime
    "#32CD32", // Lime Green
    "#98FB98", // Pale Green
    "#00FA9A", // Medium Spring Green
    "#00FFFF", // Aqua/Cyan
    "#00CED1", // Dark Turquoise
    "#87CEEB", // Sky Blue
    "#4169E1", // Royal Blue
    "#0000FF", // Blue
    "#8A2BE2", // Blue Violet
    "#9400D3", // Dark Violet
    "#800080", // Purple
    "#FF1493", // Deep Pink
    "#4B0082", // Indigo
    "#6A5ACD", // Slate Blue
    "#1E90FF", // Dodger Blue
    "#4682B4", // Steel Blue
  ];

  const getRandomIndex = (array, currentIndex) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * array.length);
    } while (newIndex === currentIndex);
    return newIndex;
  };

  useEffect(() => {
    let colorIndex = -1;
    let serviceIndex = -1;
    const interval = setInterval(() => {
      colorIndex = getRandomIndex(bgcolors, colorIndex);
      serviceIndex = getRandomIndex(services, serviceIndex);
      setBgcolor(bgcolors[colorIndex]);
      setExampleService("      " + services[serviceIndex]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <span
        style={{
          backgroundColor: bgcolor,

          transition: "background-color 0.1s ease-in-out",
        }}
      >
        {exampleService}
      </span>
    </>
  );
}

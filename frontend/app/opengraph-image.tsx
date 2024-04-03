import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Franco Musolino";
export const size = {
  width: 400,
  height: 300,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#689f38",
        }}
      >
        FM
      </div>
    ),
    {
      ...size,
    }
  );
}

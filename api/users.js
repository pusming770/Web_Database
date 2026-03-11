import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    // Pastikan hanya admin yang bisa akses
    const Heaven_Xyou = process.env.Heaven_Xyou || "Heaven_Xyou";
    if (token !== Heaven_Xyou) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Baca file users.json (pastikan ada di root)
    const filePath = path.join(process.cwd(), "users.json");
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Kirim data user langsung dalam bentuk array
    res.status(200).json(users);
  } catch (err) {
    console.error("❌ Gagal membaca users.json:", err);
    res.status(500).json({ error: "Gagal membaca users.json" });
  }
}

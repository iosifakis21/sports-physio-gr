import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Δυναμική εικόνα Open Graph για την αρχική σελίδα (και ό,τι δεν ορίζει δική
 * του). Το Next.js εντοπίζει αυτόματα αυτό το αρχείο και προσθέτει τα
 * `og:image` / `twitter:image` meta tags — δεν χρειάζεται χειροκίνητη δήλωση
 * στο `metadata.openGraph.images`.
 *
 * Σημείωση για τα γραμματοσειρές: η προεπιλεγμένη γραμματοσειρά του `next/og`
 * (Geist) ΔΕΝ περιέχει ελληνικούς χαρακτήρες — τα ελληνικά θα εμφανίζονταν ως
 * κενά πλαίσια. Γι' αυτό φορτώνουμε ρητά Manrope/Inter από το `_og-fonts/`.
 */

export const alt =
  "Sports-Physio.gr — Μιχάλης Σιούλης, Φυσικοθεραπευτής. 5.0 από 73 αξιολογήσεις Google.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Χρώματα από το `src/styles/tokens.css`
const INK_900 = "#0F172A";
const BLUE_700 = "#1D4ED8";
const BLUE_600 = "#2563EB";
const SLATE_300 = "#CBD5E1";

const asset = (...parts: string[]) => join(process.cwd(), "src", "app", ...parts);

export default async function OpengraphImage() {
  const [manropeExtraBold, interRegular, interSemiBold, logo] = await Promise.all([
    readFile(asset("_og-fonts", "Manrope-ExtraBold.ttf")),
    readFile(asset("_og-fonts", "Inter-Regular.ttf")),
    readFile(asset("_og-fonts", "Inter-SemiBold.ttf")),
    readFile(asset("_og-assets", "logo-white.png")),
  ]);

  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK_900,
          // Απαλή μπλε λάμψη πάνω δεξιά, στη γλώσσα του hero της αρχικής.
          backgroundImage: `radial-gradient(circle at 85% 15%, ${BLUE_700}55 0%, ${INK_900}00 55%)`,
          padding: "64px 80px",
          fontFamily: "Inter",
        }}
      >
        {/* Λογότυπο */}
        <div style={{ display: "flex" }}>
          <img src={logoSrc} width={288} height={240} alt="" />
        </div>

        {/* Όνομα site, tagline και σήμα εμπιστοσύνης */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Manrope",
              fontWeight: 800,
              fontSize: 72,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Sports-Physio.gr
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 34,
              color: SLATE_300,
            }}
          >
            Μιχάλης Σιούλης — Φυσικοθεραπευτής
          </div>

          {/* Σήμα εμπιστοσύνης: βαθμολογία Google */}
          <div style={{ display: "flex", marginTop: 36 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: BLUE_600,
                borderRadius: 999,
                padding: "14px 30px",
                fontSize: 30,
                fontWeight: 600,
                color: "#FFFFFF",
              }}
            >
              <span style={{ marginRight: 12, fontSize: 32 }}>★</span>
              <span>5.0 · 73 αξιολογήσεις Google</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manropeExtraBold, style: "normal", weight: 800 },
        { name: "Inter", data: interRegular, style: "normal", weight: 400 },
        { name: "Inter", data: interSemiBold, style: "normal", weight: 600 },
      ],
    }
  );
}

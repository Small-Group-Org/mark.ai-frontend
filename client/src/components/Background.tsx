import React from "react";
import styles from "../styles/Background.module.css";

interface OverlayProps {
  className: string;
  style: React.CSSProperties;
}

const Overlay: React.FC<OverlayProps> = ({ className, style }) => {
  return <div className={className} style={style} />;
};

const Background: React.FC = () => {
  const overlays = [
    { className: styles.Overlay_2_181, style: { left: "10%", top: "15%" } },
    { className: styles.Overlay_2_103, style: { left: "20%", top: "10%" } },
    { className: styles.Overlay_2_106, style: { left: "30%", top: "20%" } },
    { className: styles.Overlay_2_109, style: { left: "40%", top: "25%" } },
    { className: styles.Overlay_2_112, style: { left: "50%", top: "30%" } },
    { className: styles.Overlay_2_115, style: { left: "60%", top: "35%" } },
    { className: styles.Overlay_2_118, style: { left: "70%", top: "40%" } },
    { className: styles.Overlay_2_121, style: { left: "80%", top: "45%" } },
    { className: styles.Overlay_2_124, style: { left: "90%", top: "50%" } },
    { className: styles.Overlay_2_127, style: { left: "15%", top: "55%" } },
    { className: styles.Overlay_2_130, style: { left: "25%", top: "60%" } },
    { className: styles.Overlay_2_133, style: { left: "35%", top: "65%" } },
    { className: styles.Overlay_2_136, style: { left: "45%", top: "70%" } },
    { className: styles.VerticalDivider_2_139, style: { left: "55%", top: "75%" } },
    { className: styles.Overlay_2_142, style: { left: "65%", top: "80%" } },
    { className: styles.Overlay_2_145, style: { left: "75%", top: "85%" } },
    { className: styles.Overlay_2_148, style: { left: "85%", top: "90%" } },
    { className: styles.Overlay_2_151, style: { left: "95%", top: "5%" } },
    { className: styles.VerticalDivider_2_154, style: { left: "5%", top: "95%" } },
    { className: styles.Overlay_2_157, style: { left: "12%", top: "22%" } },
    { className: styles.Overlay_2_160, style: { left: "22%", top: "32%" } },
    { className: styles.VerticalDivider_2_163, style: { left: "32%", top: "42%" } },
    { className: styles.Overlay_2_166, style: { left: "42%", top: "52%" } },
    { className: styles.Overlay_2_169, style: { left: "52%", top: "62%" } },
    { className: styles.Overlay_2_172, style: { left: "62%", top: "72%" } },
    { className: styles.Overlay_2_175, style: { left: "72%", top: "82%" } },
    { className: styles.Overlay_2_178, style: { left: "82%", top: "92%" } },
    { className: styles.Overlay_2_181, style: { left: "92%", top: "12%" } },
    { className: styles.Overlay_2_184, style: { left: "7%", top: "27%" } },
    { className: styles.Overlay_2_187, style: { left: "17%", top: "37%" } },
    { className: styles.Overlay_2_190, style: { left: "27%", top: "47%" } },
    { className: styles.Overlay_2_193, style: { left: "37%", top: "57%" } },
    { className: styles.HorizontalDivider_2_196, style: { left: "47%", top: "67%" } },
    { className: styles.Overlay_2_199, style: { left: "57%", top: "77%" } },
    { className: styles.Overlay_2_202, style: { left: "67%", top: "87%" } },
    { className: styles.Overlay_2_205, style: { left: "77%", top: "97%" } },
    { className: styles.Overlay_2_208, style: { left: "87%", top: "7%" } },
    { className: styles.Overlay_2_211, style: { left: "97%", top: "17%" } },
    { className: styles.Overlay_2_214, style: { left: "3%", top: "29%" } },
    { className: styles.Overlay_2_217, style: { left: "13%", top: "39%" } },
    { className: styles.Overlay_2_220, style: { left: "23%", top: "49%" } },
    { className: styles.Overlay_2_223, style: { left: "33%", top: "59%" } },
    { className: styles.Overlay_2_226, style: { left: "43%", top: "69%" } },
    { className: styles.Overlay_2_229, style: { left: "53%", top: "79%" } },
    { className: styles.Overlay_2_232, style: { left: "63%", top: "89%" } },
    { className: styles.Overlay_2_235, style: { left: "73%", top: "9%" } },
    { className: styles.Overlay_2_238, style: { left: "83%", top: "19%" } },
    { className: styles.Overlay_2_241, style: { left: "93%", top: "29%" } },
    { className: styles.Overlay_2_244, style: { left: "8%", top: "39%" } },
    { className: styles.VerticalDivider_2_247, style: { left: "18%", top: "49%" } },
    { className: styles.Overlay_2_250, style: { left: "28%", top: "59%" } },
    { className: styles.Overlay_2_253, style: { left: "38%", top: "69%" } },
    { className: styles.Overlay_2_256, style: { left: "48%", top: "79%" } },
    { className: styles.Overlay_2_259, style: { left: "58%", top: "89%" } },
    { className: styles.Overlay_2_262, style: { left: "68%", top: "99%" } },
    { className: styles.Overlay_2_265, style: { left: "78%", top: "4%" } },
    { className: styles.Overlay_2_268, style: { left: "88%", top: "14%" } },
    { className: styles.Overlay_2_271, style: { left: "98%", top: "24%" } },
    { className: styles.Overlay_2_274, style: { left: "4%", top: "34%" } },
    { className: styles.Overlay_2_277, style: { left: "14%", top: "44%" } },
    { className: styles.Overlay_2_280, style: { left: "24%", top: "54%" } },
    { className: styles.Overlay_2_282, style: { left: "34%", top: "64%" } },
    { className: styles.Overlay_2_285, style: { left: "44%", top: "74%" } },
    { className: styles.Overlay_2_288, style: { left: "54%", top: "84%" } },
    { className: styles.Overlay_2_291, style: { left: "64%", top: "94%" } },
    { className: styles.HorizontalDivider_2_294, style: { left: "74%", top: "4%" } },
    { className: styles.Overlay_2_297, style: { left: "84%", top: "14%" } },
    { className: styles.Overlay_2_300, style: { left: "94%", top: "24%" } },
    { className: styles.Overlay_2_303, style: { left: "2%", top: "36%" } },
    // Additional overlays to create a denser star field
    { className: styles.Overlay_2_181, style: { left: "6%", top: "45%" } },
    { className: styles.Overlay_2_106, style: { left: "16%", top: "55%" } },
    { className: styles.Overlay_2_115, style: { left: "26%", top: "65%" } },
    { className: styles.Overlay_2_124, style: { left: "36%", top: "75%" } },
    { className: styles.Overlay_2_130, style: { left: "46%", top: "85%" } },
    { className: styles.Overlay_2_136, style: { left: "56%", top: "95%" } },
    { className: styles.Overlay_2_142, style: { left: "66%", top: "5%" } },
    { className: styles.Overlay_2_148, style: { left: "76%", top: "15%" } },
    { className: styles.VerticalDivider_2_154, style: { left: "86%", top: "25%" } },
    { className: styles.Overlay_2_160, style: { left: "96%", top: "35%" } },
    { className: styles.Overlay_2_166, style: { left: "9%", top: "42%" } },
    { className: styles.Overlay_2_172, style: { left: "19%", top: "52%" } },
    { className: styles.Overlay_2_178, style: { left: "29%", top: "62%" } },
    { className: styles.Overlay_2_184, style: { left: "39%", top: "72%" } },
    { className: styles.Overlay_2_190, style: { left: "49%", top: "82%" } },
    { className: styles.HorizontalDivider_2_196, style: { left: "59%", top: "92%" } }
  ];

  return (
    <div className={styles.Background_2_98}>
      <div className={styles.Container_2_100}>
        <div className={styles.Mark_2_101}>
          {overlays.map((overlay, index) => (
            <Overlay
              key={index}
              className={overlay.className}
              style={overlay.style}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Background;

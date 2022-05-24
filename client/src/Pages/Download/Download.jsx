// Core viewer
import { Viewer } from "@react-pdf-viewer/core";
import pdf from "../../Assets/sample.pdf";
import { Worker } from "@react-pdf-viewer/core";

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const Download = () => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
      <Viewer fileUrl={pdf} plugins={[defaultLayoutPluginInstance]} />
    </Worker>
  );
};

export default Download;

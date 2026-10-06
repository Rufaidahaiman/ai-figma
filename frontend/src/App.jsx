import { useState } from "react";
import "./App.css";

function App() {
  const [design, setDesign] = useState({
    elements: [
      {
        id: "heading-1",
        type: "text",
        x: 100,
        y: 80,
        width: 300,
        height: 50,
        text: "Delicious Food",
        color: "#000000",
        fontSize: 32,
        fontWeight: "bold",
      },
      {
        id: "order-button",
        type: "button",
        x: 100,
        y: 160,
        width: 200,
        height: 50,
        text: "Order Now",
        color: "#800080",
        fontSize: 18,
        fontWeight: "normal",
      },
    ],
  });

  const [selectedId, setSelectedId] = useState(null);

  const selectedElement = design.elements.find(
    (element) => element.id === selectedId
  );

  function updateElement(property, value) {
    setDesign((currentDesign) => ({
      ...currentDesign,
      elements: currentDesign.elements.map((element) =>
        element.id === selectedId
          ? { ...element, [property]: value }
          : element
      ),
    }));
  }

  return (
    <div className="app">
      <h1>AI Figma Studio</h1>

      <div className="editor">
        <div className="canvas">
          {design.elements.map((element) => (
            <div
              key={element.id}
              onClick={() => setSelectedId(element.id)}
              style={{
                position: "absolute",
                left: element.x,
                top: element.y,
                width: element.width,
                height: element.height,
                color:
                  element.type === "text" ? element.color : "white",
                backgroundColor:
                  element.type === "button"
                    ? element.color
                    : "transparent",
                fontSize: element.fontSize,
                fontWeight: element.fontWeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: element.type === "button" ? 8 : 0,
                outline:
                  selectedId === element.id
                    ? "2px solid #0066ff"
                    : "none",
              }}
            >
              {element.text}
            </div>
          ))}
        </div>

        <div className="properties">
          <h2>Properties</h2>

          {selectedElement ? (
            <>
              <p>
                Selected: <strong>{selectedElement.id}</strong>
              </p>

              <label>
                Text
                <input
                  value={selectedElement.text}
                  onChange={(e) =>
                    updateElement("text", e.target.value)
                  }
                />
              </label>

              <label>
                Width
                <input
                  type="number"
                  value={selectedElement.width}
                  onChange={(e) =>
                    updateElement("width", Number(e.target.value))
                  }
                />
              </label>
            </>
          ) : (
            <p>Click an element to edit it.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
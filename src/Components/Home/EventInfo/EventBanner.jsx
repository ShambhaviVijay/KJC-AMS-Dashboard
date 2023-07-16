import "./EventBanner.css"
import { useState } from "react"

export default function EventBanner({
  isDisabled = false,
  banner = "",
  takeImage = () => {},
}) {
  const [backDropUrl, setBackDropUrl] = useState(
    banner == ""
      ? "https://firebasestorage.googleapis.com/v0/b/attendance-app-729e7.appspot.com/o/banners%2Fdefault.jpeg?alt=media&token=3b293db5-3d66-425d-a691-890ea8bc1ae4"
      : banner
  )

  const bgStyle = {
    backgroundImage: `url('${backDropUrl}')`,
  }

  const handleBackDropPreview = () => {
    // Direct DOM manipulation is strictly discouraged in React
    let input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = () => {
      let file = input.files[0]
      if (file) {
        const previewUrl = URL.createObjectURL(file)
        setBackDropUrl(previewUrl)
        takeImage(file)
      }
    }
    input.click()
  }

  return (
    <div className="event-banner" style={bgStyle}>
      <button
        type="button"
        className="file-upload-btn"
        disabled={isDisabled}
        onClick={handleBackDropPreview}>
        Upload Event Backdrop
      </button>
    </div>
  )
}

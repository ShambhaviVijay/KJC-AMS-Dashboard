import { useRef } from "react"

// import EventDefaultBG from "../../../assets/event-default.png"
import "./EventBanner.css"

export default function EventBanner({ banner = ""}) {
  const inputRef = useRef(null)
  // const bannerDefault = "url('https://firebasestorage.googleapis.com/v0/b/attendance-app-729e7.appspot.com/o/banners%2Fevent-default-bg.jpg?alt=media&token=9111d94d-8cb3-4630-9714-580fea32a07a')"

  const bannerDefault = "url('https://firebasestorage.googleapis.com/v0/b/attendance-app-729e7.appspot.com/o/banners%2Fdefault.jpeg?alt=media&token=3b293db5-3d66-425d-a691-890ea8bc1ae4')"
  const handleFileUpload = () => {
    inputRef.current.click()
  }

  const bgStyle = {
    backgroundImage: (banner) ? `url(${banner})` : bannerDefault,
  }

  return (
    <div className="event-banner" style={bgStyle}>
      <button type="button" className="file-upload-btn" onClick={handleFileUpload}>
        Upload Banner
      </button>
      <input type="file" accept="image/*" ref={inputRef} />
    </div>
  )
}

import CryptoJS from "crypto-js"
import { useState } from 'react'
import QRCode from "react-qr-code";

const HomePage = () => {
  const [cipherText, setCipherText] = useState('')
  const [decipherText, setDecipherText] = useState()
  const [string, setString] = useState('')
  const [showQR, setShowQR] = useState(false)

  const encrypt = (data) => {
    const encryptString = CryptoJS.AES.encrypt(JSON.stringify(data), 'no pain no gain').toString()
    setCipherText(encryptString);
  }

  const decrypt = () => {
    const bytes = CryptoJS.AES.decrypt(cipherText, 'no pain no gain');
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    setDecipherText(decryptedData.toString());
  }
  
  return (
    <>
      <div>QR Code Generator</div>
      <input type="text" onChange={(e) => setString(e.target.value)}></input>
      <button onClick={() => encrypt(string)}>encrypt</button>
      <p>{cipherText}</p>
      <div>
        <button onClick={decrypt}>decrypt</button>
        <p>{decipherText}</p>
      </div>
      <button onClick={() => setShowQR(true)}>Generate QR Code</button>
      <div style={{marginTop: "20px"}}>
        {
          showQR
          ? <QRCode 
            value={cipherText}
          />
          : ""
        }
      </div>
    </>
  )
}

export default HomePage
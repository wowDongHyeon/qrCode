import React, { useState } from 'react';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import StudentCardForm from './components/StudentCardForm';
import QRScanner from './components/QRScanner';
import { createJWT, verifyJWT } from 'did-jwt';

// DID 생성 함수 (실제 구현에서는 블록체인에 저장)
const createDID = () => {
  return `did:example:${Math.random().toString(36).substr(2, 9)}`;
};

// 간단한 서명 함수 (실제 구현에서는 개인키로 서명해야 함)
const signer = async (data) => {
  // 실제 구현에서는 개인키로 서명해야 함
  // 여기서는 임시로 해시를 사용
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

// JWT 생성 함수
const createStudentJWT = async (studentInfo, did) => {
  const jwt = await createJWT(
    {
      name: studentInfo.name,
      studentId: studentInfo.studentId,
      department: studentInfo.department,
      grade: studentInfo.grade,
      timestamp: new Date().toISOString()
    },
    {
      issuer: did,
      signer: signer
    }
  );
  return jwt;
};

function App() {
  const [qrData, setQrData] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleStudentInfoSubmit = async (info) => {
    try {
      // DID 생성
      const did = createDID();
      console.log(did);
      
      // JWT 생성
      const jwt = await createStudentJWT(info, did);
      
      // 학생 정보와 DID, JWT를 포함한 데이터 생성
      const studentData = {
        ...info,
        did,
        jwt,
        timestamp: new Date().toISOString()
      };

      setStudentInfo(studentData);
      setQrData(JSON.stringify(studentData));
    } catch (error) {
      console.error('Error creating student data:', error);
    }
  };

  const handleScan = async (data) => {
    try {
      // JWT 검증
      const verificationResult = await verifyJWT(data.jwt);
      const isValid = verificationResult.verified;
      
      setScannedData({ 
        ...data,
        isValid,
        verificationDetails: verificationResult
      });
    } catch (error) {
      console.error('Error verifying JWT:', error);
      setScannedData({ ...data, isValid: false });
    }
  };

  const handleScanButtonClick = () => {
    setIsScanning(true);
    setScannedData(null);
  };

  const handleBackButtonClick = () => {
    setIsScanning(false);
    setScannedData(null);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          학생증 QR코드 시스템
        </Typography>
        
        {isScanning ? (
          <>
            <QRScanner onScan={handleScan} />
            {scannedData && (
              <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
                <Typography variant="h6" gutterBottom align="center">
                  스캔 결과
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    <strong>이름:</strong> {scannedData.name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>학번:</strong> {scannedData.studentId}
                  </Typography>
                  <Typography variant="body1">
                    <strong>학과:</strong> {scannedData.department}
                  </Typography>
                  <Typography variant="body1">
                    <strong>학년:</strong> {scannedData.grade}
                  </Typography>
                  <Typography variant="body1">
                    <strong>DID:</strong> {scannedData.did}
                  </Typography>
                  <Typography variant="body1" color={scannedData.isValid ? 'success.main' : 'error.main'}>
                    <strong>상태:</strong> {scannedData.isValid ? '유효함' : '무효함'}
                  </Typography>
                  {scannedData.verificationDetails && (
                    <Typography variant="body2" color="text.secondary">
                      <strong>발급일시:</strong> {new Date(scannedData.verificationDetails.payload.iat * 1000).toLocaleString()}
                    </Typography>
                  )}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBackButtonClick}
                  sx={{ mt: 2 }}
                >
                  돌아가기
                </Button>
              </Paper>
            )}
          </>
        ) : qrData ? (
          <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h6" gutterBottom align="center">
              학생증 QR코드
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <QRCodeSVG
                value={qrData}
                size={256}
                level="H"
                includeMargin={true}
              />
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleScanButtonClick}
                sx={{ mt: 2 }}
              >
                QR코드 스캔하기
              </Button>
            </Box>
          </Paper>
        ) : (
          <StudentCardForm onSubmit={handleStudentInfoSubmit} />
        )}
      </Box>
    </Container>
  );
}

export default App;

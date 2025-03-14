# 학생증 QR코드 시스템

블록체인 기반 DID(Decentralized Identifier)를 활용한 학생증 QR코드 시스템입니다.
(현재는 데모 버전으로, 실제 블록체인 저장은 구현되어 있지 않습니다.)

## 기능

- 학생증 정보 입력
- DID 기반 QR코드 생성 (데모 구현)
- QR코드 스캔 및 검증
- 학생증 정보 표시

## 설치 방법

1. 프로젝트 클론
```bash
git clone [your-repository-url]
cd qrCode
```

2. 기본 의존성 설치
```bash
npm install
```

3. DID 관련 의존성 설치
```bash
npm install did-jwt
npm install @spruceid/didkit-wasm
npm install @decentralized-identity/did-jwt
```

4. QR코드 관련 의존성 설치
```bash
npm install qrcode.react
npm install jsqr
```

5. UI 관련 의존성 설치
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

6. 개발 서버 실행
```bash
npm start
```

## 사용 방법

1. 학생증 정보 입력
   - 이름, 학번, 학과, 학년 정보를 입력합니다.
   - "QR코드 생성" 버튼을 클릭합니다.

2. QR코드 생성
   - 입력된 정보와 DID가 포함된 QR코드가 생성됩니다.
   - 현재는 데모 구현으로, DID는 로컬에서 생성됩니다.
   - "QR코드 스캔하기" 버튼을 클릭하여 스캔 모드로 전환할 수 있습니다.

3. QR코드 스캔
   - 카메라를 사용하여 QR코드를 스캔합니다.
   - 스캔된 정보가 화면에 표시됩니다.
   - DID 검증 결과가 함께 표시됩니다.

## 기술 스택

- React
- Material-UI
- QRCode.react
- jsQR
- did-jwt
- DIDKit
- Decentralized Identity

## 주의사항

- 카메라 접근 권한이 필요합니다.
- HTTPS 환경에서 실행하는 것을 권장합니다.
- 현재는 데모 버전으로, 실제 블록체인 연동이 구현되어 있지 않습니다.
- DID 관련 패키지 설치 시 Node.js 버전 18 이상이 필요할 수 있습니다.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

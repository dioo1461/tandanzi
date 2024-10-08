<div align=center>
  <h4>Front-End</h4>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/React Bootstrap-41E0FD?style=for-the-badge&logo=ReactBootstrap&logoColor=black">
  <h4>Back-End</h4>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=NestJS&logoColor=white">
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white"/>
</div>

# 토이 프로젝트 - 식단 분석 웹사이트, 탄단지

## 기능
### 1. 로그인
<img src="https://github.com/user-attachments/assets/97963133-8684-4ffc-ad9f-3469abe2038d" width="448" height="252">

- 로그인 시 jwt를 발급하고 클라이언트는 이를 브라우저의 localStorage에 저장, 이를 통해 로그인 여부를 판단
- 로그인 실패 시, 에러 메시지와 시도 횟수를 화면에 출력<br><br>


### 2. 회원가입
<img src="https://github.com/user-attachments/assets/0880f8d2-607f-4e72-853f-7b9d64bac15f" width="448" height="252">

- 이메일과 닉네임에 대해서 중복 검사를 진행
- 비밀번호는 6자 이상이어야 하며 최소 1개의 영어, 숫자, 특수문자를 포함해야 함
- (백엔드) 비밀번호는 bcrypt 라이브러리를 적용하여 해싱 후 DB에 저장 <br><br>

### 3. 프로필
<img src="https://github.com/user-attachments/assets/af77901f-7e7c-4e81-9c87-4aae273c45de" width="448" height="252">

- 기본정보 수정 시에 추가 비밀번호 인증을 요구<br>

<img src="https://github.com/user-attachments/assets/af398b9c-b47c-4678-a0d7-94a7524c6975" width="448" height="252">

- 프로필 정보 수정 가능<br><br>

### 4. 식단 분석

https://github.com/user-attachments/assets/42ddc8ab-f444-4a5c-94b5-44b8d7534e92

- '일지에 식단 기록하기' 버튼을 누르면 Modal을 출력하고, Modal에서는 선택한 식품 목록과 나의 식단 일지를 확인할 수 있음
- 식품 영양소 데이터베이스는 식품의약품안전처가 공공데이터포털을 통해 xml 형식으로 제공하는 데이터베이스를 json으로 변환하여 사용했으며, 해당 파일은 프론트엔드 단에서 관리
  
## 사용 예시 영상
https://youtu.be/-k2lH4K-YVo

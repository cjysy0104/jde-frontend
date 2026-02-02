> # 프로젝트명 : JDE ( Just Do Eat,  맛집 소개 및 리뷰 서비스)

### 한 줄 소개
* 저희 서비스는 정보 과잉 시대에 광고성 리뷰를 지양하고, 미식가들의 상호 검증(좋아요/미식대장)을 통해 신뢰할 수 있는 맛집 데이터만을 지도 위에 큐레이션하는 [미식 가이드 플랫폼]입니다.

> ## 메인 화면

<img width="1174" height="916" alt="메인1" src="https://github.com/user-attachments/assets/e9873783-36f4-481d-9324-d457c6fbfc04" />

> ## 프로젝트 소개

&nbsp; 이 프로젝트는 Spring Boot & React 기반의 웹 서비스로,
React 기반 SPA로 사용자 인터랙션과 UI/UX를 담당하며, <br .>
백엔드 API와 연동해 지도 기반 탐색과 리뷰 기능을 제공합니다.
* 메인/리뷰 목록/리뷰 상세/작성·수정 UI
* 이미지 업로드 및 미리보기(기존 이미지 + 신규 이미지 혼합 처리)
* 검색/정렬/필터 및 페이지네이션(또는 무한 스크롤)
* 댓글 작성/수정/삭제 및 좋아요 UI
* 북마크/좋아요 토글 UI
* 지도 기반 맛집 탐색 UI(마커, 리스트 연동 등)
* 관리자 페이지 UI(회원/리뷰/댓글/신고 관리)

> ## 개발 기간

* 2026.01.12 ~ 2026.02.11 (약 4주)
* 개발 인원 총 4명

> ## 주요 기능

* ### 메인(Home) ###
  * 서비스 소개/요약
  * 검색(키워드/지역/리뷰 기반)
  * 베스트 리뷰 노출(좋아요 기반)
  * 미식대장/랭킹 진입(있다면 바로가기)

* ### 지도 탐색(Map) ###
  * 지도에서 맛집/리뷰 위치 마커 표시
  * 내 위치 이동 / 내 주변 보기(반경 탐색)
  * 마커 클릭 → 해당 가게(또는 좌표) 리뷰 리스트 로딩
  * 좌측 리스트 스크롤로 추가 로딩(무한스크롤/페이징)

* ### 리뷰 목록(전체/필터) ###
  * 리뷰 카드 리스트 조회
  * 정렬(최신/좋아요/별점 등)
  * 검색어 필터
  * 키워드(태그) 필터
  * 페이지네이션 또는 무한 스크롤

* ### 리뷰 상세(Review Detail) ###
  * 리뷰 내용/별점/키워드 표시
  * 리뷰 이미지 슬라이더
  * 좋아요 / 북마크 토글
  * 가게 정보(이름/주소) + 지도 미리보기
  * 댓글 리스트 보기(모달/하단 섹션)

* ### 리뷰 작성 및 수정(Review Create) ###
  * 가게 정보 입력(이름/주소/좌표)
  * 별점 입력
  * 키워드 선택
  * 이미지 업로드(최대 N장) + 미리보기/삭제
  * 기존 리뷰/이미지 불러오기(URL 기반)
  * 기존 이미지 유지/삭제 선택

* ### 댓글(리뷰 상세 내 / 댓글 모달) ###
  * 댓글 CRUD
  * 댓글 신고
 
* ### 미식대장(캡틴) ###
  * 미식대장 리스트 조회
  * 미식대장 프로필/랭킹 정보(있다면)
  * 미식대장별 리뷰 모아보기 진입

* ### 마이페이지(My) ###
  * 내 프로필 조회
  * 내 정보 수정(이름/닉네임/전화/비번)
  * 프로필 이미지 변경(업로드/기본이미지 선택)
  * 내 리뷰/댓글 목록(수정/삭제)
  * 회원 탈퇴

* ### 관리자(Admin) ###
  * 대시보드 - 회원/리뷰/댓글/신고 현황 요약, 월별 리뷰 수 등 통계
  * 관리자 회원 관리
  * 관리자 리뷰 관리
  * 관리자 댓글 관리
  * 관리자 신고 관리
  * 관리자 기본이미지 관리
 
> ## 기술 스택
### Frontend
* JavaScript
* React
* Styled-Components
* lucide-react
* Axios

> ## 프로젝트 구조
<img width="166" height="625" alt="image" src="https://github.com/user-attachments/assets/ff4cc234-8f47-4089-8ced-a73bc71d30eb" />


> ## 주요 트러블 슈팅

> ## 배운점

> ## 팀원 정보


| 이름 | 담당 | GitHub |
|------|------------------------|------------------------------|
| 안준영 (팀장) | 회원관리 기능 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/Ahnjunyoung927) &nbsp; (https://github.com/Ahnjunyoung927) |
| 선승제 | 관리자 기능 및 지도 기반 탐색 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/seung-2001) &nbsp; (https://github.com/seung-2001)|
| 유성현 | 좋아요/북마크 기능 및 회원관리 기능  | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/yoosh0610) &nbsp; (https://github.com/yoosh0610)|
| 최준영 | 리뷰 조회 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/cjysy0104) &nbsp; (https://github.com/cjysy0104)|


> ## 문의
* Email

| 이름 | 이메일 |
|--------|---------------------|
| 안준영 | younge64@naver.com, younge6400@gmail.com |
| 선승제 | ssj01022734558@gmail.com |
| 유성현 | yoo31318@gmail.com |
| 최준영 | cjysy0104@gmail.com |
* GitHub Issues 활용

# [goodprice-map](https://coiger.github.io/goodprice-map/)
**Come and see** : https://coiger.github.io/goodprice-map/  
- [행정안전부 착한가격업소](https://www.goodprice.go.kr/index.jsp)를 지도로 보기 위한 프로젝트
- 착한가격업소는 취지가 참 좋은 제도인 것 같다.
- 자주 방문하고 싶어서 지도 상에서, 내 위치 혹은 특정 위치 근처의 착한가격업소를 확인하고 싶은데..
- 공식 앱이 더 이상 다운로드되지 않는 것 같아 직접 만들어보았다.
- 더 많은 사람이 착한가격업소를 방문하기를 바란다.

## 데이터
- [행정안전부 착한가격업소](https://www.goodprice.go.kr/index.jsp)에서 모든 업소 목록을 엑셀로 다운로드
- 데이터 검증은 별도로 진행하지 않았다. 건수가 많아 일일히 확인하지 않아 오류가 있을 수 있다.
  - e.g., 전화번호, 주소 오류 등
- 주차 가능 여부 등 엑셀로 제공되지 않는 데이터는 사용하지 않았다.

### 전처리
#### 위도 경도 계산
https://colab.research.google.com/drive/1TdDXTQ74lNTKl9xjIlk9BnAZpgUUVi_x?authuser=0#scrollTo=iEJ4f1dhEmTz
1. geocoders의 Nominatim을 사용하여 주소 값을 기준으로 위도 경도 계산
2. 위도 경도가 계산되지 않는 장소는 다시 카카오맵 search api를 사용해 계산해본다.

#### 데이터 필터링
1. 최종적으로 위도 경도 계산에 실패한 데이터 제외
2. 업종 정보가 빈 값인 데이터 제외

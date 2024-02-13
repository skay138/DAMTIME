
# DAMTIME : 흡연구역 위치 공유 서비스
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-01](https://github.com/skay138/DAMTIME/assets/102957619/11340bec-30de-4e24-8d01-6f3a4f043855)
DAMTIME은 사용자 기반의 흡연구역 위치 공유 서비스입니다. 공인된 흡연구역 정보뿐만 아니라 사용자가 직접 새로운 흡연구역을 등록할 수 있습니다.

## 요약

- 기술 스택 : Python(Django), MySQL, Nginx, Dart(Flutter)
- 진행 기간 : 2022.12 ~ 2023.02 (약 2개월)
- 개발 인원 : FE 1명, BE 1명

### 기술 설명
- Backend
    - request와 response를 이용한 데이터 송수신
    - django admin을 활용하여 관리 페이지 구현
    - swagger를 활용하여 API 문서화
    - 이미지 등 media data 핸들링
- Frontend
    - 회원가입/로그인 : google sign in, firebase auth 이용하여 소셜로그인 구현
    - 인증 : http header의 Authorization 이용
    - API : image데이터 전달을 위한 MultipartRequest를 비롯한 API 작성
    - 검색 : 유저와 게시글(제목, 작성자) 검색 페이지 구현
    - 게시글, 프로필 CRUD 페이지 구현

### 다음과 같은 사항을 고려했습니다.
### - Backend
#### 1. 데이터 정규화
데이터 수집을 위해 공공데이터포털([https://www.data.go.kr/](https://www.data.go.kr/))을 이용했습니다. 구마다 제공된 csv파일의 형식이 달랐기 때문에 정규화를 거쳐 유의미한 데이터로 정제했습니다. 또한, 위도와 경도가 제공되지 않아 Geocode를 통해 위도 경도를 추출했습니다. 이후 실제 위치를 구별로 시각화하여 확인해 오류 데이터를 보정 했습니다.
#### 2. https
geolocation의 현재 위치 정보를 사용하기 위해 https 방식이 필요했습니다. 이를 위해 DNS를 취득하고 SSL 인증서를 발급 및 적용하여 해결했습니다.
### - Frontend
#### 1. 배포 자동화
웹페이지를 배포하기 위해 자료를 수집했습니다. 여러 방법 중 Netlify를 이용하면 업데이트를 자동화할 수 있어 이 방법을 채택하게 되었습니다. Git repository의 branch를 연결해 해당 branch에 변동사항이 생기면 자동으로 배포해줍니다. 프로젝트를 진행하며 build branch를 따로 두어 배포 소스를 관리했습니다.

## 🎞️ 시연 영상

  ### [https://youtu.be/skkrwbdKiZA](https://youtu.be/skkrwbdKiZA)

## 🌉 기획 배경

2022년 여름, 한반도 대부분의 지역은 폭우로 인해 많은 피해를 봤습니다. 제가 지내고 있는 서울 역시 이 피해에서 자유롭지 못했습니다. 피해의 원인으로는 여러가지가 있었지만, 그 중 하나는 담배꽁초였습니다. 물론 주요 원인으로 꼽기엔 큰 영향을 끼쳤다고 보기 어려울 수 도 있지만, 뉴스에 보도될 만큼 어느정도 비중을 차지했다고 생각했습니다. 이런 문제에서 착안하여 평소 흡연자가 담배를 지정된 곳에서 피고 꽁초를 처리하면 좀 더 쾌적한 거리 문화를 만들어가리라 기대했습니다. “DAMTIME” 프로젝트를 통해 흡연자가 공인된 흡연구역에서 흡연을 하고, 추가적인 흡연장소가 있다면 사용자끼리 공유할 수 있는 플랫폼을 기획하였습니다.

## 📖 상세 내용

![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-02](https://github.com/skay138/DAMTIME/assets/102957619/e6b65886-da3a-4106-831b-33c3cb0eb0e5)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-03](https://github.com/skay138/DAMTIME/assets/102957619/44dc5d5f-49fc-4b73-9528-20f194029736)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-04](https://github.com/skay138/DAMTIME/assets/102957619/d88cd593-f759-4f07-a81b-20c0af4edbc6)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-05](https://github.com/skay138/DAMTIME/assets/102957619/09f36368-f5a7-42a5-aa96-e61147108cbb)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-06](https://github.com/skay138/DAMTIME/assets/102957619/4358c6a6-6ded-47d8-8c65-ee75d491549f)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-07](https://github.com/skay138/DAMTIME/assets/102957619/14887f19-b68e-4cb2-bcae-43e487f06eee)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-08](https://github.com/skay138/DAMTIME/assets/102957619/322cff14-ac2e-4ccf-b9a5-9c2e19b4dd33)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-09](https://github.com/skay138/DAMTIME/assets/102957619/ca7ab153-3115-4c38-a298-9288812f0263)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-10](https://github.com/skay138/DAMTIME/assets/102957619/34f6e435-08de-443c-b08c-bd38304dd21b)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-11](https://github.com/skay138/DAMTIME/assets/102957619/edc9becc-986c-4015-b9b1-517062a3bced)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-13](https://github.com/skay138/DAMTIME/assets/102957619/530008e2-be36-47b4-8a89-4bbf22309edd)
![%EB%8B%B4%ED%83%90%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C(%EA%B0%9C%EC%9D%B8%EC%9A%A9)-14](https://github.com/skay138/DAMTIME/assets/102957619/9a0cb473-b1fd-4a14-b76b-ba6d867494aa)


## 📝 메모

1. 데이터 수집을 위해 공공데이터포털([https://www.data.go.kr/](https://www.data.go.kr/))을 이용했습니다. 저희는 이미 확실한 프로젝트 목표가 있었기 때문에 흡연구역데이터만을 이용했지만, 사이트의 인기 및 최신 데이터를 둘러보는 것 만으로도 요즘 한국인의 관심사가 무엇인지 얼추 파악할 수 있을 것 같았습니다. 이는 추후 제가 관심있는 분야의 시장 트렌드 파악에 도움이 되리라 생각하고, 앞으로도 프로젝트를 진행함에 앞서 공공데이터포털을 참고해야겠다고 생각했습니다.
2. 프로젝트를 진행하는 데 있어서 가장 중요한 단계는 기획과 설계임을 크게 느꼈습니다. 같은 팀이라 할지라도 아이디어를 구체화하여 공유하지 않으면 구성원 간 어긋나는 부분이 생길 수 있습니다. 또한, 이 단계가 충분히 구체적이지 않다면 추후 구현 단계에서 한계점에 봉착할 가능성이 있습니다.

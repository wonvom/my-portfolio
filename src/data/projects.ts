import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "battery-automation",
    title: "배터리 전극 절연막 두께 데이터 자동화",
    period: "2024.04 — 2025.03",
    role: "검사 장비 유지보수 및 데이터 분석/자동화",
    problem:
      "배터리 전극 공정에서 절연막 두께 데이터가 담긴 CSV 파일이 쌓여갔고, 검사팀은 특정 랏/날짜/공정 전후 데이터를 비교하기 위해 수기로 엑셀 시트에 일일이 찾아 입력했음. 생산 초기에는 팀장들이 직접 처리했지만, 생산량이 증가하면서 수작업에 드는 시간이 기하급수적으로 늘어났음.",
    solution:
      "Python 기반 자동화 프로그램을 직접 제안하고 개발했음. 처음에는 두께 추이를 단순 시각화하는 수준에서 출발해, 점진적으로 제품 ID/시간 범위/이상치 구간 등 원하는 조건을 한 번에 조회/비교할 수 있도록 기능을 확장했음. 이진 탐색(bisect)을 적용해 대용량 로그에서 목표 시간대의 데이터를 빠르게 탐색하고, 이상치 제거(2σ 필터링)까지 포함한 전처리/분석/시각화 파이프라인을 구축했음.",
    result: "수일 걸리던 데이터 추출/정리 작업을 획기적으로 단축 — 절감된 시간을 미검/과검 등 품질/수율 분석에 집중해 현장 효율성 극대화",
    outcome:
      "수작업으로 수일이 걸리던 분석 리드타임을 획기적으로 단축했음. 데이터 정리에 쓰던 시간을 미검/과검 분석 등 품질/수율 향상에 집중할 수 있게 되어 현장 효율성이 극대화됐음.",
    learned:
      "현장 문제를 직접 발견하고 자동화를 제안/개발하는 주도적 문제 해결 경험. 이진 탐색 알고리즘의 실전 적용과 비정형 산업 데이터를 파이프라인으로 연결하는 설계 역량.",
    tags: ["Python", "데이터 자동화", "이진 탐색", "시각화", "matplotlib", "pandas"],
    relatedRoles: ["데이터 엔지니어", "SW 개발자"],
    featured: true,
    preview: "수일 → 30분",
    imageUrl: "/battery-electrode.svg",
    imageAlt: "배터리 전극 절연막 단면 구조도",
    imageGallery: [],
    codeSnippet: {
      language: "python",
      filename: "find_average_thickness.py",
      code: `from bisect import bisect_left, bisect_right
from datetime import datetime

def time_to_seconds(time_str):
    time_obj = datetime.strptime(time_str, '%H:%M:%S')
    return time_obj.hour * 3600 + time_obj.minute * 60 + time_obj.second


def find_average_thickness(file_path, time_str):
    inline_index = load_inline_index(file_path)
    if inline_index is None:
        return None

    seconds_list, raw_thickness_list = inline_index
    target_seconds = time_to_seconds(time_str)

    start = bisect_left(seconds_list, target_seconds - 4)
    end = bisect_right(seconds_list, target_seconds + 5)

    thickness_list = [value for value in raw_thickness_list[start:end] if value != 0]
    if not thickness_list:
        return None

    mean = sum(thickness_list) / len(thickness_list)
    std_dev = (sum((x - mean) ** 2 for x in thickness_list) / len(thickness_list)) ** 0.5
    filtered_list = [x for x in thickness_list if abs(x - mean) <= 2 * std_dev]

    if not filtered_list:
        return None

    return round(sum(filtered_list) / len(filtered_list), 3)`,
    },
    codeSnippets: [],
    diagram: `flowchart LR
    A["공정 로그 데이터"] --> B["조건에 맞는 로그 위치 탐색"]
    B --> C["가운데 지점 확인"]
    C --> D{"목표 조건이 앞/뒤 어디에 있는가?"}
    D -->|앞쪽| E["뒤 절반 제외"]
    D -->|뒤쪽| F["앞 절반 제외"]
    E --> G["남은 구간에서 다시 가운데 확인"]
    F --> G
    G --> H["조건과 일치하는 로그 위치 찾기"]
    H --> I["해당 구간의 두께 데이터 추출"]
    I --> J["분석 및 시각화 자동화"]`,
  },
  {
    id: "aviation-bigquery",
    title: "BigQuery 기반 항공 데이터 통합 및 DB 최적화",
    period: "2023.04 — 2023.06",
    role: "데이터 통합 / DB 최적화 프로젝트 수행",
    problem:
      "실시간 항공 위치 데이터와 정적 항공기 정보가 분리되어 있어 조회와 분석 활용이 비효율적이었음",
    solution:
      "Google Cloud BigQuery에서 ADS-B 위치 데이터, FAA 등록 데이터, 항로 정보를 수집 및 적재하고, Sort-Merge Join 기반으로 통합 구조를 설계함",
    result: "항공 경로 및 운영 효율 분석이 가능한 통합 데이터 구조 구축",
    outcome:
      "데이터 소스를 연결한 조회 기반을 구축해 항공 경로 및 운영 효율 분석이 가능한 구조를 만들며 데이터 통합 및 DB 최적화 역량을 확보함",
    learned:
      "클라우드 기반 대용량 데이터 처리, Sort-Merge Join을 활용한 이기종 데이터 통합 설계 방법론",
    tags: ["Google Cloud BigQuery", "SQL", "ADS-B", "FAA", "데이터 통합"],
    relatedRoles: ["데이터 엔지니어", "백엔드 개발자"],
    featured: true,
    preview: "흩어진 하늘을 하나의 테이블로",
    imageAlt: "BigQuery 항공 데이터 통합 아키텍처",
    imageGallery: [],
    codeSnippet: {
      language: "sql",
      filename: "integrate_flight_data.sql",
      code: `SELECT
  a.icao24,
  a.callsign,
  f.registration,
  f.manufacturer,
  r.origin_iata,
  r.destination_iata
FROM \`ads_b.positions\` a
JOIN \`faa.aircraft\` f ON a.icao24 = f.icao24
JOIN \`routes.flight_routes\` r ON a.callsign = r.callsign
WHERE a.timestamp BETWEEN @start AND @end
ORDER BY a.timestamp ASC`,
    },
    codeSnippets: [],
  },
  {
    id: "homeshopping-fullstack",
    title: "Spring 기반 홈쇼핑 웹/모바일 풀스택 개발",
    period: "2021.03 — 2021.08",
    role: "풀스택 개발",
    problem: "웹과 모바일을 아우르는 일관된 쇼핑 서비스 구현이 필요했음",
    solution:
      "Spring 기반 웹페이지와 Android/iOS 앱을 개발하며 핵심 사용자 흐름을 설계하고, 프론트엔드-백엔드-DB 연동을 구현함",
    result: "웹/Android/iOS 3채널 일관된 쇼핑 서비스 구현 완료",
    outcome:
      "웹/모바일 3채널을 아우르는 서비스 개발 경험을 확보하며 end-to-end 서비스 구현 역량을 쌓음",
    learned:
      "Spring MVC 아키텍처, 멀티플랫폼(웹/모바일) 서비스 설계, 프론트-백엔드-DB 전체 연동 경험",
    tags: ["Spring", "Java", "Android", "iOS", "MySQL", "REST API"],
    relatedRoles: ["백엔드 개발자", "SW 개발자"],
    featured: true,
    preview: "웹 / Android / iOS, 처음부터 끝까지",
    imageAlt: "홈쇼핑 서비스 화면 (웹/모바일)",
    imageGallery: [],
    codeSnippet: {
      language: "java",
      filename: "ProductController.java",
      code: `@RestController
@RequestMapping("/api/products")
public class ProductController {
    @GetMapping
    public ResponseEntity<List<Product>> getAll(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(
            productService.findAll(PageRequest.of(page, size))
        );
    }
}`,
    },
    codeSnippets: [],
  },
  {
    id: "hash-decryption",
    title: "API 기반 해시 복호화 프로그램 (CrackStation)",
    period: "2022.09 — 2022.12",
    role: "SW 개발",
    problem:
      "단순한 비밀번호/해시가 얼마나 쉽게 노출될 수 있는지 보여주는 실습형 프로그램 구현이 필요했음",
    solution:
      "Swift와 Xcode 환경에서 CrackStation API를 연동해 SHA1, SHA256 해시 복호화 기능을 구현하고, Git versioning으로 기능 추가와 버그 수정 이력을 관리함",
    result: "SHA1/SHA256 2종 해시 알고리즘 복호화 앱 구현",
    outcome:
      "2종 해시 알고리즘과 버전 관리 흐름을 갖춘 애플리케이션을 구현하며 API 활용 중심의 백엔드형 문제 해결 경험을 확보함",
    learned: "API 설계 및 연동 패턴, Swift async/await, Git 기반 버전 관리 실습",
    tags: ["Swift", "Xcode", "API 연동", "SHA256", "SHA1", "Git"],
    relatedRoles: ["SW 개발자", "백엔드 개발자"],
    featured: false,
    imageAlt: "CrackStation 해시 복호화 앱 UI",
    imageGallery: [],
    codeSnippet: {
      language: "swift",
      filename: "DecryptorService.swift",
      code: `func decrypt(hash: String, type: HashType) async throws -> String? {
    var req = URLRequest(url: apiURL)
    req.httpMethod = "POST"
    req.httpBody = "hash=\\(hash)&type=\\(type.rawValue)".data(using: .utf8)
    let (data, _) = try await URLSession.shared.data(for: req)
    let result = try JSONDecoder().decode(CrackResult.self, from: data)
    return result.plaintext
}`,
    },
    codeSnippets: [],
  },
  {
    id: "ar-campus-navigation",
    title: "AR 기반 캠퍼스 길찾기 앱 개발",
    period: "2019.01 — 2019.12",
    role: "앱/3D 통합 개발",
    problem: "캠퍼스 환경에서 사용자가 위치와 길찾기 정보를 직관적으로 파악하기 어려웠음",
    solution:
      "드론 촬영 이미지를 MetaShape로 3D 모델링하고, 이를 Unity와 Android Studio로 통합해 AR 기반 길찾기 기능을 구현함",
    result: "공간데이터-3D-모바일 앱 융합 서비스 완성, 우수상 수상",
    outcome:
      "공간데이터-3D모델-모바일 앱을 연결한 융합형 서비스를 완성하고 우수상을 수상함",
    learned: "드론 공간 데이터를 3D 모델로 변환하는 워크플로우, Unity-Android 통합 개발",
    tags: ["AR", "Unity", "Android", "MetaShape", "3D 모델링"],
    relatedRoles: ["SW 개발자", "AI 개발자"],
    featured: false,
    imageAlt: "AR 캠퍼스 길찾기 앱 화면",
    imageGallery: [],
    codeSnippet: {
      language: "csharp",
      filename: "ARWaypointManager.cs",
      code: `void PlaceWaypoint(ARRaycastHit hit) {
    var pose = hit.pose;
    var wp = Instantiate(waypointPrefab, pose.position, pose.rotation);
    waypoints.Add(wp.transform.position);
    if (waypoints.Count > 1)
        DrawPath(waypoints[^2], waypoints[^1]);
}`,
    },
    codeSnippets: [],
  },
  {
    id: "dcgan-generation",
    title: "PyTorch 기반 DCGAN 이미지 생성 프로젝트",
    period: "2019.07 — 2019.08",
    role: "AI 프로젝트 팀원",
    problem:
      "생성형 AI 모델은 학습 조건에 따라 결과 품질 편차가 크고, 안정적인 이미지 생성이 쉽지 않았음",
    solution:
      "체코 브르노 공과대 팀원과 협업하며 PyTorch 기반 DCGAN 모델을 구현하고, epoch 변화에 따른 결과를 비교하며 성능을 조정함",
    result: "국제 협업으로 DCGAN 모델 구현 및 epoch별 성능 비교 실험 완료",
    outcome:
      "국제 공동 프로젝트 환경에서 모델 튜닝과 결과 비교 실험을 수행하며 AI 모델 이해도와 협업 역량을 함께 강화함",
    learned:
      "GAN 아키텍처 설계 원리, 하이퍼파라미터 튜닝 방법론, 영어 기반 국제 기술 협업",
    tags: ["PyTorch", "DCGAN", "딥러닝", "Python", "국제 협업"],
    relatedRoles: ["AI 개발자", "ML 엔지니어"],
    featured: false,
    imageAlt: "DCGAN 생성 이미지 결과 비교",
    imageGallery: [],
    codeSnippet: {
      language: "python",
      filename: "dcgan_generator.py",
      code: `class Generator(nn.Module):
    def __init__(self, latent_dim: int = 100):
        super().__init__()
        self.net = nn.Sequential(
            nn.ConvTranspose2d(latent_dim, 512, 4, 1, 0, bias=False),
            nn.BatchNorm2d(512), nn.ReLU(True),
            nn.ConvTranspose2d(512, 256, 4, 2, 1, bias=False),
            nn.BatchNorm2d(256), nn.ReLU(True),
            nn.ConvTranspose2d(256, 3, 4, 2, 1, bias=False),
            nn.Tanh(),
        )`,
    },
    codeSnippets: [],
  },
  {
    id: "data-lab-saltlux",
    title: "Data Science Lab 연구 조교 및 Saltlux 빅데이터 협업",
    period: "2019.03 — 2020.07",
    role: "연구 조교",
    problem:
      "실제 산업 데이터는 바로 활용하기 어려워, 분석 가능한 형태로 정리하고 의미 있는 정보로 가공하는 과정이 필요했음",
    solution:
      "연구 조교로 활동하며 데이터 크롤링 및 시각화 업무를 수행했고, Saltlux와의 빅데이터 협업 프로젝트에 참여해 필요한 데이터를 수집/정리/가공/시각화함",
    result: "데이터 가독성 및 활용도 향상, 산학 협력 기반 빅데이터 처리 경험 확보",
    outcome:
      "데이터의 가독성과 활용도를 높이고, 산학 협력 프로젝트 환경에서 실제 데이터 기반 협업 과정을 경험하며 데이터 정리 및 시각화 역량을 강화함",
    learned: "산업 데이터의 전처리 및 가공 과정, 데이터 시각화로 인사이트를 전달하는 방법",
    tags: ["Python", "크롤링", "데이터 시각화", "pandas", "matplotlib", "산학협력"],
    relatedRoles: ["데이터 엔지니어", "데이터 분석", "SW 개발자"],
    featured: false,
    imageAlt: "데이터 크롤링 및 시각화 결과",
    imageGallery: [],
    codeSnippet: {
      language: "python",
      filename: "crawl_and_visualize.py",
      code: `def crawl_and_visualize(url: str, selector: str) -> None:
    soup = BeautifulSoup(requests.get(url).text, "html.parser")
    records = [el.get_text(strip=True) for el in soup.select(selector)]
    df = pd.DataFrame({"text": records})
    df["length"] = df["text"].str.len()
    df["length"].plot(kind="hist", bins=20, title="Text Length Distribution")
    plt.tight_layout()
    plt.savefig("output/distribution.png", dpi=150)`,
    },
    codeSnippets: [],
  },
];

# SDC 원가·구매 계산기

SDC 제품의 원가계산 및 자재 구매수량을 계산하는 웹 도구입니다.  
GitHub Pages를 통해 외부에서 누구나 접속 가능합니다.

---

## 🚀 GitHub Pages 배포 방법 (최초 1회)

1. **GitHub에 로그인** → 우측 상단 `+` → `New repository`
2. Repository 이름: `sdc-calculator` (원하는 이름으로 변경 가능)
3. `Public` 선택 → `Create repository`
4. 이 폴더의 파일들(`index.html`, `data.js`, `README.md`)을 업로드
   - `Add file` → `Upload files` → 파일 드래그 → `Commit changes`
5. `Settings` 탭 → 왼쪽 메뉴 `Pages`
6. Source: `Deploy from a branch` → Branch: `main` / `/ (root)` → `Save`
7. 잠시 후 `https://<your-username>.github.io/sdc-calculator/` 로 접속 가능

---

## 🔄 데이터 업데이트 방법

### 자재 단가 변경 (`data.js` 수정)
```js
const MATERIALS = {
  "Kitenge": { lb: "pcs (6yard, 5.94m²)", qty: 5.94, price: 37000, unit: "m²", fabric: true },
  //                                                         ↑ 이 숫자만 바꾸면 됨
  ...
};
```
- `price`: 구매 1단위 가격 (UGX)
- `qty`: 1단위당 기본단위 수량 (m², m, ea 등)
- `lb`: 구매단위 설명 (표시용)
- `fabric: true`: 원단류 → Loss rate 자동 적용

### 제품 추가 (`data.js` 수정)
```js
const PRODUCTS = [
  ...
  {
    id: "new_product",          // 영문 고유 ID
    name: "New Product",        // 표시 이름
    labor: 3000,                // 인건비 (UGX/개)
    m: {
      "Kitenge": 0.25,          // 자재명: 개당 소요량 (기본단위)
      "Zipper": 0.30,
      "Zipper slider": 1
    }
  },
];
```

### 인건비 변경
`data.js`의 각 제품 `labor` 값을 수정하거나,  
웹 페이지의 **원가 설정** 탭에서 직접 수정 (세션 내 일시적용)

---

## 📁 파일 구조

```
sdc-calculator/
├── index.html   ← UI (수정 불필요)
├── data.js      ← 모든 데이터 (자재단가, 제품레시피, 인건비)
└── README.md    ← 이 파일
```

**데이터를 바꾸고 싶을 때는 `data.js`만 수정하면 됩니다.**

---

## 📋 현재 등록 제품 (v1.0, 2025-06)

| 제품 | 인건비 | 주요 자재 |
|---|---|---|
| Wrist Pouch | 2,000 UGX | Kitenge, P.E, Zipper |
| Square Pouch | 2,500 UGX | Kitenge, P.E, Zipper |
| Picnic Bag | 4,000 UGX | Kitenge |
| Pencil Case v1 | 2,500 UGX | Kitenge, P.E, Zipper |
| Pencil Case v2 | 2,500 UGX | Kitenge, P.E, Zipper |
| Present Pouch (L) | 2,000 UGX | Kitenge |
| Present Pouch (S) | 2,000 UGX | Kitenge |
| Jerrycan Bag | 7,000 UGX | P.E, Rubber, Reflector, Strings, Zipper |

---

## ⚠️ 주의사항

- **K- 자재 및 라벨** (K-string, K-zipper, Red label 등): 한국 입고품으로 원가 제외
- **Thread(실)**: 부재료비 %(기본 10%)에 포함하여 계산
- **Pencil Case v1 인건비**: 별도 데이터 없어 v2 기준(2,500 UGX) 적용
- **자재 단가**: material cost 시트 SDC Stock 기준 (2025-06)

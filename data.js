// ============================================================
//  SDC 원가·구매 계산기 — 데이터 파일
//  이 파일만 수정하면 모든 계산에 자동 반영됩니다.
//  마지막 업데이트: 2025-06
// ============================================================

// ── 1. 자재 마스터 (material cost 시트 기준) ──────────────────
//   lb    : 구매단위 설명
//   qty   : 구매 1단위당 기본단위 수량
//   price : 구매 1단위 가격 (UGX)
//   unit  : 기본단위 (m², m, ea, roll, pc …)
//   fabric: true → 원단류 (Loss rate 적용), false → 부재료
const MATERIALS = {
  "Kitenge":         { lb: "pcs (6yard, 5.94m²)", qty: 5.94,  price: 37000,   unit: "m²",   fabric: true  },
  "P.E":             { lb: "pcs (6m×6m, 36m²)",   qty: 36,    price: 125000,  unit: "m²",   fabric: true  },
  "Rubber":          { lb: "sheet (1m×1.5m)",      qty: 1.5,   price: 18000,   unit: "m²",   fabric: true  },
  "Reflector":       { lb: "roll (100m)",           qty: 100,   price: 90000,   unit: "m",    fabric: false },
  "Sponge":          { lb: "pc",                   qty: 1,     price: 6000,    unit: "pc",   fabric: false },
  "Adjustor(L)":     { lb: "pack (100pcs)",         qty: 100,   price: 50000,   unit: "ea",   fabric: false },
  "Strings(S)":      { lb: "roll (45m)",            qty: 45,    price: 25000,   unit: "m",    fabric: false },
  "Strings(M)":      { lb: "roll (45m)",            qty: 45,    price: 25000,   unit: "m",    fabric: false },
  "Strings(L)":      { lb: "roll (45m)",            qty: 45,    price: 25000,   unit: "m",    fabric: false },
  "Zipper":          { lb: "roll (200m)",           qty: 200,   price: 200000,  unit: "m",    fabric: false },
  "Zipper slider":   { lb: "pack (400pcs)",         qty: 400,   price: 60000,   unit: "ea",   fabric: false },
};

// ── 2. 제품 레시피 ────────────────────────────────────────────
//   labor : 개당 인건비 (UGX) — HMP Labor Cost 시트 기준
//   m     : 자재별 개당 소요량 { 자재명: 수량 }
//           ※ fabric:true 자재는 Loss rate 자동 적용
//           ※ K- 자재, 라벨 등 한국 입고품은 포함하지 않음
const PRODUCTS = [
  {
    id: "wp", name: "Wrist Pouch", labor: 2000,
    m: { "Kitenge": 0.1386, "P.E": 0.0621, "Zipper": 0.22, "Zipper slider": 1 }
  },
  {
    id: "sp", name: "Square Pouch", labor: 2500,
    m: { "Kitenge": 0.1636, "P.E": 0.0621, "Zipper": 0.22, "Zipper slider": 1 }
  },
  {
    id: "pb", name: "Picnic Bag", labor: 4000,
    m: { "Kitenge": 0.6187 }
  },
  {
    id: "pc1", name: "Pencil Case v1", labor: 2500,
    m: { "Kitenge": 0.0824, "P.E": 0.0437, "Zipper": 0.24, "Zipper slider": 1 }
  },
  {
    id: "pc2", name: "Pencil Case v2", labor: 2500,
    m: { "Kitenge": 0.1403, "P.E": 0.0756, "Zipper": 0.22, "Zipper slider": 1 }
  },
  {
    id: "ppl", name: "Present Pouch (L)", labor: 2000,
    m: { "Kitenge": 0.3032 }
  },
  {
    id: "pps", name: "Present Pouch (S)", labor: 2000,
    m: { "Kitenge": 0.2288 }
  },
  {
    id: "jcb", name: "Jerrycan Bag", labor: 7000,
    m: {
      "P.E": 1.5859, "Rubber": 0.0435,
      "Reflector": 0.35, "Sponge": 1, "Adjustor(L)": 2,
      "Strings(S)": 0.42, "Strings(M)": 0.34, "Strings(L)": 2.0,
      "Zipper": 0.4572, "Zipper slider": 1
    }
  },
];

// ── 3. 기본 원가 설정 ─────────────────────────────────────────
const DEFAULT_COST_SETTINGS = {
  subPct:          10,       // 부재료비 (자재비 대비 %) — 실, 본드 등 소모품
  margin:          50,       // 목표 마진율 (%)
  monthlyOverhead: 500000,   // 월 운영비 (UGX) — 전기세, 임대료 등
  monthlyQty:      200,      // 월 총 생산수량 (운영비 배분 기준)
  defaultLossRate: 15,       // 기본 Loss rate (%)
};


// ============================================================
//  SDC 원가·구매 계산기 — 데이터 파일
//  이 파일만 수정하면 모든 계산에 자동 반영됩니다.
//  마지막 업데이트: 2026-06 (Slides 1-10 반영)
// ============================================================
 
// ── 1. 자재 마스터 ────────────────────────────────────────────
//   lb     : 구매단위 설명
//   qty    : 구매 1단위당 기본단위 수량
//   price  : 구매 1단위 가격 (UGX)
//   unit   : 기본단위 (m², m, ea, roll, pc …)
//   fabric : true → 원단류 (Loss rate 적용)
const MATERIALS = {
  "Kitenge":         { lb: "pcs (6yard, 5.94m²)", qty: 5.94,  price: 37000,   unit: "m²",  fabric: true  },
  "P.E":             { lb: "pcs (6m×6m, 36m²)",   qty: 36,    price: 125000,  unit: "m²",  fabric: true  },
  "Rubber":          { lb: "sheet (1m×1.5m)",      qty: 1.5,   price: 18000,   unit: "m²",  fabric: true  },
  "Reflector":       { lb: "roll (100m)",           qty: 100,   price: 90000,   unit: "m",   fabric: false },
  "Sponge":          { lb: "pc",                   qty: 1,     price: 6000,    unit: "pc",  fabric: false },
  "Adjustor(L)":     { lb: "pack (100pcs)",         qty: 100,   price: 50000,   unit: "ea",  fabric: false },
  "Strings(S)":      { lb: "roll (45m)",            qty: 45,    price: 25000,   unit: "m",   fabric: false },
  "Strings(M)":      { lb: "roll (45m)",            qty: 45,    price: 25000,   unit: "m",   fabric: false },
  "Strings(L)":      { lb: "roll (45m)",            qty: 45,    price: 25000,   unit: "m",   fabric: false },
  "Zipper":          { lb: "roll (200m)",           qty: 200,   price: 200000,  unit: "m",   fabric: false },
  "Zipper slider":   { lb: "pack (400pcs)",         qty: 400,   price: 60000,   unit: "ea",  fabric: false },
};
 
// ── 2. 제품 레시피 ────────────────────────────────────────────
//   labor : 개당 인건비 (UGX) — HMP Labor Cost 시트 기준
//   m     : { 자재명: 개당 소요량(기본단위) }
//           ※ fabric:true 자재는 Loss rate 자동 적용
//           ※ K- 자재, 라벨 등 한국 입고품은 포함하지 않음
//           ※ 실(Thread)은 부재료비 %로 처리하여 제외
//
//  [슬라이드 출처]
//  Slide 2  : Shoppers Bag v3
//  Slide 3  : Stand Pouch
//  Slide 4  : K-lucky Bag (Kitenge)
//  Slide 5  : Upcycled Tote Bag      (Kitenge 부분만, Sofa/Recycled 제외)
//  Slide 6  : Picnic Bag
//  Slide 7  : Book Bag v2            (Kitenge 부분만, P.V 제외)
//  Slide 8  : Wrist Bag (L)          (Kitenge 4패널 U-shape 근사)
//  Slide 9  : Kitenge Strap          (Stiff·Strap Ring 단가 없어 Kitenge만)
//  Slide 10 : Two Pocket Pouch       (Kitenge 부분만, Sofa material 제외)
//  Slide 11 : Pencil Case v1
//  Slide 12 : Pencil Case v2
//  Slide 13 : Present Pouch (L)
//  Slide 14 : Present Pouch (S)
//  Slide 15 : Square Pouch
//  Slide 16 : Wrist Pouch
//  Slides 25-26: Jerrycan Bag
 
const PRODUCTS = [
 
  // ── 기존 제품 (Slides 15-16, 11-14, 25-26) ────────────────
 
  {
    id: "wp", name: "Wrist Pouch", labor: 2000,
    slide: 16,
    m: { "Kitenge": 0.1386, "P.E": 0.0621, "Zipper": 0.22, "Zipper slider": 1 }
  },
  {
    id: "sp", name: "Square Pouch", labor: 2500,
    slide: 15,
    m: { "Kitenge": 0.1636, "P.E": 0.0621, "Zipper": 0.22, "Zipper slider": 1 }
  },
  {
    id: "pb", name: "Picnic Bag", labor: 4000,
    slide: 6,
    m: { "Kitenge": 0.6187 }
  },
  {
    id: "pc1", name: "Pencil Case v1", labor: 2500,
    slide: 11,
    m: { "Kitenge": 0.0824, "P.E": 0.0437, "Zipper": 0.24, "Zipper slider": 1 }
  },
  {
    id: "pc2", name: "Pencil Case v2", labor: 2500,
    slide: 12,
    m: { "Kitenge": 0.1403, "P.E": 0.0756, "Zipper": 0.22, "Zipper slider": 1 }
  },
  {
    id: "ppl", name: "Present Pouch (L)", labor: 2000,
    slide: 13,
    m: { "Kitenge": 0.3032 }
  },
  {
    id: "pps", name: "Present Pouch (S)", labor: 2000,
    slide: 14,
    m: { "Kitenge": 0.2288 }
  },
  {
    id: "jcb", name: "Jerrycan Bag", labor: 7000,
    slide: "25-26",
    m: {
      "P.E": 1.5859, "Rubber": 0.0435,
      "Reflector": 0.35, "Sponge": 1, "Adjustor(L)": 2,
      "Strings(S)": 0.42, "Strings(M)": 0.34, "Strings(L)": 2.0,
      "Zipper": 0.4572, "Zipper slider": 1
    }
  },
 
  // ── 슬라이드 2-10 신규 추가 ────────────────────────────────
 
  {
    id: "sbv3", name: "Shoppers Bag v3", labor: 3500,
    slide: 2,
    // Front/Back outside & inside: Kitenge 4패널 (15.5"→16.5" 트라피조이드, bounding 16.5"x18" 적용)
    // String(outside): Kitenge 2pcs 12cm×70cm
    // Cotton lining (string inside) 단가 없어 제외
    notes: "Cotton lining string (inside) excluded - no cost data",
    m: { "Kitenge": 0.9344 }
  },
  {
    id: "stp", name: "Stand Pouch", labor: 2500,
    slide: 3,
    // Front/Back inside + Front outside: Kitenge 9.5"×7" x3
    // Zipper extension Kitenge: 1.25"×3"
    // Back zip Kitenge: 1.5"×1.5"
    // Back(outside): PV black 단가 없어 제외
    // Inside pocket: Cotton lining 단가 없어 제외
    notes: "PV black, Cotton lining excluded - no cost data. Labor: no HMP data, using 2500 UGX estimate.",
    m: { "Kitenge": 0.1326, "Zipper": 0.24, "Zipper slider": 1 }
  },
  {
    id: "klb", name: "K-lucky Bag (Kitenge)", labor: 7000,
    slide: 4,
    // Front/Back inside: Kitenge 19"×19" x2
    // Inside pocket: Kitenge 9"×16"
    // Zip cover: Kitenge 1.5"×9" x2
    // String: Kitenge 4cm×58"
    // Front/Back outside: Sofa material 단가 없어 제외
    // K-string, K-slider: 한국 입고품 제외
    // Adjustor(L): 2ea 현지조달 포함
    notes: "Sofa material excluded - no cost data. K-string, K-slider = Korea imports excluded.",
    m: { "Kitenge": 0.6350, "Zipper": 0.2286, "Zipper slider": 1, "Adjustor(L)": 2 }
  },
  {
    id: "utb", name: "Upcycled Tote Bag", labor: 7000,
    slide: 5,
    // Main part lining: Kitenge 16"×32"
    // Pocket inside: Kitenge 11"×13"
    // Zip: Kitenge 2pcs 2.5"×14"
    // Main part outside: Sofa material 제외
    // Bottom, Big/Small strings: Recycled material 제외
    // Cotton lining string lining 제외
    // Zipper with slider 17.5"
    notes: "Sofa material, Recycled material, Cotton lining excluded - no cost data.",
    m: { "Kitenge": 0.4678, "Zipper": 0.4445, "Zipper slider": 1 }
  },
  {
    id: "bbv2", name: "Book Bag v2", labor: 3500,
    slide: 7,
    // Front/Back outside Kitenge: 32cm×66cm x2
    // Strings Kitenge: 23"×12cm x2
    // Front/Back inside: P.V (단가 없어 제외)
    // Strings lining: P.V 제외
    notes: "P.V (inside lining) excluded - no cost data.",
    m: { "Kitenge": 0.5626 }
  },
  {
    id: "wbl", name: "Wrist Bag (L)", labor: 2500,
    slide: 8,
    // Front/Back outside/inside: Kitenge x4 (U-shape, bounding 34cm×51cm, minus handle cutouts)
    // Elastic: 단가 없어 제외
    notes: "Kitenge area uses bounding box minus handle cutouts. Elastic excluded - no cost data.",
    m: { "Kitenge": 0.6136 }
  },
  {
    id: "kstr", name: "Kitenge Strap", labor: 2000,
    slide: 9,
    // Main part outside Kitenge: 12cm×13"
    // Main part inside: Stiff (단가 없어 제외)
    // Strap Ring: 단가 없어 제외
    notes: "Stiff, Strap Ring excluded - no cost data.",
    m: { "Kitenge": 0.0396 }
  },
  {
    id: "tpp", name: "Two Pocket Pouch", labor: 3000,
    slide: 10,
    // Front/Back inside Kitenge: 23cm×14cm x2
    // Pocket inside Kitenge: 23cm×12.5cm x4
    // Strings Kitenge: 34cm×6cm
    // Back zip Kitenge: 5cm×5cm x2
    // Front/Back outside: Sofa material 제외
    // Zipper: 20cm + 23cm = 43cm, 2 sliders
    notes: "Sofa material excluded - no cost data.",
    m: { "Kitenge": 0.2050, "Zipper": 0.43, "Zipper slider": 2 }
  },
 
];
 
// ── 3. 기본 원가 설정 ─────────────────────────────────────────
const DEFAULT_COST_SETTINGS = {
  subPct:          10,      // 부재료비 (자재비 대비 %) — 실, 본드 등 소모품
  margin:          50,      // 목표 마진율 (%)
  monthlyOverhead: 500000,  // 월 운영비 (UGX) — 전기세, 임대료 등
  monthlyQty:      200,     // 월 총 생산수량 (운영비 배분 기준)
  defaultLossRate: 15,      // 기본 Loss rate (%)
};

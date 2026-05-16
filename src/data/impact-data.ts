import hospitalRaw from "./hospital.csv?raw";
import detectionRaw from "./detection.csv?raw";
import testsRaw from "./tests.csv?raw";
import referralsRaw from "./referrals.csv?raw";

export const P_MF_BASE = 0.336;

export type ImpactCategoryKey =
  | "detection"
  | "tests"
  | "referrals"
  | "hospital";

export interface ImpactItem {
  name: string;
  rr: number;
  rr_ci: string;
  pop: number;
  baseline: number;
}

export interface ImpactCategory {
  key: ImpactCategoryKey;
  items: ImpactItem[];
}

function parseNum(x: string | number | null | undefined): number {
  if (x == null) return NaN;
  let s = String(x).replace(/,/g, ".");
  s = s.replace(/[^\d.\s-]/g, "");
  s = s.replace(/\s/g, "");
  const n = parseFloat(s);
  return isNaN(n) ? NaN : n;
}

function parseRR(rr_ci: string): number {
  return parseNum(String(rr_ci).split(/[\s(]/)[0]);
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function parseCsv(raw: string, key: ImpactCategoryKey): ImpactCategory {
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const items: ImpactItem[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCsvLine(lines[i]);
    if (cols.length < 4) continue;
    const name = cols[0].trim();
    const rr_ci = cols[1].trim();
    const pop = parseNum(cols[2]);
    const baseline = parseNum(cols[3]);
    const rr = parseRR(rr_ci);
    if (!name || !isFinite(rr) || !isFinite(pop) || !isFinite(baseline)) continue;
    items.push({ name, rr, rr_ci, pop, baseline });
  }
  return { key, items };
}

export const detectionData: ImpactCategory = parseCsv(detectionRaw, "detection");
export const testsData: ImpactCategory = parseCsv(testsRaw, "tests");
export const referralsData: ImpactCategory = parseCsv(referralsRaw, "referrals");
export const hospitalData: ImpactCategory = parseCsv(hospitalRaw, "hospital");

// ---------------------------------------------------------------------------
// Display-name translations
// ---------------------------------------------------------------------------
// Canonical key = CSV name (English). `pt` is the BR-PT display name.
// `en` is an optional override; if absent, the EN page shows the canonical
// CSV name unchanged.

export interface NameTranslation {
  pt: string;
  en?: string;
}

const detectionNames: Record<string, NameTranslation> = {
  "Hypertension": { pt: "Hipertensão" },
  "Diabetes Mellitus": { pt: "Diabetes Mellitus" },
  "Hypothyroidism": { pt: "Hipotireoidismo" },
  "AIDS": { pt: "HIV - AIDS", en: "HIV - AIDS" },
  "Drug addiction": { pt: "Drogadição" },
  "Alcohol abuse": { pt: "Abuso de álcool" },
  "Depression": { pt: "Depressão" },
  "Psychosis": { pt: "Psicose" },
  "Cardiac arrhythmias": { pt: "Arritmias cardíacas" },
  "Peripheral artery disease": { pt: "Doença arterial periférica" },
  "Ischemic heart disease": { pt: "Doença isquêmica do coração" },
  "Heart failure": { pt: "Insuficiência cardíaca" },
  "Kidney failure": { pt: "Insuficiência renal" },
  "Osteoarthritis": { pt: "Osteoartrite" },
  "Rheumatic disorders": { pt: "Doenças reumatológicas" },
  "Neurological disorders": { pt: "Doenças neurológicas" },
  "Epilepsy": { pt: "Epilepsia" },
  "Stroke": { pt: "Acidente vascular cerebral (AVC)" },
  "Dementia": { pt: "Demências" },
  "COPD": { pt: "DPOC" },
  "Asthma": { pt: "Asma" },
  "Chronic hepatitis": { pt: "Hepatite crônica" },
  "Cirrhosis of the liver": { pt: "Cirrose hepática" },
  "Cancer": { pt: "Neoplasias gerais" },
  "Neoplasia Men": { pt: "Neoplasia genital masculina" },
  "Neoplasia Women": { pt: "Neoplasia genital feminina" },
  "Breast cancer": { pt: "Câncer de mama" },
  "Metastatic cancer": { pt: "Câncer metastático" },
};

const testsNames: Record<string, NameTranslation> = {
  "Hemogram": { pt: "Hemograma" },
  "Creatinine": { pt: "Creatinina" },
  "Urea": { pt: "Ureia" },
  "Urinalysis": { pt: "EAS (urinálise)" },
  "Sodium": { pt: "Sódio" },
  "Potassium": { pt: "Potássio" },
  "Glucose": { pt: "Glicemia" },
  "A1C Hemoglobin": { pt: "Hemoglobina glicada" },
  "PSA": { pt: "PSA" },
  "Total cholesterol": { pt: "Colesterol total" },
  "HDL cholesterol": { pt: "HDL colesterol" },
  "LDL cholesterol": { pt: "LDL colesterol" },
  "Triglycerides": { pt: "Triglicerídeos" },
  "Uric acid": { pt: "Ácido úrico" },
  "TSH": { pt: "TSH" },
  "AST": { pt: "AST-TGO" },
  "ALT": { pt: "ALT-TGP" },
  "Alkaline phosphatase": { pt: "Fosfatase alcalina" },
  "Gamma-GT": { pt: "Gama-GT" },
  "Triiodothyronine": { pt: "T3" },
  "Thyroxine": { pt: "T4" },
  "Free Thyroxine": { pt: "T4 livre" },
  "Bilirubin": { pt: "Bilirrubina" },
  "ESR": { pt: "VHS" },
  "Ova & parasite": { pt: "Parasitológico de fezes" },
  "Calcium": { pt: "Cálcio" },
  "LH": { pt: "LH" },
  "FSH": { pt: "FSH" },
  "Rubella IgG": { pt: "Rubéola IgG" },
  "Rubella IgM": { pt: "Rubéola IgM" },
};

const referralsNames: Record<string, NameTranslation> = {
  "Cardiology": { pt: "Cardiologia" },
  "Neurology": { pt: "Neurologia" },
  "Psychiatry": { pt: "Psiquiatria" },
  "Dermatology": { pt: "Dermatologia" },
  "Pulmonology": { pt: "Pneumologia" },
  "Infectious diseases": { pt: "Infectologia" },
  "Urology": { pt: "Urologia" },
  "Allergology": { pt: "Alergologia" },
  "Nephrology": { pt: "Nefrologia" },
  "Endocrinology": { pt: "Endocrinologia" },
  "Gastroenterology": { pt: "Gastroenterologia" },
  "Angiology": { pt: "Angiologia" },
  "Rheumatology": { pt: "Reumatologia" },
  "Physiotherapy": { pt: "Fisioterapia" },
  "Rehabilitation": { pt: "Reabilitação" },
  "Ophthalmology": { pt: "Oftalmologia" },
  "ENT": { pt: "Otorrinolaringologia" },
  "Orthopaedics": { pt: "Ortopedia" },
  "Gynaecology": { pt: "Ginecologia" },
  "HRPC": { pt: "Pré-natal de alto risco" },
  "Eye surgery": { pt: "Cirurgia oftalmológica" },
  "Gynaecological surgery": { pt: "Cirurgia ginecológica" },
  "Orthopaedic surgery": { pt: "Cirurgia ortopédica" },
  "General surgery": { pt: "Cirurgia geral" },
  "Plastic surgery": { pt: "Cirurgia plástica" },
  "Vascular surgery": { pt: "Cirurgia vascular" },
  "Echocardiogram": { pt: "Ecocardiograma" },
  "Spirometry": { pt: "Espirometria" },
  "Colonoscopy": { pt: "Colonoscopia" },
  "EGD": { pt: "Endoscopia digestiva alta (EDA)" },
  "CPX test": { pt: "Teste ergométrico" },
};

const hospitalNames: Record<string, NameTranslation> = {
  "Hypertension": { pt: "Hipertensão" },
  "Diabetes mellitus": { pt: "Diabetes Mellitus" },
  "Stroke": { pt: "Acidente vascular cerebral (AVC)" },
  "Angina pectoris": { pt: "Angina pectoris" },
  "Heart failure": { pt: "Insuficiência cardíaca" },
  "Epilepsy": { pt: "Epilepsia" },
  "Asthma": { pt: "Asma" },
  "Pregnancy related": { pt: "Gravidez, parto e puerpério" },
  "Gastroenteritis": { pt: "Gastroenterite" },
  "Pneumonia in children": { pt: "Pneumonia (crianças)" },
  "Pneumonia in adults": { pt: "Pneumonia (adultos)" },
  "Skin infection": { pt: "Infecção de pele" },
  "Ear, nose & throat": { pt: "Nariz, ouvido e garganta" },
  "Pelvic inflammatory disease": { pt: "Doença inflamatória pélvica (DIP)" },
};

const allNames: Record<ImpactCategoryKey, Record<string, NameTranslation>> = {
  detection: detectionNames,
  tests: testsNames,
  referrals: referralsNames,
  hospital: hospitalNames,
};

export function getDisplayName(
  category: ImpactCategoryKey,
  canonicalName: string,
  locale: "pt-BR" | "en-US"
): string {
  const entry = allNames[category]?.[canonicalName];
  if (!entry) return canonicalName;
  if (locale === "pt-BR") return entry.pt;
  return entry.en ?? canonicalName;
}

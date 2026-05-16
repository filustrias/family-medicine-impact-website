/**
 * Unit costs in BRL from the SIGTAP table (SUS national procedure schedule).
 *
 * Source: Sistema de Gerenciamento da Tabela de Procedimentos, Medicamentos e
 * OPM do SUS (SIGTAP). The schedule establishes the fixed federal
 * reimbursement rates for each procedure across the national territory.
 *
 * Keys are the canonical English names as they appear in the project CSVs
 * (tests.csv and referrals.csv). The simulator looks costs up via the same
 * canonical name used by the calc engine.
 */
export const SIGTAP_COSTS: Record<string, number> = {
  // Laboratory tests (tests.csv)
  Hemogram: 4.11,
  Creatinine: 1.85,
  Urea: 1.85,
  Urinalysis: 3.7,
  Sodium: 1.85,
  Potassium: 1.85,
  Glucose: 1.85,
  "A1C Hemoglobin": 8.24,
  PSA: 16.42,
  "Total cholesterol": 1.85,
  "HDL cholesterol": 3.51,
  "LDL cholesterol": 3.51,
  Triglycerides: 3.51,
  "Uric acid": 1.85,
  TSH: 8.94,
  AST: 2.01,
  ALT: 2.01,
  "Alkaline phosphatase": 2.01,
  "Gamma-GT": 3.51,
  Triiodothyronine: 8.94,
  Thyroxine: 8.94,
  "Free Thyroxine": 11.6,
  Bilirubin: 2.01,
  ESR: 1.85,
  "Ova & parasite": 1.65,
  Calcium: 1.85,
  LH: 8.94,
  FSH: 8.94,
  "Rubella IgG": 18.55,
  "Rubella IgM": 18.55,

  // Diagnostic procedures (referrals.csv)
  Echocardiogram: 39.94,
  Spirometry: 22.22,
  Colonoscopy: 125.0,
  EGD: 45.55,
  "CPX test": 30.0,
};

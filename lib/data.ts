export const company = 'Bergström Bygg AB'

export const summary = {
  perManad: 48200,
  perAr: 578400,
  lopande: 27,
  attAtgarda: 4,
  sparatIAr: 14388,
  nastaFornyelse: '9 jul',
}

export type FyndTyp = 'besparing' | 'bradskande' | 'uppmarksamhet'

export const fynd = [
  {
    id: 1,
    typ: 'besparing' as FyndTyp,
    titel: 'Adobe Creative Cloud betalas på två konton',
    detalj: '7 188 kr/år att spara',
    action: 'Visa',
  },
  {
    id: 2,
    typ: 'bradskande' as FyndTyp,
    titel: 'Framers provperiod tar slut om 3 dagar',
    detalj: 'Annars 540 kr/mån',
    action: 'Säg upp',
  },
  {
    id: 3,
    typ: 'uppmarksamhet' as FyndTyp,
    titel: 'Telia höjde priset 12%',
    detalj: '1 290 → 1 445 kr/mån',
    action: 'Utkast',
  },
]

export const kategorier = [
  { namn: 'Mjukvara',            andel: 38, farg: '#6C72FF' },
  { namn: 'Telefoni & internet', andel: 22, farg: '#FF9E7A' },
  { namn: 'Försäkring',          andel: 18, farg: '#59CFA0' },
  { namn: 'Marknadsföring',      andel: 14, farg: '#CDBFFF' },
  { namn: 'Övrigt',              andel: 8,  farg: '#F2A03C' },
]

export const fornyelser = [
  { datum: '2 jul',  namn: 'Fortnox',                        kr: 459,  not: 'Bokföring · ingen bindning',   bradskande: false },
  { datum: '9 jul',  namn: 'Framer',                         kr: 540,  not: 'Provperiod tar slut',           bradskande: true  },
  { datum: '14 jul', namn: 'Trygg-Hansa företagsförsäkring', kr: 2100, not: 'Försäkring · 12 mån bindning', bradskande: false },
  { datum: '28 jul', namn: 'Telia företagsabonnemang',        kr: 1445, not: 'Telefoni · 24 mån bindning',   bradskande: false },
]

export function fmtKr(n: number) {
  return new Intl.NumberFormat('sv-SE').format(n) + ' kr'
}

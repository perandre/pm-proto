# Design System

Visual specification derived from the live site and screenshots.

---

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `navy` | `#1a2b4a` (approx) | Header bg, active tab fill, selected radio fill, submit button |
| `amber` | `#f5c518` (approx) | "Endre abonnement?" button |
| `blue-check` | `#3b82f6` (approx) | Feature checkmark icons |
| `coral` | `#e05a2b` (approx) | Link text (vilkår, personvernerklæring) |
| `yellow-info` | `#fefce8` | Info/description box background |
| `gray-border` | `#e5e7eb` | Card borders, input borders |
| `white` | `#ffffff` | Card backgrounds, inactive tab |
| `page-bg` | `#f3f4f6` | Page background (off-white) |
| `text` | `#111827` | Primary text |
| `placeholder` | `#9ca3af` | Input placeholder text |

---

## Typography

- Font: System sans-serif stack (original uses no custom font)
- Plan name in header: `text-2xl font-bold` (desktop) / `text-xl font-bold` (mobile)
- Price inline: same weight, same line
- Section headers (h4): `text-base font-bold`
- Feature highlights header: `text-sm font-bold`
- Feature list items: `text-sm`
- Input labels: `text-sm font-medium`
- Button text: `text-base font-semibold`

---

## Layout

### Page
- Max width: ~860px, centered
- Page background: off-white/light gray
- All sections are white cards with ~20px gap between them

### Header
- Full viewport width, dark navy background
- Logo left-padded ~24px
- Height: ~64px

### Tab Navigation
- Centered horizontally
- Margin top/bottom: ~24px
- Pill buttons side-by-side with small gap

### Section Cards
- Background: white
- Border: 1px solid `gray-border`
- Border radius: ~12px
- Padding: ~20–24px
- Gap between cards: ~16–20px

---

## Components

### Header
```
[dark navy bar full width]
  [PlussMobil logo — white SVG, left aligned]
```

### Tab Toggle
```
[rounded-full pill] [rounded-full pill]
Active:   bg-navy text-white
Inactive: bg-white border border-gray-300 text-gray-800
```

### Plan Card
Desktop:
```
[Plan Name  Price]  [Endre abonnement? ← amber button]
[Highlights header bold]
[✓ Feature] [✓ Feature] [✓ Feature]   ← 3 columns
[✓ Feature] [✓ Feature] [✓ Feature]
```
Mobile:
```
[Plan Name]
[Price]
[Endre abonnement? ← amber button]
[Highlights header]
[✓ Feature] [✓ Feature]              ← 2 columns
...
```

### Plan Selector (expanded)
Hidden list of all plans as radio options, shown when "Endre abonnement?" is clicked.
Each radio option: plan name + price.

### Input Field
```
[Label text]
[___________________________]   ← rounded, border, full width
```
- Border radius: ~8px
- Padding: ~12px 16px
- Full width within column

### Owner Form Grid
- Desktop: 2 columns (name | phone), (email | personal ID)
- Mobile: 1 column, stacked

### Inline Radio (Ja/Nei style)
```
[●] Ja    [○] Nei
```
- Small circle
- Selected: navy fill + white checkmark inside
- Unselected: empty circle with gray border
- Horizontal, side-by-side

### Section Header + Inline Radio Row
Desktop: question text left, Ja/Nei radios right on same line
Mobile: question text, then Ja/Nei below

### Bordered Radio Card (Porting / SIM type)
Desktop: two cards side-by-side (50/50)
Mobile: stacked full width
```
┌─────────────────────────────────┐
│ [●] Title text                  │
│     Subtitle text               │
└─────────────────────────────────┘
```
- Selected: dark border (navy/dark), navy-filled circle checkmark on left
- Unselected: gray border, empty circle
- Border radius: ~8px
- Padding: ~16px
- For eSIM card: `?` help icon on far right (triggers tooltip popup)

### Date Input
```
[📅 09.03.2026                    ]
```
- Calendar icon inside the input on the left
- Same styling as regular text input
- Custom date picker with blocked unavailable dates

### Info Box (description text)
```
┌─────────────────────────────────────────────────────┐
│ Pale yellow background                              │
│ Ønsker du at ditt mobilnummer...                    │
└─────────────────────────────────────────────────────┘
```
- Background: `yellow-info`
- Border radius: ~6–8px
- Padding: ~12px 16px
- Text: small, dark

### Order Summary Box
```
┌ Abonnement ──────────────────────────────────────── ┐
│  ┌ dashed inner box ──────────────────────────────┐ │
│  │ PlussMobil 10GB Standard  198,- /mnd           │ │
│  │ Navn: -                                        │ │
│  │ Nummer til overføring: -                       │ │
│  │ Dato for overføring: 09.03.2026               │ │
│  │ SIM-kort: eSIM                                 │ │
│  └────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────  ┘
```
- Outer: white card (same as other sections)
- Inner: lighter dashed or solid gray border
- Plan name + price: bold
- Each row: `Label: value` format

### Terms Checkbox Row
```
[□] Jeg har forstått og akseptert PlussMobil sine [vilkår] og [personvernerklæring]. ...
```
- Standard checkbox, left-aligned
- Links in coral/orange color
- Text wraps below

### Submit Button
```
[        Send bestilling →        ]
```
- Full rounded (pill shape: `rounded-full`)
- Background: navy
- Text: white, semibold
- Arrow: `→` character or icon
- Desktop: normal auto width, left-aligned
- Mobile: full width

### Tooltip / Help Icon
- `?` in a circle, gray
- Hover/click shows popup with HTML content (device compatibility list for eSIM, etc.)

---

## Responsive Breakpoints

| Layout change | Breakpoint |
|--------------|------------|
| 2-col → 1-col owner form | `md` (~768px) |
| Side-by-side → stacked porting cards | `md` |
| Side-by-side → stacked SIM cards | `md` |
| 3-col → 2-col feature grid | `sm` (~640px) |
| Plan price inline → stacked | `sm` |

---

## Spacing Scale (approximate)
- Between section cards: `gap-4` or `mb-5` (20px)
- Card padding: `p-5` or `p-6`
- Between form rows: `mb-4`
- Between inline radios: `gap-3`
- Between feature grid items: `gap-x-4 gap-y-2`

---

## Header

- No mobile menu / hamburger — header is just a logo bar on all screen sizes.

---

## Accessibility

Custom radio components (BorderedRadioCard, InlineRadio) must be keyboard-accessible:
- Use `role="radio"` and `aria-checked` on each option, wrapped in `role="radiogroup"`
- Arrow keys navigate between options within a group
- Space/Enter selects the focused option
- Each radio group needs an accessible label (via `aria-labelledby` or `aria-label`)

Plan selector (expanded list):
- Keyboard navigation with arrow keys
- Escape closes the list

Form inputs:
- All inputs have associated `<label>` elements (not just visual labels)
- Error messages linked via `aria-describedby`
- Required fields marked with `aria-required="true"`

Focus management:
- After submit error, focus the first invalid field
- After loading completes and receipt shows, move focus to the receipt heading

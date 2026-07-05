---
name: Precision Monitor
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered for high-density information environments where clarity and speed of recognition are paramount. The brand personality is **utilitarian, precise, and unobtrusive**, acting as a transparent window into system health rather than a decorative layer.

The aesthetic follows a **Minimalist Corporate** approach, leaning into "tool-like" attributes:
- **Functional Density:** Information is packed efficiently to minimize scrolling, using negative space only to define clear groupings.
- **Utility-First:** Every visual element serves a purpose. Gradients and shadows are replaced by solid fills and crisp borders.
- **Immediate Feedback:** A rigorous focus on state-driven design, ensuring users can distinguish between "Healthy," "Degraded," and "Critical" statuses in milliseconds.

## Colors

The palette is built on a **Zinc and Slate** foundation to provide a neutral, professional backdrop that allows status colors to command attention.

- **Primary:** A deep Navy Slate (`#0F172A`) for text and primary UI actions, ensuring maximum contrast.
- **Accent/Informative:** A focused Blue (`#3B82F6`) for interactive elements, links, and neutral "In Progress" states.
- **Status Semantic:**
    - **Success:** Emerald green for operational states.
    - **Warning:** Amber for degraded performance or pending issues.
    - **Critical:** Red for outages or system failures.
- **Surface Tiers:** Use subtle shifts in gray (from White to Slate-50/100) to create nested hierarchies without relying on heavy shadows.

## Typography

The system utilizes **Inter** for its exceptional legibility and neutral tone. For technical data—such as IP addresses, timestamps, and log entries—**JetBrains Mono** is introduced to provide clear character differentiation and alignment.

- **Hierarchy:** Uses weight (SemiBold vs. Regular) and subtle size steps to differentiate sections.
- **Numeric Data:** Emphasize tabular lining for numbers to ensure columns of data align perfectly in monitoring tables.
- **Labels:** Small, uppercase labels with increased letter spacing are used for secondary metadata to save vertical space while remaining readable.

## Layout & Spacing

This design system employs a **4px baseline grid** to achieve a compact, "dense" UI appropriate for professional monitoring tools.

- **Grid:** A 12-column fluid grid for desktop, collapsing to a single column for mobile.
- **Layout Model:** A fixed sidebar for navigation (240px) with a fluid content area.
- **Density:** Components use "Compact" padding (8px internal, 16px external) to allow more data to be visible above the fold. 
- **Alignment:** Consistent left-alignment of all data points to facilitate rapid vertical scanning of logs and status lists.

## Elevation & Depth

Elevation is primarily communicated through **low-contrast outlines and tonal layering** rather than shadows, maintaining the "flat" utility aesthetic.

- **Surfaces:** The main canvas is White (`#FFFFFF`). Containers and cards use a 1px solid border in Slate-200.
- **Layering:** Nested elements (like code blocks or internal modules) use a light gray background fill (`#F8FAFC`) to create a "recessed" look.
- **Active State:** Only the most critical interactive elements (like an active modal or a primary dropdown) use a subtle, 4px blur, low-opacity shadow to indicate depth.
- **Interaction:** Hover states are indicated by a subtle background color shift (e.g., White to Slate-50) rather than a change in elevation.

## Shapes

The shape language is **Soft (0.25rem/4px)**. This minimal rounding provides a modern touch while maintaining the structured, architectural feel of a professional tool.

- **Standard Elements:** Buttons, input fields, and small cards use the base 4px radius.
- **Contextual Elements:** Large dashboard containers may use an 8px (lg) radius to softly frame complex data groups.
- **Circular:** Reserved exclusively for status indicators (LED pips) and toggle switch handles.

## Components

- **Buttons:** Primary buttons are solid Slate-900 with white text. Secondary buttons use a Slate-200 border. No gradients.
- **Status Chips:** Small, rectangular badges with a subtle background tint and high-contrast text (e.g., light green background with dark green text) for readability.
- **Compact Cards:** Used for individual monitor units. They feature a top-edge 2px colored border representing the current status (Green, Amber, Red).
- **Toggle Switches:** Small, high-contrast toggles. Use Blue-600 for the 'on' state and Slate-300 for 'off'. No inner shadows.
- **Input Fields:** 1px Slate-300 border, turning Blue-500 on focus. Placeholders use Slate-400.
- **Data Tables:** Borderless rows with 1px Slate-100 dividers. Hovering over a row applies a Slate-50 background.
- **Metric Visuals:** Use sparklines (simplified line charts) without axes or labels for quick trend visualization within small card components.
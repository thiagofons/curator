[**@repo/ui-tokens**](../README.md)

***

> `const` **spacing**: `object`

Defined in: [spacing.ts:15](https://github.com/thiagofons/curator/blob/f0cbbd219773ebcf898a73e7b489432be7814697/packages/ui-tokens/src/spacing.ts#L15)

UI Tokens: `spacing`

This is the single source of truth for all spatial values (padding,
margins, gaps, etc.) across the platform.

We use a numeric, linear scale where '1' unit equals 4px.
This provides consistency and a predictable rhythm in the UI.

Example: `spacing[4]` = 16px (our typical base unit).

Ref: Our pillars on DX and establishing a "Golden Path".

## Type Declaration

### 0

> `readonly` **0**: `0`

Zero spacing. Used to remove default padding or margins.

### 1

> `readonly` **1**: `4` = `4`

4px. The smallest unit, often used for fine-grained adjustments.

### 2

> `readonly` **2**: `8` = `8`

8px. Used for small gaps, like spacing between icons and text.

### 3

> `readonly` **3**: `12` = `12`

12px. Used for gaps inside small components.

### 4

> `readonly` **4**: `16` = `16`

16px. **The Base Unit.** Used for standard component padding
(e.g., inside buttons or inputs).

### 5

> `readonly` **5**: `20` = `20`

20px.

### 6

> `readonly` **6**: `24` = `24`

24px. Often used for padding inside larger components like Cards.

### 7

> `readonly` **7**: `32` = `32`

32px. Used for creating separation between larger UI sections.

### 8

> `readonly` **8**: `48` = `48`

48px. Used for significant content separation.

### 9

> `readonly` **9**: `64` = `64`

64px. Used for major page-level layout spacing.

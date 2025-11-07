[**@repo/ui-tokens**](../README.md)

***

> `const` **colors**: `object`

Defined in: [colors.ts:13](https://github.com/thiagofons/curator/blob/f0cbbd219773ebcf898a73e7b489432be7814697/packages/ui-tokens/src/colors.ts#L13)

UI Tokens: `colors`

Esta é a fonte única da verdade para todas as cores da plataforma.

- `brand`: Cores que definem a identidade "Curator".
- `neutral`: A escala de cinza, usada para textos, fundos e bordas.
- `feedback`: Cores usadas para comunicar estados do sistema (sucesso, erro, etc.).

Referência: Nossos pilares de DX e Linguagem Ubíqua.

## Type Declaration

### brand

> `readonly` **brand**: `object`

Cores da Marca: A identidade principal do Curator.
Usamos nomes semânticos (ex: 'primary') em vez de nomes de cor (ex: 'blue').

#### brand.primary

> `readonly` **primary**: `"#0A7CFF"` = `"#0A7CFF"`

O 'Azul Curator'. Usado para ações principais, links e foco.

#### brand.primaryLight

> `readonly` **primaryLight**: `"#E6F2FF"` = `"#E6F2FF"`

Um tom mais claro do azul principal, usado para fundos de containers
ou estados 'hover' mais suaves.

#### brand.secondary

> `readonly` **secondary**: `"#FFB800"` = `"#FFB800"`

O 'Dourado Curator'. Usado para destaques, selos e elementos premium.

### feedback

> `readonly` **feedback**: `object`

Cores de Feedback: Para comunicação de estado com o usuário.

#### feedback.error

> `readonly` **error**: `"#D50000"` = `"#D50000"`

Usado para mensagens de erro, validação negativa e ações destrutivas.

#### feedback.info

> `readonly` **info**: `"#0091EA"` = `"#0091EA"`

Usado para informações contextuais (ex: 'InfoSteps' em uma Trilha).

#### feedback.success

> `readonly` **success**: `"#00C853"` = `"#00C853"`

Usado para mensagens de sucesso e validação positiva.

#### feedback.warning

> `readonly` **warning**: `"#FFD600"` = `"#FFD600"`

Usado para alertas, avisos e informações que exigem atenção.

### neutral

> `readonly` **neutral**: `object`

Cores Neutras: A base da nossa UI.
Usamos uma escala numérica (inspirada no Tailwind) onde
900 é o mais escuro e 100 é o mais claro.

#### neutral.100

> `readonly` **100**: `"#F5F5F5"` = `"#F5F5F5"`

Usado para fundos de página (modo claro) ou elementos sutilmente destacados.

#### neutral.300

> `readonly` **300**: `"#DDDDDD"` = `"#DDDDDD"`

Usado para bordas de containers e divisores.

#### neutral.500

> `readonly` **500**: `"#888888"` = `"#888888"`

Usado para textos de apoio, placeholders e ícones desabilitados.

#### neutral.700

> `readonly` **700**: `"#333333"` = `"#333333"`

Usado para textos de corpo e sub-títulos.

#### neutral.900

> `readonly` **900**: `"#121212"` = `"#121212"`

Usado para textos com alto contraste (ex: títulos).

#### neutral.white

> `readonly` **white**: `"#FFFFFF"` = `"#FFFFFF"`

Oposto direto do 900.

# Releox react
## Table of Content
- [Coreui Layout](#coreui-layout)

## Coreui Layout
Coreui layout
```js
<CoreuiLayout brand="MAINIO" menuTitle={user.name} sidebarMenu={sidebarMenu}>
  ...
<CoreuiLayout>
```
Coreui layout with custom element
```js
const CustomComponent = () => <h1>Foo</h1>

<CoreuiLayout brand={CustomComponent} menuTitle={user.name} sidebarMenu={sidebarMenu}>
  ...
<CoreuiLayout>
```
### CoreuiLayout props
- `children` - JSX.Element | String, Required - Layout's main content
- `brand` - String | JSX.Element, Required - Header brand text or element
- `sidebarMenu` - CoreuiSidebarMenu[], Required - Sidebar menu
- `brandUrl` - String, Default: `'/'` - Header brand text or element
- `headerRightText` - String, Default: `''` - Text in right side of CoreuiHeader

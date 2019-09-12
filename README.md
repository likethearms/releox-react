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
